import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  username: String = "";
  password: String = "";

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    console.log('login');
    if(!!this.username && !!this.password) {
      let value = {
        "username": this.username,
        "password": this.password
      }
      let response = this.authService.login(value);

      if(response) {
        this.router.navigate(['dashboard']);
      }
    }
  }

}
