import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FetchService } from '../../Services/Queues/queue';
import { ExchangeSelect } from '../../Models/ExchangeModel';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-exchange-select-component',
  imports: [CommonModule],
  templateUrl: './exchange-select-component.html',
  styleUrl: './exchange-select-component.css',
})
export class ExchangeSelectComponent implements OnInit{

  exchanges!:ExchangeSelect[];

  constructor(private fetchService:FetchService<ExchangeSelect>,private cdr:ChangeDetectorRef){}

  @Output()
  exchangeNameEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.fetchService.fetch("exchange/all").subscribe((data)=>{
      this.exchanges= data
      this.cdr.detectChanges()
    })
  }

  onExchangeSelect(e:Event){
    const value:string = (e.target as HTMLSelectElement) .value;
    this.exchangeNameEvent.emit(value);
  }


}
