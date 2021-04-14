import amqp from 'amqplib';
import { Message, Queue } from '../Queue';

class RabbitMQ implements Queue {
  private channel: amqp.Channel | undefined;
  private queues: string[] = [];
  constructor() {}
  consume(
    queue: string,
    callback: (msg: amqp.ConsumeMessage | null) => void
  ): void {
    if (!this.channel) throw new Error('Missing Channel');
    this.channel.consume(queue, callback);
  }
  deleteMessage(msg: amqp.ConsumeMessage): void {
    return this.channel?.ack(msg);
  }
  async connect(url: string): Promise<void> {
    this.channel = await (await amqp.connect(`amqp://${url}`)).createChannel();
  }
  private assertQueue(queue: string): void {
    if (!this.channel) throw new Error('Missing Channel');
    this.channel.assertQueue(queue);
    this.queues.push(queue);
  }
  private hasQueue(queueName: string): boolean {
    return this.queues.findIndex((queue) => queue === queueName) > -1;
  }
  async sendMessage(message: Message): Promise<void> {
    if (!this.channel) throw new Error('Missing Channel');
    const { queue, text } = message;
    if (!this.hasQueue(queue)) {
      this.assertQueue(queue);
    }
    this.channel.sendToQueue(queue, Buffer.from(text));
  }
}

export { RabbitMQ };
