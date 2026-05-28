import {
Component,
ChangeDetectorRef
}
from '@angular/core';

import { FormsModule }
from '@angular/forms';

import { Signup }
from '../signup/signup';

import { AuthService }
from '../../services/auth';

@Component({
selector:'app-login',

standalone:true,

imports:[
FormsModule,
Signup
],

templateUrl:'./login.html',

styleUrl:'./login.css'
})

export class LoginComponent
{

email='';

password='';

emailError='';

passwordError='';

showSignup=false;

constructor(
private authService:
AuthService,

private cdr:
ChangeDetectorRef)
{
}

login()
{

this.emailError='';

this.passwordError='';

const strictEmailRegex=

/^[A-Za-z0-9._%+-]+@(gmail|yahoo|hotmail|outlook)\.(com|in)$/i;

const strongPasswordRegex=

/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;



if(
!this.email.trim())
{
this.emailError=
"Email is required";
}

else if(
!strictEmailRegex.test(
this.email.trim()))
{
this.emailError=
"Enter valid email address";
}



if(
!this.password.trim())
{
this.passwordError=
"Password is required";
}

else if(
!strongPasswordRegex.test(
this.password))
{
this.passwordError=
"Password must contain uppercase, lowercase, number, 8+ chars";
}



if(
this.emailError ||
this.passwordError)
{
this.cdr.detectChanges();

return;
}



const data=
{
email:
this.email.trim(),

password:
this.password
};



this.authService
.login(data)

.subscribe(
{
next:(res:any)=>
{

localStorage.setItem(
"userId",
res.id);

localStorage.setItem(
"name",
res.name);

localStorage.setItem(
"role",
res.role);

window.location.reload();

},

error:(err:any)=>
{

if(
err.error
===
"User not found. Please signup.")
{
this.emailError=
"User not found. Please signup.";
}

else if(
err.error
===
"Invalid password")
{
this.passwordError=
"Invalid password";
}

else
{
this.passwordError=
"Login failed";
}

this.cdr.detectChanges();

}
});
}

closeSignup()
{
this.showSignup=false;
}

}