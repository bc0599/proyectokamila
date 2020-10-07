import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Routes: any = [];
  response: any = [];
  routesArray:any=[];

  constructor(
    private routeService: RouteService,
    private router: Router
  ) {
    this.routeService.home().subscribe(
      data=> {console.log(data);
        sessionStorage.setItem("loggedUserInfo", JSON.stringify(data));
      },
      error=> this.router.navigate(['/login'])
    )


  }
  ngOnInit(){}
  
  ionViewDidEnter() {
    let item = JSON.parse(sessionStorage.getItem("loggedUserInfo"));
    this.response=cloneDeep(item)
    this.routeService.getRouteList(this.response.username).subscribe((res)=>{
      this.routesArray=cloneDeep(res)
      this.Routes=this.routesArray.routes
    })
  }

  deleteRoute(route, i) {
    if (window.confirm('Do you want to delete route?')) {

      this.routeService.deleteRoute(this.response.username, route.id )
        .subscribe((res) => {
          console.log(res)
          console.log(this.response.username)
          console.log(route.id)
          this.Routes.splice(i, 1);
          console.log('Route deleted!')
        }
        )
    }
  }

  logout(){
    this.routeService.logout().subscribe(
      data=>{ console.log(data); this.router.navigate(['/login'])},
      error=> console.error(error)
      )
      
  }

  addRoute(){
    this.routeService.addRoutes().subscribe(
      data=>{ console.log(data); this.router.navigate(['/addroutes'])},
      error=> console.error(error)
      )
      
  }
}
