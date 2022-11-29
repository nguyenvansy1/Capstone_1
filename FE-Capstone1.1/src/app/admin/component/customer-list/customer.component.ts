import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../../service/customer.service';
import {Customer} from '../../../../model/customer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../../../model/user';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerList: Customer[];
  keywordName: undefined;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements: number;
  itemPerPage = 1;
  formAddCustomer: FormGroup;
  uploadedAvatar = null;
  loading = false;
  oldAvatarLink = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
  // tslint:disable-next-line:max-line-length
  constructor(private storage: AngularFireStorage, private toastr: ToastrService, private customerService: CustomerService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getListCustomer();
    this.formAddCustomer = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        avatar: ['']
      }
    );
  }

  getListCustomer() {
    if (this.keywordName !== undefined) {
      this.searchByName(this.keywordName);
    } else {
      this.getListCustomer2();
    }
  }
  getListCustomer2() {
    this.customerService.getAllCustomerPage(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
  }

  searchByName(value: string) {
    console.log(value);
    this.customerService.getCustomerByName(this.thePageNumber - 1, this.thePageSize, value).subscribe(this.processResult());
  }
  processResult() {
    return (data) => {
      this.customerList = data.content; //
      this.thePageNumber = data.number + 1;
      this.thePageSize = data.size;
      this.theTotalElements = data.totalElements;
      this.processItemPerPage();
    };
  }

  processItemPerPage() {
    if (this.thePageNumber * this.thePageSize > this.theTotalElements) {
      this.itemPerPage = this.theTotalElements;
    } else {
      this.itemPerPage = this.thePageNumber * this.thePageSize;
    }
  }

  updatePageSize(pageSize) {
    this.thePageSize = pageSize.value;
    this.thePageNumber = 1;
    this.getListCustomer();
  }

  resetFormCustomer() {
    this.formAddCustomer.reset();
    this.oldAvatarLink = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
  }

  public addCustomer(addForm: FormGroup): void {
      // Upload img & download url
      if (this.uploadedAvatar !== null) {
        const avatarName = this.getCurrentDateTime() + this.uploadedAvatar.name;
        const fileRef = this.storage.ref(avatarName);
        this.storage.upload(avatarName, this.uploadedAvatar).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.formAddCustomer.controls.avatar.setValue(url);
              this.customerService.addCustomer(addForm.value).subscribe(
                (data: Customer) => {
                  this.resetFormCustomer();
                  this.toastr.success('Add customer successfully!', 'Success: ');
                },
                (error: HttpErrorResponse) => {
                  this.toastr.error('Add customer unsuccessfully!', 'Error: ');
                }
              );
            });
          })
        ).subscribe();
      } else {
        console.log('OK');
        // tslint:disable-next-line:max-line-length
        this.formAddCustomer.controls.avatar.setValue('https://firebasestorage.googleapis.com/v0/b/dtu-event.appspot.com/o/avatar-1577909_960_720.webp?alt=media&token=357a5021-db9a-41a4-acbe-024c99459720');
        this.customerService.addCustomer(addForm.value).subscribe(
          (data: Customer) => {
            this.resetFormCustomer();
            this.toastr.success('Add customer successfully!', 'Success: ');
          },
          (error: HttpErrorResponse) => {
            this.toastr.error('Add customer unsuccessfully!', 'Error: ');
          }
        );
      }
  }

  public onOpenModal(customer: Customer, mode: string): void {
    const container = document.getElementById('wrapper');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCustomerModal');
    }
    console.log(container);
    console.log(button);
    container.appendChild(button);
    button.click();
  }

  getAvatar(event: any) {
    this.uploadedAvatar = event.target.files[0];
    if (this.uploadedAvatar) {
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedAvatar);
      reader.onload = (e: any) => {
        this.oldAvatarLink = e.target.result;
      };
    }
  }

  private getCurrentDateTime() {
    return new Date().getTime();
  }
}
