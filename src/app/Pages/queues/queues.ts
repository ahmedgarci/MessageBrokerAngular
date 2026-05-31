import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FetchService } from '../../Services/Queues/queue';
import { Queue } from '../../Models/QueueModel';

@Component({
  selector: 'app-queues',
  imports: [CommonModule],
  templateUrl: './queues.html',
  styleUrl: './queues.css',
})
export class QueuesComponent  implements OnInit{

  queues:any = [];


  constructor(private fetchService: FetchService<Queue>,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadQueues();
  }

  loadQueues(): void {
    this.fetchService.fetch("queue").subscribe({
      next: (data) => {
        this.queues = data;
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('Error loading queues:', err);
      }
    });
  }
}


