import { IStudent } from './../../../share/services/models/Istudent';
import { HttpService } from './../../../share/services/http/http.service';
import { IdService } from './../../../share/services/id/id.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  idStudent: number;
  validateForm!: FormGroup;
  student: IStudent;

  constructor(private id: IdService, private fb: FormBuilder, private router: Router, private http: HttpService) { }

  ngOnInit(): void {
    this.initValidateForms();
    this.idStudent = this.id.getID();
    console.log(this.idStudent);
    this.getData();
  }

  initValidateForms(): void {
    this.validateForm = this.fb.group({
      studentId: [null, [Validators.required]],
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      class: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      dob: [null],
      email: [null]
    });
  }
  
  getData() {
    this.http.getStudent(this.idStudent).subscribe((res: IStudent) => {
      this.student = res;
      this.passData();
    });
  }

  passData() {
    this.validateForm.controls.studentId.patchValue(this.student.studentId);
    this.validateForm.controls.fname.patchValue(this.student.firstName);
    this.validateForm.controls.lname.patchValue(this.student.lastName);
    this.validateForm.controls.address.patchValue(this.student.address);
    this.validateForm.controls.phone.patchValue(this.student.phone);
    this.validateForm.controls.class.patchValue(this.student.universityClass);
    this.validateForm.controls.email.patchValue(this.student.email);
    this.validateForm.controls.dob.patchValue(this.student.dayOfBirth);
  }

  updateData(studentId: string, firstName: string, lastName: string, universityClass: string, address: string, phone: string, dayOfBirth?: Date, email?: string): void {
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
      this.http.updateStudent(this.idStudent, student).subscribe(res => {
        alert('Success');
        this.router.navigate(['../students']);
      });
    }
  }

}
