import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqttModule } from './mqtt/mqtt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temperatura } from './temperatura/temperatura.entity';
import { TemperaturaService } from './temperatura/temperatura.service';
import { TemperaturaController } from './temperatura/temperatura.controller'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '123',
      database: process.env.DB_NAME || 'estufa',
      entities: [Temperatura],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Temperatura]),
    MqttModule,
  ],
  providers: [TemperaturaService],
  controllers: [TemperaturaController],
})
export class AppModule {}
