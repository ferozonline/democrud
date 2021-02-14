import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Policy } from './policy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  getPolicys() {
    return this.http.get<Policy[]>('http://localhost/backend/api/read.php');
  }

  deletePolicy(id: number){
   
    // return this.httpClient.delete<Policy>(`${this.PHP_API_SERVER}/backend/api/delete.php/?id=${id}`);
    return this.http.delete<Policy>('http://localhost/backend/api/delete.php?id='+id);
  }

  createPolicy(policy: Policy): Observable<Policy>{
    return this.http.post<Policy>('http://localhost/backend/api/create.php', policy);
  }

  updatePolicy(policy: Policy){
    return this.http.put<Policy>('http://localhost/backend/api/update.php', policy);
    4 }
    
}