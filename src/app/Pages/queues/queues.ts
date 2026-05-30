import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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


  constructor(private fetchService: FetchService<Queue>) {}

  ngOnInit(): void {
    this.loadQueues();
  }

  loadQueues(): void {
    this.fetchService.fetch("queue").subscribe({
      next: (data) => {
        console.log(data)
        this.queues = data;
      },
      error: (err) => {
        console.error('Error loading queues:', err);
      }
    });
  }
}


