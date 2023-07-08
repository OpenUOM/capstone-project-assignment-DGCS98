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
  teacherData: any[];
  selected: any;
  originalTeacherData: any[]; // Store the original teacher data for filtering

  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTeacherData();
  }

  addNewTeacher(): void {
    this.router.navigate(['addTeacher']);
  }

  editTeacher(id: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    this.router.navigate(['editTeacher'], navigationExtras);
  }

  initializeDB(): void {
    this.service.initializeDB().subscribe(
      (response) => {
        console.log('DB is Initialized');
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }

  getTeacherData(): void {
    this.selected = 'Teacher';
    this.service.getTeacherData().subscribe(
      (response) => {
        this.teacherData = Object.values(response);
        this.originalTeacherData = [...this.teacherData];
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }


  deleteTeacher(itemid: number): void {
    const test = {
      id: itemid
    };
    this.service.deleteTeacher(test).subscribe(() => {
      this.getTeacherData();
    });
  }

  search(value: string): void {
    if (value.length <= 0) {
      this.teacherData = [...this.originalTeacherData];
    } else {
      const filteredItems = this.originalTeacherData.filter((teacher) => {
        return teacher.name.toLowerCase().includes(value.toLowerCase());
      });
      this.teacherData = filteredItems;
    }
  }
}
 