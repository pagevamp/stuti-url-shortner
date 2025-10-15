import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailVerificationService } from './email_verification.service';
import { CreateEmailVerificationDto } from './dto/create-email_verification.dto';
import { UpdateEmailVerificationDto } from './dto/update-email_verification.dto';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @Post()
  create(@Body() createEmailVerificationDto: CreateEmailVerificationDto) {
    return this.emailVerificationService.create(createEmailVerificationDto);
  }

  @Get()
  findAll() {
    return this.emailVerificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailVerificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailVerificationDto: UpdateEmailVerificationDto) {
    return this.emailVerificationService.update(+id, updateEmailVerificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailVerificationService.remove(+id);
  }
}
