import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: User;

  constructor(private authService: AuthService, private routeur: Router) { }

  ngOnInit() {
    this.loginUser = new User('kiichigo', '');
  }

  onLogin(): void {
    if (this.authService.login(this.loginUser.login, this.loginUser.password)) {
      this.routeur.navigate(['/biscuits']);
    }
  }

}
