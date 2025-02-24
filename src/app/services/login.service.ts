import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //Current User details which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

    //login user set token in local strorage
    public loginUser(token:any){
      localStorage.setItem('token',token);
      return true;
    }

    ///user is loggedIn or not
    public isLoggedIn(){
      let tokenStr = localStorage.getItem('token');
      //console.log("tokenStr"+tokenStr)
      if(tokenStr == null || tokenStr == ' '){
        return false;
      }
        return true;
     
    }

    //loggedOut : remove token from storage

    public loggedOut(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    }

    //get token
    public getToken(){
      return localStorage.getItem('token');
      
    
    }

    //set user details
    public setUserDetails(user: any){
      localStorage.setItem('user',JSON.stringify(user));
    }

    //getUser
    public getUser(){
      let userStr = localStorage.getItem('user');
      if(userStr != null){
       return JSON.parse(userStr);
      }else{
        this.loggedOut();
        //return null;
      }
    }

    //get User Role
    public getUserRole(){
      let user = this.getUser();
      console.log("getUserRoleMethod: "+ JSON.stringify(user))
      return user.authorities[0].authority;
      //return user;
    }


}
