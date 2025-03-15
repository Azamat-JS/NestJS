import {
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
  } from "@nestjs/common";
  import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";
  import { diskStorage } from "multer";
  import { extname } from "path";
  
  @ApiTags("File uploads")
  @Controller("upload")
  export class UploadController {
    @Post("single")
    @UseInterceptors(
      FileInterceptor("image", {
        storage: diskStorage({
          destination: "./uploads",
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      })
    )
    @ApiConsumes("multipart/form-data") // Specifies that this endpoint consumes files
    @ApiBody({
      schema: {
        type: "object",
        properties: {
          image: { type: "string", format: "binary" },
        },
      },
    })
    @ApiResponse({ status: 201, description: "File uploaded successfully" })
    uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
      console.log("Single file uploaded: ", file);
      return {
        message: "File uploaded successfully",
        filePath: `/uploads/${file.filename}`,
      };
    }
  
    @Post("multiple")
    @UseInterceptors(
      FilesInterceptor("images", 10, {
        storage: diskStorage({
          destination: "./uploads",
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      })
    )
    @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        images: { type: "array", items: { type: "string", format: "binary" } },
      },
    },
  })
  @ApiResponse({ status: 201, description: "Files uploaded successfully" })
    uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
      console.log("Multiple files uploaded: ", files);
  
      return {
        message: "Files uploaded successfully",
        filePaths: files.map((file) => `/uploads/${file.filename}`),
      };
    }
  }
  
