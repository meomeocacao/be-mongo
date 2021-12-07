import { Module } from '@nestjs/common';
import { AwsService, DriverService } from '@/config';
const providers = [AwsService, DriverService];
@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers],
})
export class CoreModule {}
