import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-exchange-comp',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-exchange-comp.html',
  styleUrl: './create-exchange-comp.css',
})
export class CreateExchangeComp implements OnInit{

  url:string = "http://localhost:8081";

  constructor(private fb:FormBuilder,private http:HttpClient){}

  form!:FormGroup;
  exchangeTypes=["DIRECT","FANOUT","TOPIC"]

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['DIRECT', Validators.required],
    })
  }

  onSubmit(){
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      console.log(this.form.value);

      this.http.post<void>(`${this.url}/exchange`,this.form.value
      ).subscribe(
        () => {},
        (error) => console.log(error)
      ),
      ()=>{this.form.reset()}
    }



}
