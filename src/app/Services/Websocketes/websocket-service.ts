import { Injectable } from '@angular/core';
import {Client, IMessage, StompSubscription} from "@stomp/stompjs";
import { BehaviorSubject } from 'rxjs';
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

  messageSubject =  new BehaviorSubject<any>([]);
  messages$ = this.messageSubject.asObservable();


  private client!:Client;
  private subscriptions:Map<string,StompSubscription> = new Map();


  init(){
    this.client = new Client({
      webSocketFactory:()=> new SockJS("http://localhost:8081/ws"),
      reconnectDelay: 5000
    });

    this.client.onConnect = () => {
      console.log("CONNECTED");

      // this.client.subscribe('/broker/queues', (msg: IMessage) => {
      //   const parsed = JSON.parse(msg.body);
      //   console.log("RECEIVED:", parsed);

      //   this.addMessage(parsed);
      // });
      this.subscribe("/broker/queues");
    };


    this.client.onStompError = (frame) => {
      console.error('Broker error:', frame.headers['message']);
    };
    this.client.onDisconnect = () => {
      console.log("DISCONNECTED");
    };
    this.client.activate();
  }


  public subscribe(dest:string){
    if(!this.client || !this.client.connected) return;
    if(this.subscriptions.has(dest)) return;
    const subscription = this.client.subscribe(`${dest}`,(message:IMessage)=>{
      const parsedMessage:any = JSON.parse(message.body);
      this.addMessage(parsedMessage);
    })
    this.subscriptions.set(dest,subscription);
  }


  public unsubscribe(dest:string){
    const subscription = this.subscriptions.get(dest);
    if(subscription){
      subscription.unsubscribe();
      this.subscriptions.delete(dest);
    }
  }

  public disconnect(){
    this.client.deactivate()
  }


  private addMessage(nextMessage:any){
    const allMessages = this.messageSubject.value;
    this.messageSubject.next([...allMessages,nextMessage]);
  }



}

