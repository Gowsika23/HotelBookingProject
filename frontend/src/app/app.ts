import { Component }
from '@angular/core';

import { LoginComponent }
from './components/login/login';

import { DashboardComponent }
from './components/dashboard/dashboard';

@Component({
  selector:'app-root',

  standalone:true,

  imports:[
    LoginComponent,
    DashboardComponent
  ],

  templateUrl:'./app.html',

  styleUrl:'./app.css'
})

export class App
{
  isLoggedIn=false;

  ngOnInit()
  {
    const userId=
      localStorage
      .getItem("userId");

    if(userId)
    {
      this.isLoggedIn=true;
    }
  }
}