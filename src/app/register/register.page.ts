import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {RouteService} from '../../../shared/route.service'
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: SocialUser;
  loggedIn: boolean;

  registerForm: FormGroup= new FormGroup({

    email: new FormControl(null,[Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required)

  })

  constructor(private router:Router, private routeService: RouteService, private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user.email)
      console.log(this.user.id)

      if(this.loggedIn==true){

        console.log('se logeo')

        this.registerForm.setValue({
          email: this.user.email,
          username: this.user.firstName,
          password: this.user.id,
          cpass: this.user.id
        })

        this.routeService.register(JSON.stringify(this.registerForm.value))
        .subscribe(
          data=> {console.log(data); this.router.navigate(['/login'])},
          error=> console.log(error)
    )
      }
    })
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }

  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)){

      console.log('invalid form'); return;

    }

    this.routeService.register(JSON.stringify(this.registerForm.value))
    .subscribe(
      data=> {console.log(data); this.router.navigate(['/login'])},
      error=> console.log(error)
    )
    //console.log(JSON.stringify(this.registerForm.value));
  }

}
