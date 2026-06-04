import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FetchService } from '../../Services/Queues/queue';
import { Message } from '../../Models/MessageModel';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageHistoryComponent } from '../../Components/messages/message-history-component/message-history-component';

@Component({
  standalone:true,
  selector: 'app-messages',
  imports: [CommonModule,FormsModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class MessagesComponent implements OnInit{

  constructor(private fetchService:FetchService<Message>,private cdr:ChangeDetectorRef,private dialog:MatDialog){}


  messages!:Message[];
  filteredMessages!:Message[];
  search:string = ""


  ngOnInit(): void {
    this.loadMessages();
  }

  open(id:string){
    this.dialog.open(MessageHistoryComponent,{
      data:{messageId:id},
      width:"600px",
      height:"400px"
    })
  }

  filterBasedOnStatus(status?:string){
    if(!status){
      this.filteredMessages = this.messages;
    }else{
      this.filteredMessages = this.messages.filter((m)=> m.status == status);
    }
    this.cdr.detectChanges()
  }

  filterBasedOnId(): void {
    const term = this.search.trim().toLowerCase();

    if (!term) {
      this.filteredMessages = this.messages;
      return;
    }

    this.filteredMessages = this.messages.filter(m =>
      m.message_id.toLowerCase().includes(term)
    );
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
