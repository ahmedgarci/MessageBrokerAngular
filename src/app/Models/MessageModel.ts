export interface Message{
  message_id:string,
  queue:string,
  status:string,
  retries:number,
  created_at:string,
  type:string
}
