import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = false;

  constructor(private router: Router) { }

  login(value: any) {
    if((value.username === environment.username) && (value.password === environment.password)) {
      localStorage.setItem('STATE_CP', 'true');
      return true;
    } else {
      return false;
    }
    
  }

  logout() {
    localStorage.setItem('STATE_CP', 'false');
    this.router.navigate(['/login']);
    return true;
  }

  isLoggedIn() {
    if(!!localStorage.getItem('STATE_CP')) {
      const loggedIn = localStorage.getItem('STATE_CP');
      if(loggedIn == 'true') {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
      return this.isLogin;
    } else {
      return false;
    }
     
  }
}
