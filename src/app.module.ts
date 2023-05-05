import { Module } from '@nestjs/common';
import { AppController } from './interfaces/controllers/app.controller';
import { AppService } from './application/services/app.service';
import { CustomerModule } from './infra/modules/customer/customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
