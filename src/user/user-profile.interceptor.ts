import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { uploadFileToDriver } from 'src/config/driver.config';
import { DriverBlobService } from 'src/config/services/driver-blob.service';
import { UpperFirstLetter } from './config/upper-first-lettle.config';
import { User } from './entities/user.entity';
@Injectable()
export class UserProfileTokenInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    // let count = 0;
    // console.log(count);
    return next.handle().pipe(
      map((file: Express.Multer.File) => {
        const imageName = file.filename;
        const imageUrl = uploadFileToDriver(imageName);
        return {
          url: imageUrl,
        };
      }),
    );
  }
}
