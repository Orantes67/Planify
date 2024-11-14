import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Planify';
  isLoggedIn: boolean = false;
  constructor(private router: Router){}

  ngOnInit() {
    this.checkLoginStatus();
  }
  isLoginRoute(): boolean {
    return this.router.url === '/login' || this.router.url === '/register'; 
  }
  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('user'); 
  }
}
