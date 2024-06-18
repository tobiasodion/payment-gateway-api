import { Merchant } from "../models/merchants";

export const merchants: Merchant[] = [
  {
    id: "1",
    name: "Merchant 1",
    accountNumber: "123456",
    webHookUrl: "http://merchant1:1000/webhook",
  },
  {
    id: "2",
    name: "Merchant 2",
    accountNumber: "123457",
    webHookUrl: "http://merchant2:2000/webhook",
  },
  {
    id: "3",
    name: "Merchant 3",
    accountNumber: "123458",
    webHookUrl: "http://merchant3:3000/webhook",
  },
];
