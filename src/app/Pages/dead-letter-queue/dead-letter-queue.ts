import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dead-letter-queue',
  imports: [CommonModule],
  templateUrl: './dead-letter-queue.html',
  styleUrl: './dead-letter-queue.css',
})
export class DeadLetterQueue {
  dlqMessages:any = []
}
