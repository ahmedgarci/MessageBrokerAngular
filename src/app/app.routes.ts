import { Routes } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard';
import { QueuesComponent } from './Pages/queues/queues';
import { MessagesComponent } from './Pages/messages/messages';
import { PublisherCompnent } from './Pages/publisher/publisher';
import { DeadLetterQueue } from './Pages/dead-letter-queue/dead-letter-queue';
import { ExchangesComponent } from './Pages/exchanges/exchanges';

export const routes: Routes = [

{path:"dashboard",children:[
    {path:"", component:DashboardComponent},
    {path:"queues", component:QueuesComponent},
    {path:"exchanges", component:ExchangesComponent},
    {path:"messages", component:MessagesComponent},
    {path:"publish",component:PublisherCompnent},
    {path:"dlq",component:DeadLetterQueue}
  ]},


];
