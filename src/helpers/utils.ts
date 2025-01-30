import bcrypt from "bcrypt";
import env from "../config/env";

export const generateHash = (password: string) => {
  const salt = bcrypt.genSaltSync(env.salt_rounds);
  return bcrypt.hashSync(password, salt);
};

export const compareHash = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export function generateRandomNumberString(length: number): string {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  ).toString();
}

export function validateMimeType(mimeType: string) {
  const allowedMimeTypes = [
    "image/bmp",
    "image/cis-cod",
    "image/gif",
    "image/ief",
    "image/jpeg",
    "image/webp",
    "image/png",
    "image/pipeg",
    "image/svg+xml",
    "image/tiff",
    "image/x-cmu-raster",
    "image/x-cmx",
    "image/x-icon",
    "image/apng",
    "image/avif",
    "video/mp4",
    "video/avi",
    "video/mov",
    "video/wmv",
    "video/x-flv",
    "video/webm",
    "video/mpeg",
    "video/mpeg2",
    "video/3gpp",
    "video/3gpp2",
    "video/ogg",
  ];

  return allowedMimeTypes.includes(mimeType);
}
