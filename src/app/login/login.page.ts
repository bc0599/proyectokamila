import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RouteService } from 'shared/route.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: SocialUser;
  loggedIn: boolean;

  loginForm: FormGroup= new FormGroup({
    email:new FormControl(null,[Validators.email, Validators.required]),
    password: new FormControl(null,Validators.required)
  });

  constructor(private alertC: AlertController, private router: Router, private routeService: RouteService, private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user.email)
      console.log(this.user.id)

      if(this.loggedIn==true){
        console.log('esta logeado')

        this.loginForm.setValue({
          email:this.user.email,
          password:this.user.id
        })

        this.routeService.login(JSON.stringify(this.loginForm.value)).subscribe(
          data=>{ console.log(data);
            this.router.navigate(['/home'])
          },
          error=>{console.error(error)
            this.showAlert();
          }
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

  login(){

    if(!this.loginForm.valid){
      console.log('Invalid form')

    }

    //console.log(JSON.stringify(this.loginForm.value));
    this.routeService.login(JSON.stringify(this.loginForm.value)).subscribe(
      data=>{ console.log(data);
        this.router.navigate(['/home'])
      },
      error=>{console.error(error)
        this.showAlert();
      }
    )
  }

  async showAlert(){
    await this.alertC.create({
      header: "Incorrect data",
      message: "Your password or email are incorrect.",
      buttons: [{
        text: "Continue", handler: (res) =>{
          console.log(res)
        }
      }
      ]
  }).then(res=> res.present());
  }

}
