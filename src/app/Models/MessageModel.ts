export interface Message{
  message_id:string,
  queue:string,
  status:string,
  retries:number,
  created_at:string,
  type:string
}


export interface DlqMessage{
  message_id:string,
  queue:string,
  retries:number,
}

export interface MessageHistory{
  state:string;
  details:string;
  time:string;
}
