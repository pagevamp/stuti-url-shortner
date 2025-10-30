import { IsDateString, IsNotEmpty } from "class-validator";

export class ScheduledNotificationDto {
  @IsNotEmpty()
  @IsDateString()
  expires_at: Date;
}