import { Queue } from './shared/queue/Queue';
class Consumer {
  constructor(private queue: Queue) {}
  private simulateError() {
    return;
  }
  private consumer(msg: any) {
    console.log('%s Received: %s', new Date(), msg.content.toString());
  }
  async execute() {
    await this.queue.connect('guest:guest@rabbitmq:5672');
    await this.queue.consume('messages', (msg) => {
      this.consumer(msg);
      Math.floor(Math.random() * 100) % 2 === 0
        ? this.queue.deleteMessage(msg)
        : this.simulateError();
    });
  }
}

export { Consumer };
