import { Component, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterLink],
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  isLoggedIn = computed(() => this.authService.isLoggedIn());

  handleAuthClick() {
    if (this.isLoggedIn()) {
      this.authService.logout();
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/login');
    }

    console.log('Header component isLoggedIn:', this.isLoggedIn());
  }
}
