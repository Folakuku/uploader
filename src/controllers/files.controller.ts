import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { errorResponse, successResponse } from "../helpers/response";
import env from "../config/env";
import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";
import busboy from "busboy";
import { getRepositories } from "../db";
import { validateMimeType } from "../helpers/utils";
import logger from "../config/logger";

const { aws_access_key, aws_secret_key, aws_bucket, aws_region } = env;

// s3 connection instance
const s3Client = new S3Client({
  region: aws_region,
  credentials: { accessKeyId: aws_access_key, secretAccessKey: aws_secret_key },
});

export const uploadFile = (req: Request, res: Response) => {
  const bb = busboy({ headers: req.headers });
  const fileId = uuidv4();

  let size = 0;

  bb.on("file", async (name, file, info) => {
    const { filename, mimeType } = info;

    if (!validateMimeType(mimeType)) {
      return errorResponse(res, "Invalid file type fetched");
    }

    try {
      const s3Key = `${req.user.id}/${fileId}-${filename}`;

      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: aws_bucket,
          Key: s3Key,
          Body: file,
          ContentType: mimeType,
        },
      });

      file.on("data", (chunk) => {
        size += chunk.length;
      });

      upload.on("httpUploadProgress", (progress) => {
        logger.log(`Upload progress: ${progress.loaded}/${progress.total}`);
      });

      const result = await upload.done();
      // const location = result.Location;

      const { fileRepository } = await getRepositories();

      const newFile = await fileRepository.create({
        userId: req.user.id,
        filename,
        s3Key,
        size,
        mimetype: mimeType,
      });

      successResponse(res, "Upload successful", { file: newFile });
    } catch (err) {
      console.log(err);
      return errorResponse(res, "Upload failed");
    }
  });

  bb.on("error", (err) => {
    console.log(err);
    return errorResponse(res, "File processing error");
  });

  req.pipe(bb);
};

export const listFiles = async (req: Request, res: Response) => {
  const { fileRepository } = await getRepositories();

  const files = await fileRepository.find({ userId: req.user.id });
  return successResponse(res, "Files fetched", { files });
};

export const downloadFile = async (req: Request, res: Response) => {
  const { fileRepository } = await getRepositories();

  const file = await fileRepository.findOne({
    id: req.params.id,
  });

  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }

  if (file.userId.toString() !== req.user.id.toString()) {
    return res.status(404).json({ error: "User not authorized" });
  }

  // Generate pre-signed URL with 5-minute expiration
  const command = new GetObjectCommand({
    Bucket: aws_bucket,
    Key: file.s3Key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });

  return successResponse(res, "Files fetched", {
    url,
    filename: file.filename,
    mimetype: file.mimetype,
    expiresAt: new Date(Date.now() + 300 * 1000).toISOString(),
  });
};

export const deleteFile = async (req: Request, res: Response) => {
  const { fileRepository } = await getRepositories();

  const file = await fileRepository.findOne({
    id: req.params.id,
  });

  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }

  if (file.userId.toString() !== req.user.id.toString()) {
    return res.status(404).json({ error: "User not authorized" });
  }

  await fileRepository.deleteOne({
    id: req.params.id,
  });

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: aws_bucket,
      Key: file.s3Key,
    })
  );

  successResponse(res, "File deleted successfully");
};
