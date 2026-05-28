import { Component }
from '@angular/core';

import { FormsModule }
from '@angular/forms';

import { AuthService }
from '../../services/auth';

@Component({
selector:'app-signup',

standalone:true,

imports:[
FormsModule
],

templateUrl:'./signup.html',

styleUrl:'./signup.css'
})

export class Signup
{

name='';

email='';

password='';

confirmPassword='';

nameError='';

emailError='';

passwordError='';

confirmPasswordError='';

constructor(
private authService:
AuthService)
{
}

signup()
{

this.nameError='';

this.emailError='';

this.passwordError='';

this.confirmPasswordError='';

const strictEmailRegex=

/^[A-Za-z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|in)$/i;

const strongPasswordRegex=

/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;



if(!this.name.trim())
{
this.nameError=
"Name is required";
}

else if(
this.name.trim().length < 3)
{
this.nameError=
"Minimum 3 letters required";
}



if(!this.email.trim())
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



if(!this.password.trim())
{
this.passwordError=
"Password is required";
}

else if(
!strongPasswordRegex.test(
this.password))
{
this.passwordError=
"8+ chars, uppercase, lowercase, number required";
}



if(!this.confirmPassword.trim())
{
this.confirmPasswordError=
"Confirm password required";
}

else if(
this.password
!=
this.confirmPassword)
{
this.confirmPasswordError=
"Passwords do not match";
}



if(
this.nameError ||
this.emailError ||
this.passwordError ||
this.confirmPasswordError)
{
return;
}



const data=
{
name:
this.name.trim(),

email:
this.email.trim(),

password:
this.password,

role:"Customer"
};



this.authService
.signup(data)

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
&&
err.error.includes(
"exists"))
{
this.emailError=
"Email already exists";
}
else
{
this.emailError=
"Signup failed";
}

}
});
}

}