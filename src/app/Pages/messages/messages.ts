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
  filteredMessages!:Message[];

  ngOnInit(): void {
    this.loadMessages();
  }

  filterBasedOnStatus(status?:string){
    if(!status){
      this.filteredMessages = this.messages;
    }else{
      this.filteredMessages = this.messages.filter((m)=> m.status == status);
    }
    this.cdr.detectChanges()
  }



  private loadMessages(){
    this.fetchService.fetch("messages").subscribe(
      (data)=>{
        console.log(data);
        this.messages = data.map((m) => ({
          ...m,
          created_at: format(m.created_at,"yyyy-MM-dd HH:mm")
        }));
        this.filteredMessages = this.messages;
        this.cdr.detectChanges();
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
