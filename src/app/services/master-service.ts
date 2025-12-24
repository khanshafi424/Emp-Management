import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmployeeModel, IApiResponseModel, ILoginModel } from '../models/Employee.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private http = inject(HttpClient);

  getAllEmployees() {
    return this.http.get<EmployeeModel[]>(
      'https://api.freeprojectapi.com/api/LeaveTracker/getAllEmployee'
    );
  }

  updateEmployee(employeeObj: EmployeeModel) {
    return this.http.put<IApiResponseModel>(
      'https://api.freeprojectapi.com/api/LeaveTracker/UpdateEmployee?id=' + employeeObj.empId,
      employeeObj
    );
  }

  createEmployee(employeeObj: EmployeeModel) {
    return this.http.post<IApiResponseModel>(
      'https://api.freeprojectapi.com/api/LeaveTracker/CreateNewEmployee',
      employeeObj
    );
  }

  deleleEmployee(empID: number) {
    return this.http.delete<IApiResponseModel>(
      'https://api.freeprojectapi.com/api/LeaveTracker/DeleteEmployee?id=' + empID
    );
  }

  login(obj: ILoginModel) {
    return this.http.post<IApiResponseModel>(
      'https://api.freeprojectapi.com/api/LeaveTracker/Login',
      obj
    );
  }

  getAllLeave() {
    return this.http.get<any>("https://api.freeprojectapi.com/api/LeaveTracker/GetAllBalances")
  }

  createLeaveBalance(leaveBalanceObj: any) {
    return this.http.post<any>(
      'https://api.freeprojectapi.com/api/LeaveTracker/AddLeaveBalance',
      leaveBalanceObj
    );
  }
}
