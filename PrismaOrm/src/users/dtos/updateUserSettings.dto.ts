import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateUserSettingsDto {
    @IsBoolean()
    @IsOptional()
    smsEnabled?: boolean;

    @IsBoolean()
    @IsOptional()
    notificationOn?: boolean;
}