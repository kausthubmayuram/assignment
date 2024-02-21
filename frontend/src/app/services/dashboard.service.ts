import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }

  getTasklist() {
    return this.http.get(environment.baseUrl + 'task');
  }

  
  createTask(data:any) {
    return this.http.post(environment.baseUrl + 'task/add',data);
  }

  deleteTask(data:any) {
    return this.http.post(environment.baseUrl + 'task/delete',data);
  }
  
  updateTask(data:any) {
    return this.http.post(environment.baseUrl + 'task/update',data);
  }
}
