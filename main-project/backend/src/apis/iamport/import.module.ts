import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IamportService } from './import.service';

@Module({
  imports: [HttpModule],
  providers: [IamportService],
})
export class IamportModule {}
