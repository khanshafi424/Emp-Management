import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeModel, IApiResponseModel } from '../../models/Employee.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../../services/master-service';

@Component({
  selector: 'app-Employee',
  imports: [FormsModule, CommonModule],
  templateUrl: './Employee.html',
  styleUrl: './Employee.css',
  standalone: true,
})
export class Employee implements OnInit {

  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList = signal<EmployeeModel[]>([]);
  http = inject(HttpClient);
  masterService = inject(MasterService);
  isEdit: boolean = false;

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.masterService.getAllEmployees().subscribe({
      next: (res: EmployeeModel[]) => {
        this.employeeList.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onEdit(emp: EmployeeModel) {
    this.employeeObj = emp;
    this.isEdit = true;
  }

  reset() {
    this.employeeObj = new EmployeeModel();
    this.isEdit = false;
  }

  onDelete(empID: number) {
    this.masterService.deleleEmployee(empID).subscribe({
      next: (res: IApiResponseModel) => {
        alert(res.message);
        this.getAllEmployees();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  onUpdateEmployee() {
    this.masterService.updateEmployee(this.employeeObj).subscribe({
      next: (res: IApiResponseModel) => {
         this.getAllEmployees();
        alert(res.message);
      },
      error: (err: any) => {
        alert(err.error.message);
      },
    });
  }

  submit() {
    this.masterService.createEmployee(this.employeeObj).subscribe({
      next: (res: IApiResponseModel) => {
        this.getAllEmployees();
        this.employeeObj = new EmployeeModel();
        alert(res.message);
      },
      error: (err: any) => {
        alert(err.error.message);
      },
    });
  }
}
