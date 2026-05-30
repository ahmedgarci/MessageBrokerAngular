export interface Queue{
  name:string,
  readyCnt:number,
  processingCnt:number,
  dlqCnt:number,
  totalMessages:number
}
