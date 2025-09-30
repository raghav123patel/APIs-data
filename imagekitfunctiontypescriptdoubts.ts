// utils/uploadToImagekit.ts
import fs from "fs";
import imagekit from "./imagekit";

export const uploadFileToImagekit = async (
  file: Express.Multer.File | undefined,
  folder: string
): Promise<string | null> => {
  if (!file) return null; // file not provided
  const uploaded = await imagekit.upload({
    file: fs.readFileSync(file.path),
    fileName: file.originalname,
    folder,
  });
  return uploaded.url;
};
