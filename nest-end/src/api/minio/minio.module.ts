import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { File as UploadFile } from '../file/entities/file.entity';
import { FileService } from '../file/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UploadFile])],
  controllers: [MinioController],
  providers: [MinioService, FileService],
  exports: [MinioService],
})
export class MinioModule {}
