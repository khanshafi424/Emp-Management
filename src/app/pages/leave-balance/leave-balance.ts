import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, single } from 'rxjs';
import { MasterService } from '../../services/master-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-balance',
  imports: [FormsModule, CommonModule],
  templateUrl: './leave-balance.html',
  styleUrl: './leave-balance.css',
})
export class LeaveBalance implements OnInit {
  leaveBalanceObj: any = {
    balanceId: 0,
    empId: null,
    updatedDate: new Date(),
    count: 0,
    updateBy: 0,
    leaveType: '',
  };

  @ViewChild('formModel') formModelViewChild!: ElementRef;
  allLeaves = signal<any[]>([]);
  masterService = inject(MasterService);
  employeeList$:Observable<any[]> = this.masterService.getAllEmployees();

  ngOnInit(): void {
    this.fetchAllLeaves();
    const localData = localStorage.getItem('leaveUser');
    if (localData != null) {
      const userObj = JSON.parse(localData);
      if (userObj && userObj.empId) {
        this.leaveBalanceObj.updateBy = userObj.empId;
      }
    }
  }

  openformModel() {
    if (this.formModelViewChild) {
      this.formModelViewChild.nativeElement.style.display = 'block';
    }
  }
  closeformModel() {
    this.formModelViewChild.nativeElement.style.display = 'none';
  }

  onSubmit() {
    this.masterService.createLeaveBalance(this.leaveBalanceObj).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.closeformModel();
        this.fetchAllLeaves();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  fetchAllLeaves() {
    this.masterService.getAllLeave().subscribe({
      next: (res: any) => {
        this.allLeaves.set(res);
        console.log(this.allLeaves());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
