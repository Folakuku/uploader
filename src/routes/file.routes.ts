import { Router } from "express";
import * as fileController from "../controllers/files.controller";
import { asyncHandler } from "../helpers/handler";
import validate from "../middlewares/validators/validate";
import * as schemas from "../middlewares/validators/schema";

const router = Router();

router.get("/", asyncHandler(fileController.listFiles));

router.post("/", asyncHandler(fileController.uploadFile));

router.get("/:id", asyncHandler(fileController.downloadFile));

router.delete("/:id", asyncHandler(fileController.deleteFile));

export default router;
