import { Module } from '@nestjs/common';
import { DriverBlobService } from './services/driver-blob.service';
const providers = [DriverBlobService];
@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers],
})
export class CoreModule {}
