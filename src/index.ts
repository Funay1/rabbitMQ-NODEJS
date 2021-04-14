import { Consumer } from './Consumer';
import { Producer } from './Producer';
import { RabbitMQ } from './shared/queue/implementation/Queue';
const queue = new RabbitMQ();
const consumer = new Consumer(queue);
const producer = new Producer(queue);

(async () => {
  const strategy = process.argv[2];
  let server;
  if (strategy === 'consumer') {
    server = consumer;
  } else if (strategy === 'producer') {
    server = producer;
  } else {
    console.error('Missing strategy');
    process.exit(1);
  }
  await server.execute();
})();
