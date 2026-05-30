import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FetchService } from '../../Services/Queues/queue';
import { Message } from '../../Models/MessageModel';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';

@Component({
  standalone:true,
  selector: 'app-messages',
  imports: [CommonModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class MessagesComponent implements OnInit{
  constructor(private fetchService:FetchService<Message>,private cdr:ChangeDetectorRef){}

  messages!:Message[];


  ngOnInit(): void {
    this.loadMessages();
  }




  private loadMessages(){
    this.fetchService.fetch("messages").subscribe(
      (data)=>{
        this.messages = data.map((m) => ({
          ...m,
          created_at: format(m.created_at,"yyyy-MM-dd HH:mm")
        }));
        this.cdr.detectChanges();
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
