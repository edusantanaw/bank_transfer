import kafka from "../../main/config/kafka";

export class EmitEvent {
  private readonly producer = kafka.producer();

  async send(message: unknown, topic: string) {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
          partition: 0,
        },
      ],
    });
    await this.producer.disconnect();
  }
}
