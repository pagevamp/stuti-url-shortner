import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailVerificationDto } from './create-email_verification.dto';

export class UpdateEmailVerificationDto extends PartialType(CreateEmailVerificationDto) {}
