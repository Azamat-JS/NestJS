import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Request,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginDto } from "./dto/loginDto";
import { JwtGuard } from "src/Guards/jwtAuth.guard";
import { AdminGuard } from "src/Guards/admin.guard";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags()
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @ApiCreatedResponse({ description: "Registered" })
  @ApiBadRequestResponse({ description: "User already exists" })
  @ApiInternalServerErrorResponse({ description: "Something went wrong!" })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post("login")
  @ApiOkResponse({ description: "Login successful" })
  @ApiUnauthorizedResponse({ description: "Unauthorized Error" })
  @ApiBadRequestResponse({ description: "Invalid credentials" })
  @ApiInternalServerErrorResponse({ description: "Something went wrong!" })
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  @ApiOkResponse({ description: "Found all users" })
  @ApiNotFoundResponse({ description: "Users not found" })
  @ApiInternalServerErrorResponse({ description: "Something went wrong!" })
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(":id")
  @ApiOkResponse({ description: "User found" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({ description: "Something went wrong!" })
  findOne(
    @Param(
      "id",
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: string
  ) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Patch(":id")
  @ApiOkResponse({ description: "Updated successfully" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({ description: "Something went wrong!" })
  update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Delete(":id")
  @ApiOkResponse({ description: "Deleted Successfully" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({ description: "Something went wrong!" })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }

  @UseInterceptors(FileInterceptor("file"))
  @Post(":id/upload-file")
  async addImage(
    @UploadedFile() file: Express.Multer.File,
    @Param("id", new ParseUUIDPipe()) id: string,
  ) {
    console.log(file);

  const imageUrl = await this.userService.addFileToUsers(file, id)
   return {imageUrl}
  };
}
