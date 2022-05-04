import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseService } from './services/database.service';

@Module({
  providers: [DatabaseService],
  imports: [ConfigModule],
  exports: [DatabaseService],
})
export class DatabaseModule {}
