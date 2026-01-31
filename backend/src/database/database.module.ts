import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Student } from '../students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [SeedService],
  exports: [SeedService],
})
export class DatabaseModule {}
