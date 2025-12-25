import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-request',
  imports: [FormsModule, CommonModule],
  templateUrl: './leave-request.html',
  styleUrl: './leave-request.css',
})
export class LeaveRequest implements OnInit {
  leaveRequest = {
    leaveId: 0,
    empId: 0,
    leaveDate: new Date(),
    fromDate: '',
    toDate: '',
    reason: '',
    leaveType: '',
  };

  masterService = inject(MasterService);
  leaveRequests = signal<any[]>([]);

  constructor() {
    const localData = localStorage.getItem('leaveUser');
    if (localData != null) {
      const userObj = JSON.parse(localData);
      if (userObj && userObj.empId) {
        this.leaveRequest.empId = userObj.empId;
      }
    }
  }

  ngOnInit(): void {
    this.loadleaveRequestsByEmp();
  }

  loadleaveRequestsByEmp() {
    this.masterService.getLeaveRequestsByEmpId(this.leaveRequest.empId).subscribe({
      next: (res: any) => {
        this.leaveRequests.set(res);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  onSubmit() {
    console.log(this.leaveRequest);
    this.masterService.leaveRequest(this.leaveRequest).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.loadleaveRequestsByEmp();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  reset(){
    this.leaveRequest = {
      leaveId: 0,
      empId: this.leaveRequest.empId,   
      leaveDate: new Date(),
      fromDate: '',
      toDate: '',           
      reason: '',
      leaveType: '',
    };
  }
}
