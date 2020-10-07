import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../shared/route.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-modifyroutes',
  templateUrl: './modifyroutes.page.html',
  styleUrls: ['./modifyroutes.page.scss'],
})
export class ModifyroutesPage implements OnInit {

  updateRouteForm: FormGroup;
  id: any;
  response:any=[];
  routes:any=[];
  a:any;
  inputValue: string = "";
  inputValueId: string= "";

  constructor(
    private routeService: RouteService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    let item = JSON.parse(sessionStorage.getItem("loggedUserInfo"));
    this.response=cloneDeep(item)
    this.getRouteData(this.id);
    this.updateRouteForm = this.fb.group({
      route_name: [''],
      id: ['']
    })
  }

  getRouteData(routeId) {
    console.log(this.response.username)
    this.routeService.getRoute(routeId).subscribe(res => {

      console.log(routeId)

      console.log(res)
      
      this.routes=cloneDeep(res)
      
      console.log(this.routes)
      console.log(this.routes[0].routes)

      this.a= this.routes[0].routes.find(x => x.id == routeId).route_name;
      console.log(this.a)

      
    this.updateRouteForm.setValue({
      route_name: this.a,
      id: this.id
    });

    });
  }

  updateForm() {
    if (!this.updateRouteForm.valid) {
      return false;
    } else {
      this.routeService.updateRoute(this.response.username,this.inputValueId, this.inputValue)
        .subscribe((res) => {

          console.log(this.a)

          console.log(this.id)

          console.log(this.inputValue)
          
          console.log(this.inputValueId)
          
          console.log(res)
          
          this.updateRouteForm.reset();
          
          this.router.navigate(['/home']);
        })
    }
  }

}
