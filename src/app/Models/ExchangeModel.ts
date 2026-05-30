export interface Exchange {
  id?: string;
  name: string;
  type: 'DIRECT' | 'FANOUT' | 'TOPIC';
  bindingCount: number;
  routedMessages: number;
  createdAt: string;

}

export interface ExchangeSelect{
  id: string;
  name: string;
}
