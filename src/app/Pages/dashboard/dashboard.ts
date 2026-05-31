import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WebsocketService } from '../../Services/Websocketes/websocket-service';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-dashboard',
  imports: [RouterModule,CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit{
  constructor (private websocketService:WebsocketService,private cdr:ChangeDetectorRef){}


  messages:any[]=[];

  ngOnInit(): void {
    this.websocketService.init();

    this.websocketService.messages$.subscribe((data) => {
      this.messages = data;
    });
  }

}
