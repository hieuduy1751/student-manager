import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IStudent } from './../../../share/services/models/Istudent';
import { HttpService } from './../../../share/services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {
  datas: IStudent[] = [];
  validateForm!: FormGroup;

  constructor(private studentService: HttpService, private router: Router, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.getData();
    this.validateForm = this.fb.group({
      studentId: [null, [Validators.required]],
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      class: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });
  }

  

  getData() {
    this.studentService.getStudents().subscribe((res: IStudent[]) => {
      this.datas = res;
      console.log(this.datas);
    })
  }

  addData(studentId: string, firstName: string, lastName: string, universityClass: string, address: string, phone: string, dayOfBirth?: Date, email?: string): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    };
    console.log(this.validateForm);
    if(this.validateForm.status === 'VALID') {
      let student: IStudent = {
        studentId: parseInt(studentId),
        firstName,
        lastName,
        universityClass,
        address,
        phone,
        dayOfBirth: dayOfBirth || null,
        email: email || null
      };
      try {
        student.id = this.datas[this.datas.length - 1].id + 1;
      } catch (error) {
          student.id = 1;
      }
      this.studentService.addStudent(student).subscribe(student => {
        alert('Success!');
        this.router.navigate(['../students']);
        return this.datas.push(student);
      })
    }
  }

}
