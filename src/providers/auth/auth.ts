import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http , Headers } from '@angular/http';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthProvider {

  public token:any;
  constructor(public storage:Storage ,public http: Http) {
    console.log('Hello AuthProvider Provider');
  }
  login(credentials){
    return new Promise((resolve, reject) => {
        let headers = new Headers();

    headers.append('Access-Control-Allow-Origin' , '*');
       headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('Content-type','application/json');
       headers.append('X-Requested-With','XMLHttpRequest');
        this.http.post('http://127.0.0.1:8000/api/auth/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            this.token = data.token;
            localStorage.setItem('token',data.access_token);

            resolve(data);
   }, (err) => {
            reject(err);

          });  });

  }
  checkAuthentication(){

    return new Promise((resolve, reject) => {


      resolve(localStorage.getItem('token'))


    })




  }


  logout(){

    localStorage.setItem('token','');

   }




}
