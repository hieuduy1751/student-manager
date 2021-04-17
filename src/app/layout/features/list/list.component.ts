import { Router } from '@angular/router';
import { IdService } from './../../../share/services/id/id.service';
import { IStudent } from './../../../share/services/models/Istudent';
import { HttpService } from './../../../share/services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  datas: IStudent[] = [];
  idStudent: number;
  studentLabel: Array<any>;
  studentInfo: Array<any>;
  listOfCols = [
    {
      title: 'StudentID',
      compare: (a: IStudent, b: IStudent) => b.studentId - a.studentId,
      priority: 10 
    },
    {
      title: 'Fullname',
      compare: (a:IStudent, b: IStudent) => (`${a.firstName} ${a.lastName}`).localeCompare(`${b.firstName} ${b.lastName}`),
      priority: 3
    },
    {
      title: 'Birthday',
      compare: (a: IStudent, b: IStudent) => a.dayOfBirth.getTime() - b.dayOfBirth.getTime(),
      priority: 4
    },
    {
      title: 'Class',
      compare: (a: IStudent, b: IStudent) => a.universityClass.localeCompare(b.universityClass),
      priority: 3
    },
    {
      title: 'Phone',
      compare: (a: IStudent, b: IStudent) => a.phone.localeCompare(b.phone),
      priority: 2
    },
    {
      title: 'Email',
      compare: (a: IStudent, b: IStudent) => a.email.length - b.email.length,
      priority: 1
    },
    {
      title: 'Action',
      compare: null,
      priority: null
    }
  ]
  constructor(private studentService: HttpService, private id: IdService, private modal: NzModalService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  setID(id: number) {
    this.id.setID(id);
  }

  getData() {
    this.studentService.getStudents().subscribe((res: IStudent[]) => {
      this.datas = res;
      console.log(this.datas);
    })
  }

  addData(studentId: number, firstName: string, lastName: string, universityClass: string, address: string, phone: string, dayOfBirth?: Date, email?: string): void {
    let student: IStudent = {
      id: this.datas[this.datas.length - 1].id + 1,
      studentId,
      firstName,
      lastName,
      universityClass,
      address,
      phone,
      dayOfBirth: dayOfBirth || null,
      email: email || null
    };
    this.studentService.addStudent(student).subscribe(student => this.datas.push(student));

  }

  showModal(): void {
    console.log(this.id.getID());
    let infoStudent: IStudent = this.datas.find(std => std.id === this.id.getID());
    this.studentLabel =['StudentID', 'Fullname', 'Birthday', 'Class', 'Phone', 'Email', 'Address'];
    this.studentInfo = [ infoStudent.studentId, `${infoStudent.firstName} ${infoStudent.lastName}`, infoStudent.dayOfBirth, infoStudent.universityClass, infoStudent.phone, infoStudent.email, infoStudent.address ];
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  deleteData() {
    this.isConfirmLoading = true;
    console.log(this.id.getID());
    this.studentService.deleteStudent(this.id.getID()).subscribe(done => {
      console.log(done);
      this.getData();
      this.isConfirmLoading = false;
      this.isVisible = false;
    })
  }
}
