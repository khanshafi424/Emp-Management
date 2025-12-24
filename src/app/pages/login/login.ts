import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  masterService = inject(MasterService);
  router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    
    this.masterService
      .login(this.loginForm.value)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('leaveUser', JSON.stringify(res))
          if((res.role) as any === 'HR'){
            this.router.navigate(['/employee']);
          }else {
            this.router.navigate(['/leave-request']);
          }
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
  }
}
