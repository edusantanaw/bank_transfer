import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "customers",
  brokers: ["localhost:9092"],
});

export default kafka;
