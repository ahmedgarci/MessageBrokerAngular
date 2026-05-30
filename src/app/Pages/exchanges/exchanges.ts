import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FetchService } from '../../Services/Queues/queue';
import { Exchange } from '../../Models/ExchangeModel';
import { format } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { CreateExchangeComp } from '../../Components/create-exchange-comp/create-exchange-comp';

@Component({
  standalone:true,
  selector: 'app-exchanges',
  imports: [CommonModule],
  templateUrl: './exchanges.html',
  styleUrl: './exchanges.css',
})
export class ExchangesComponent implements OnInit{

  exchanges:Exchange[]=[];
  constructor(private fetchService:FetchService<Exchange>,private cdr:ChangeDetectorRef,private dialog:MatDialog){}

  open(){
    this.dialog.open(CreateExchangeComp,{
      width:"400px",
      height:"400px"
    })
  }




  ngOnInit(): void {
    this.loadExchanges();
  }




  private loadExchanges(){
    this.fetchService.fetch("exchange").subscribe(
      (data)=>{
        console.log(data);
        this.exchanges = data.map((e) => ({
          ...e,
          createdAt: format(e.createdAt,"yyyy-MM-dd HH:mm")
        }));
        this.cdr.detectChanges();
      },
      (error)=>{
        console.log(error);
      }
    )
  }



}
