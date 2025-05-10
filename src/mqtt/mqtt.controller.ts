import { Controller, Get, Post, Body } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller()
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  private count: number = 0;
  private previous = '';

  @Post('send-command')
  sendCommand(@Body() body: { topic: string; message: string }) {
    if (this.previous === '') {
      this.count = 1;
    } else if (this.previous != '' && this.previous == body.message) {
      this.count++;
    } else {
      this.count = 1;
    }

    console.log(`Peticion recibida! ${this.count} : ${body.message}`);
    this.previous = body.message;

    return this.mqttService.sendCommand(body.topic, body.message);
  }

  @Get('sensor')
  getSensorValue() {
    return { value: this.mqttService.getSensorValue() };
  }
}
