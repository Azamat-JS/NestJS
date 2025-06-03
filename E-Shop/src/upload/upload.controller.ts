import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from '../products/products.service'; // Assuming you have it
import { Body } from '@nestjs/common';


@ApiTags('File uploads')
@Controller('upload')
export class UploadController {
  constructor(private readonly productService: ProductsService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Folder for uploads
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
        productId: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  async uploadSingleProductImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('productId') productId:string,
  ) {
    const filePath = `/uploads/${file.filename}`;
    
    const serverUrl = `${req.protocol}://${req.get('host')}/${filePath}}`; // or get it from env
    
    try {
      await this.productService.addImageToProduct(productId, filePath);
    } catch (error) {
      throw new HttpException('Failed to associate image with product', HttpStatus.BAD_REQUEST);
    }
    
    
    return {
      message: 'Image uploaded successfully',
      fileUrl: `${serverUrl}/uploads/${file.filename}`,
    };
  }
}
