import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EncryptModule } from './encrypt/encrypt.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [
    DatabaseModule, EncryptModule, HttpModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
