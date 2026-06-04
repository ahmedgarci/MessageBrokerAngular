import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core';


import { FetchService } from '../../../Services/Queues/queue';
import { MessageHistory } from '../../../Models/MessageModel';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone:true,
  selector: 'app-message-history-component',
  imports: [CommonModule],
  templateUrl: './message-history-component.html',
  styleUrl: './message-history-component.css',
})
export class MessageHistoryComponent implements OnInit {

  constructor(
    private fetchService: FetchService<MessageHistory>,
    private cdr:ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)
    private data:{messageId:string}
  ) {}


  history: MessageHistory[] = [];
  search: string = '';

  ngOnInit(): void {
    this.loadMessages(this.data.messageId);
  }

  private loadMessages(id: string): void {
    this.fetchService.fetch(`history/${id}`).subscribe({
      next: (data) => {
        this.history = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
