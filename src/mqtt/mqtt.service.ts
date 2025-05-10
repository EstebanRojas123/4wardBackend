import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
  private client: mqtt.MqttClient;
  private lastSensorValue: string = '';

  constructor() {
    this.client = mqtt.connect('mqtt://:1883'); //llenar con ip de esp32

    this.client.on('connect', () => {
      console.log('Conectado al broker MQTT');
      this.client.subscribe('esp32/sensor/temp', (err) => {
        if (err) {
          console.error('Error al suscribirse:', err.message);
        }
      });
    });

    this.client.on('message', (topic, payload) => {
      const message = payload.toString();
      console.log(`Mensaje recibido en ${topic}: ${message}`);
      if (topic === 'esp32/sensor/temp') {
        this.lastSensorValue = message;
      }
    });
  }

  sendCommand(topic: string, message: string) {
    this.client.publish(topic, message);
    return { status: 'ok', sent: { topic, message } };
  }

  getSensorValue() {
    return this.lastSensorValue;
  }
}
