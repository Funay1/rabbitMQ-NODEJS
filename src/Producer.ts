import { Queue } from './shared/queue/Queue';
const QUEUE = 'messages';

class Producer {
  constructor(private queue: Queue) {}
  async execute() {
    await this.queue.connect('guest:guest@rabbitmq:5672');
    let i = 0;
    setInterval(() => {
      const message = {
        queue: QUEUE,
        text: `Message ${i++}`,
      };
      console.log('sending message', message);
      this.queue.sendMessage(message);
    }, 1000);
  }
}

export { Producer };
