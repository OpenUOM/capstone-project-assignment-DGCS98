import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  readonly ROOT_URL: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = environment.production ? 'api' : 'http://localhost:8080';
  }

  initializeDB() {
    return this.http.get(`${this.ROOT_URL}/dbinitialize`);
  }

  getTeacherData() {
    return this.http.get(`${this.ROOT_URL}/listTeachers`);
  }

  getStudentData() {
    return this.http.get(`${this.ROOT_URL}/listStudents`);
  }

  getOneStudentData(payload: any) {
    return this.http.post(`${this.ROOT_URL}/getStudentInfo`, payload);
  }

  getOneTeacherData(payload: any) {
    return this.http.post(`${this.ROOT_URL}/getTeacherInfo`, payload);
  }

  addTeacher(payload: any) {
    return this.http.post(`${this.ROOT_URL}/addTeacher`, payload);
  }

  deleteTeacher(payload: any) {
    return this.http.post(`${this.ROOT_URL}/deleteTeacher`, payload);
  }

  editTeacher(payload: any) {
    return this.http.post(`${this.ROOT_URL}/editTeacher`, payload);
  }

  editStudent(payload: any) {
    return this.http.post(`${this.ROOT_URL}/editStudent`, payload);
  }

  addStudent(payload: any) {
    return this.http.post(`${this.ROOT_URL}/addStudent`, payload);
  }

  deleteStudent(payload: any) {
    return this.http.post(`${this.ROOT_URL}/deleteStudent`, payload);
  }
}
