import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { Collapse, Dropdown, Ripple, initTE } from 'tw-elements';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  themeIcons: string = 'light_mode';

  constructor(private route: Router, private toster: ToastrService) {}

  ngOnInit(): void {
    if (localStorage.getItem('theme') == 'light') {
      this.themeIcons = 'dark_mode';
    } else if (localStorage.getItem('theme') == 'dark') {
      this.themeIcons = 'light_mode';
    }
    initTE({ Collapse, Dropdown, Ripple });
  }

  toggleTheme() {
    window.location.reload();
    if (localStorage.getItem('theme') == 'light') {
      localStorage.setItem('theme', 'dark');
    } else if (localStorage.getItem('theme') == 'dark') {
      localStorage.setItem('theme', 'light');
    }
  }

  logout() {
    // Display SweetAlert confirmation on logout
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle logout logic here
        localStorage.removeItem('token');
        this.route.navigate(['/login']);
      }
    });
  }
}
