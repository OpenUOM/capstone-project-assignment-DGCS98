import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  teacherData: any;
  selected: any;
  originalTeacherData: any; // Store the original teacher data for filtering

  constructor(private service: AppServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher() {
    this.router.navigate(['addTeacher']);
  }

  editTeacher(id) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['editTeacher'], navigationExtras);
  }

  initializeDB() {
    this.service.initializeDB().subscribe(
      response => {
        console.log('DB is Initialized');
      },
      error => {
        console.log('ERROR - ', error);
      }
    );
  }

  getTeacherData() {
    this.selected = 'Teachers';
    this.service.getTeacherData().subscribe(
      response => {
        this.teacherData = response;
        this.originalTeacherData = this.teacherData; // Save the original data for filtering
      },
      error => {
        console.log('ERROR - ', error);
      }
    );
  }

  search(value: string) {
    if (value.length <= 0) {
      this.teacherData = this.originalTeacherData; // Restore the original data
    } else {
      const filteredTeachers = this.originalTeacherData.filter(teacher =>
        teacher.name.toLowerCase().includes(value.toLowerCase())
      );
      this.teacherData = filteredTeachers;
    }
  }

  deleteTeacher(itemid) {
    const test = {
      id: itemid
      // Delete logic implementation
    };
    // Delete API call
  }
}
