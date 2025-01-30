import { model, Schema } from "mongoose";
import { IFile } from "../../../typings/file";

const fileSchema = new Schema<IFile>(
  {
    // userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userId: { type: String, required: true },
    filename: { type: String, required: true },
    s3Key: { type: String, required: true },
    size: { type: Number },
    mimetype: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const File = model<IFile>("File", fileSchema);
export default File;
