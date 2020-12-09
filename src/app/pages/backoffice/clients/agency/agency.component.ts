import { Component, OnInit } from '@angular/core';
import {Option, UserInfomation} from '../../../../core/model'
import { DataService, AdminService, AdminUserService, CacheService } from 'src/app/core/service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';
import { CustomValidators } from 'ng2-validation';


@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {

  searchText:string='';
  public p:any;

  operators: UserInfomation[] = [];
  user: UserInfomation;
  users: UserInfomation[] =[];

  public modalRef: NgbModalRef;
  public form:FormGroup;

  constructor(public adminService: AdminUserService,
    public cachService: CacheService,
    public fb:FormBuilder, 
    public toastrService: ToastrService,
    public confirmationDialogService:  ConfirmationDialogService,
    public modalService: NgbModal) 
  {
    let svc = this;
    this.adminService.get_operators(this.cachService.getToken()).then(res=>{
      if(res!=null)
      {
        svc.operators = res;
      }
    });
    this.adminService.get_agencis(this.cachService.getToken()).then(res=>{
      if(res!=null)
      {
        svc.users = res;
      }
    });
  }
  ngOnInit() {
    this.form = this.fb.group({
      id: null,
      login: [null, Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, CustomValidators.email])],
      password: '',      

      name: [null, Validators.compose([Validators.required])],
      surname: [null, Validators.compose([Validators.required])],
      language: 'en',
      birth: '',
      place: '',
      gender: 'Male',
      address: '',
      phone: '',
      mobile: '',
      fax: '',
      created_at: '',
      role:'agency', 
      parent_id: 0,
      balance: 0,
      status: 0,      
      is_terminal: 0,
    });      
  }

  public openModal(modalContent, user:UserInfomation) {
    if(user){
      this.user = user;
      this.form.setValue(user);
    } 
    else{
      this.user = new UserInfomation();
      this.user.id = 0;      
      this.user.role = 'agency';
    }   

    let dlg_options: any = {
      size: "dialog-centered"
      };    
    this.modalRef = this.modalService.open(modalContent, dlg_options);
    
    this.modalRef.result.then((result) => {
      this.form.reset();
    }, (reason) => {
      this.form.reset();
    });
  }

  public closeModal(){
    this.modalRef.close();
  }


  public onSubmit(user:UserInfomation):void {
    if (this.form.valid) {
      console.log(user);      
      if(user.id){
        this.updateData(user);
      }
      else{
        this.addData(user);
      }      
      this.modalRef.close();    
    }
  } 

  updateData(user:UserInfomation)
  {
    let svc = this;
    this.adminService.update_agency(this.cachService.getToken(), user).then(res=>{
      if(res)
      {
        for(let i=0; i<svc.users.length; i++)
        {
          if(svc.users[i].id == user.id)
          {
            svc.users[i] = user;
            break;
          }
        }
        this.toastrService.success('Success', 'Updated user');
      }
      else
      {
        svc.toastrService.error('Failed!', svc.adminService._message);        
      }
    })
  }

  addData(user:UserInfomation)
  {
    let svc = this;
    user.role = "agency";
    this.adminService.add_agency(this.cachService.getToken(), user).then(res=>{
      if(res > 0)
      {
        user.id = res;
        user.created_at = new Date().toDateString();
        svc.users.push(user);
        this.toastrService.success('Success', 'Added new operator');
      }
      else
      {
        svc.toastrService.error('Failed!', svc.adminService._message);
      }
    })
  }

  deleteData(user:UserInfomation)
  {
    let svc = this;
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this operator ?')
    .then((confirmed) => {
      if(confirmed)
      {
        svc.adminService.remove_agency(this.cachService.getToken(), user.id).then(res=>{
          if(res)
          {
            for(let i=0; i<svc.users.length; i++)
            {
              if(svc.users[i].id == user.id)
              {
                svc.users.splice(i, 1);
                break;
              }
            }
            this.toastrService.success('Success', 'Removed operator');
          }
          else
          {
            svc.toastrService.error('Failed!', svc.adminService._message);
          }
        })
      }
    })
    .catch(() => {});
  }

  get_operator(id)
  {
    let parent = '';
    this.operators.forEach(op =>{
      if(op.id == id)
      {
        parent = op.login;
      }
    })
    return parent;
  }

}
