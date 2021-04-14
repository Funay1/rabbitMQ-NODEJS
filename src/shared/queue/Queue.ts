interface Message {
  queue: string;
  text: string;
}

interface Queue {
  connect(url: string): Promise<void>;
  sendMessage(message: Message): Promise<void>;
  consume(queue: string, callback: (msg: unknown) => void): void;
  deleteMessage(msg: unknown): void;
}

export { Message, Queue };
