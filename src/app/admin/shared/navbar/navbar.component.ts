import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/auth/interfaces/userLog-interface';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user!: UserAuth;
  ngOnInit(): void {
    /* in this point , user is available */
    this.user = this.authService.user;
  }

  constructor(private authService: UserService) {}
}
