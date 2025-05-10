import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://:1883', //llenar con ip del esp32
    },
  }); */

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('API corriendo en http://localhost:3000');
}
bootstrap();
