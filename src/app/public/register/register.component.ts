import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TruckOwner } from "../../truck-owners/model/truck-owner";
import { TruckOwnersService } from "../../truck-owners/services/truck-owners.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit {
  trucks: Array<any> = [];
  TempTruck: TruckOwner;
  pass: string = '';

  registerForm: FormGroup = this.formBuilder.group({
    ownerFirstName: ['', Validators.required],
    ownerLastName: ['', Validators.required],
    brandName: ['', Validators.required],
    email: ['', Validators.required],
    address: [''],
    websiteUrl: [''],
    menuUrl: [''],
    /*email: ["", {validators: [Validators.required], updateOn: 'change'}],
    password: ["", {validators: [Validators.required, Validators.minLength(8)], updateOn: 'change'}],
    foodTruckName: ["", {validators: [Validators.required], updateOn: 'change'}],
    foodTruckType: ["", {validators: [Validators.required], updateOn: 'change'}],
    */
  });
  constructor(
    private service: TruckOwnersService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.TempTruck = {} as TruckOwner;
  }

  ngOnInit(): void {}

  AddTruck() {
    this.TempTruck = this.registerForm.value;
    this.TempTruck.id = 0;
    this.service.AddTruckOwner(this.TempTruck).subscribe((response: any) => {
      this.trucks.push({ ...response});
      this.registerForm.reset();
      console.log(this.trucks);
    });
  }

  /*openDialog() {
    this.dialog.open(DialogBoxComponent, {
      width: '250px',
      height: '250px',
      data: 'right click',
    });
  }

   */

}
