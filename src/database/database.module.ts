import { Global, Module } from '@nestjs/common';
import { DatabaseService } from '@src/database/database.service';

@Global()
@Module({
  imports: [],
  providers: [DatabaseService],
  exports: [DatabaseService],
  controllers: [],
})
export class DatabaseModule {}
