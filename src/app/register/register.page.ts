import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {RouteService} from '../../../shared/route.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup= new FormGroup({

    email: new FormControl(null,[Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required)

  })

  constructor(private router:Router, private routeService: RouteService) { }

  ngOnInit() {
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
