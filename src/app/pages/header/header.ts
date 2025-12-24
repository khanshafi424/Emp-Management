
import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserRole } from '../../core/enums/user-role.enum';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  isCollapsed = false;
  
  empName = signal<string>('Admin');
  role = signal<UserRole>(UserRole.Employee);
  isHR = computed(() => this.role() === UserRole.HR);

  constructor(private router: Router) {
    // try to read username from localStorage if available
    const localData = localStorage.getItem('leaveUser');
   
    if (localData != null) { 
      const userObj = JSON.parse(localData);
      if (userObj && userObj && userObj.empName) {
        this.empName.set(userObj.userName);
        this.role.set(userObj.role);
        console.log(this.isHR())
      }
     }
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem('leaveUser');
    this.router.navigate(['/login']);
  }
}
