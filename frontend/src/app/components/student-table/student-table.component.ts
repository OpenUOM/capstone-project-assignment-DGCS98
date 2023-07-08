import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  studentData: any;
  selected: any;
  originalStudentData: any; // Store the original student data for filtering

  constructor(private service: AppServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent() {
    this.router.navigate(['addStudent']);
  }

  editStudent(id) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['editStudent'], navigationExtras);
  }

  getStudentData() {
    this.service.getStudentData().subscribe(
      response => {
        this.studentData = response;
        this.originalStudentData = this.studentData; // Save the original data for filtering
      },
      error => {
        console.log('ERROR - ', error);
      }
    );
  }

  search(value: string) {
    if (value.length <= 0) {
      this.studentData = this.originalStudentData; // Restore the original data
    } else {
      const filteredStudents = this.originalStudentData.filter(student =>
        student.name.toLowerCase().includes(value.toLowerCase())
      );
      this.studentData = filteredStudents;
    }
  }

  deleteStudent(itemid) {
    const student = {
      id: itemid
      // Delete logic implementation
    };
    // Delete API call
  }
}
