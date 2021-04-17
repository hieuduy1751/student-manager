import { IStudent } from './../models/Istudent';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  getStudents(): Observable<IStudent[]> {
    const path = `${environment.apiUrl}/students`;
    return this.http.get<IStudent[]>(path).pipe(
    );
  }

  getStudent(id: number): Observable<IStudent> {
    const path = `${environment.apiUrl}/students/${id}`;
    return this.http.get<IStudent>(path).pipe();
  }

  updateStudent(id: number, student: IStudent) {
    const path = `${environment.apiUrl}/students/${id}`;
    return this.http.put(path, student).pipe();
  }

  addStudent(student: IStudent): Observable<IStudent> {
    const path = `${environment.apiUrl}/students`;
    return this.http.post<IStudent>(path, student).pipe();
  }

  deleteStudent(id: number) {
    const path = `${environment.apiUrl}/students/${id}`;
    return this.http.delete(path).pipe();
  }
}
