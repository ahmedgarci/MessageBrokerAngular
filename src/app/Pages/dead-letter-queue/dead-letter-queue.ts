import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FetchService } from '../../Services/Queues/queue';
import { DlqMessage } from '../../Models/MessageModel';
import { LoaderComponent } from '../../Components/common/loader-component/loader-component';

@Component({
  selector: 'app-dead-letter-queue',
  imports: [CommonModule,LoaderComponent],
  templateUrl: './dead-letter-queue.html',
  styleUrl: './dead-letter-queue.css',
})
export class DeadLetterQueue implements OnInit{
  isLoading=false;
  dlqMessages:DlqMessage[] = []
  constructor(private fetchService:FetchService<DlqMessage>,private cdr:ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadFailedMessages();
  }

  private loadFailedMessages(){
    this.fetchService.fetch("messages/dlq").subscribe(
      (data)=>{
        console.log(data);
        this.dlqMessages = data;
        this.cdr.detectChanges();
        this.isLoading = false;

      },
      (error)=>{
        console.log(error);
        this.isLoading = false;

      }
    )
  }

}
