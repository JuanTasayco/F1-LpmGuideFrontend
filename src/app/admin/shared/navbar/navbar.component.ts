import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/auth/interfaces/userLog-interface';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user!: UserAuth;
  ngOnInit(): void {
    this.user = this.authService.user;
  }

  salir() {
    this.authService.logout();
    this.route.navigate(['/lpm/principal/valores']);
  }

  constructor(private authService: UserService, private route: Router) {}
}
