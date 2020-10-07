import { Injectable } from '@angular/core';
import { Route } from './route';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addRoute(id, route: Route): Observable<any> {
    return this.http.post<Route>('http://localhost:3000/api/create-route/'+ id, route, this.httpOptions)
      .pipe(
        catchError(this.handleError<Route>('Add Route'))
      );
  }

  getRoute(id): Observable<Route[]> {
    return this.http.get<Route[]>('http://localhost:3000/api/get-route/'+ id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Route fetched: ${id}`)),
        catchError(this.handleError<Route[]>(`Get Route id=${id}`))
      );
  }

  getRouteList(username): Observable<Route[]> {
    return this.http.get<Route[]>('http://localhost:3000/api/get-all/'+username,this.httpOptions)
      .pipe(
        tap(Routes => console.log('Routes fetched!')),
        catchError(this.handleError<Route[]>('Get Routes', []))
      );
  }

  updateRoute(username, id, route_name): Observable<any> {
    return this.http.post('http://localhost:3000/api/update-route/' + username +'/'+ id +'/'+ route_name, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Route updated: ${id}`)),
        catchError(this.handleError<Route[]>('Update Route'))
      );
  }

  deleteRoute(username, id): Observable<Route[]> {
    return this.http.post<Route[]>('http://localhost:3000/api/delete-route/' + username +'/'+  id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Route deleted: ${id}`)),
        catchError(this.handleError<Route[]>('Delete Route'))
      );
  }

  register(body:any)  {
    return this.http.post('http://localhost:3000/api/register', body, {
      observe:'body',
      headers:new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  login(body:any)  {
    return this.http.post('http://localhost:3000/api/login', body, {
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  home(){
    return this.http.get('http://localhost:3000/api/home', {
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type', 'application/json')
    });
  
  }

  addRoutes(){
    return this.http.get('http://localhost:3000/api/addroutes', {
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type', 'application/json')
    });
  
  }

  logout(){
    return this.http.get('http://localhost:3000/api/logout', {
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
