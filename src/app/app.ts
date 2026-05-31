import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { WebsocketService } from './Services/Websocketes/websocket-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit,OnDestroy{

  protected readonly title = signal('BrokerAppUi');

  constructor(private websocketService:WebsocketService){}


  ngOnDestroy(): void {
    this.websocketService.disconnect();

  }

  ngOnInit(): void {
    this.websocketService.init();

  }

}
