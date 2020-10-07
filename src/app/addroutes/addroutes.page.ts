import { Component, OnInit, NgZone } from '@angular/core';
import { RouteService } from '../../../shared/route.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-addroutes',
  templateUrl: './addroutes.page.html',
  styleUrls: ['./addroutes.page.scss'],
})
export class AddroutesPage implements OnInit {

  routeForm: FormGroup;
  id;
  loggedUser:any=[];

  constructor(
    private songAPI: RouteService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone
  ) {
    this.routeForm = this.fb.group({
      route_name: [''],
      id: ['']
    })
  }

  ngOnInit() {
    
    let loggedUser1 = JSON.parse(sessionStorage.getItem("loggedUserInfo"));
    this.loggedUser=cloneDeep(loggedUser1)
    this.id=cloneDeep(this.loggedUser._id)

  }

  onFormSubmit() {
    if (!this.routeForm.valid) {
      return false;
    } else {
      this.songAPI.addRoute(this.id, this.routeForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.routeForm.reset();
            this.router.navigate(['/home']);
          })
        });
    }
  }
}
