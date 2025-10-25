import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sports } from './sports.entity';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sports])],
  controllers: [SportsController],
  providers: [SportsService],
  exports: [SportsService],
})
export class SportsModule {}
