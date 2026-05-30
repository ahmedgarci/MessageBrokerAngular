import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExchangeSelectComponent } from '../../Components/exchange-select-component/exchange-select-component';

@Component({
  standalone:true,
  selector: 'app-publisher',
  imports: [ReactiveFormsModule,CommonModule,ExchangeSelectComponent],
  templateUrl: './publisher.html',
  styleUrl: './publisher.css',
})
export class PublisherCompnent implements OnInit{

  private url:string="http://localhost:8081"

  constructor(private fb:FormBuilder,private http:HttpClient){}

  publishForm!:FormGroup;

  onExchangeSelected(exchange:string){
    this.publishForm.patchValue({
      exchange: exchange
    });
   }

  ngOnInit(): void {
    this.publishForm = this.fb.group({
      exchange: ['', Validators.required],
      routingKey: ['', Validators.required],
      payload: ['', Validators.required],
      delay: [0],
      messageType: ['JSON', Validators.required],
      })
  }

  onSubmit(): void {
    if (this.publishForm.invalid) {
      this.publishForm.markAllAsTouched();
      return;
    }

    const exchangeName = this.publishForm.value.exchange;

    console.log(this.publishForm.value);

    this.http.post<void>(
      `${this.url}/${exchangeName}/messages`,
      this.publishForm.value
    ).subscribe(
      () => {},
      (error) => console.log(error)
    ),
    ()=>{this.publishForm.reset()}
  }



}
