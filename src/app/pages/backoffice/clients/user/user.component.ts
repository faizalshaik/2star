import { Component, OnInit } from '@angular/core';
import {Option, UserInfomation} from '../../../../core/model'
import { DataService, AdminService, AdminUserService, CacheService } from 'src/app/core/service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  searchText:string='';
  public p:any;

  operators: UserInfomation[] = [];
  agencies: UserInfomation[] = [];
  user:UserInfomation;
  users: UserInfomation[] =[];


  name:string='';
  surname:string='';
  gender:string='';
  birthday:string='';
  phone:string='';
  town:string='';
  country:string='';

  operator:number=0;
  agency:number=0;
  login:string='';
  id:number=0;
  email:string='';
  balance_min:number=0;
  balance_max:number=0;
  created_from:string='';
  created_to:string='';

  view_from:number = 1;
  view_count:number = 100;


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
        svc.agencies = res;
      }
    });    
  }

  get_user_permission()
  {
    let user = this.cachService.getUser();
    if(user==null) return null;
    return user.role;
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
      role:'user', 
      parent_id: 0,
      balance: 0,
      status: 0,
      is_terminal: 0,
    });      
  }

  public openModal(modalContent, user:UserInfomation) {
    if(user){
      // user.is_terminal = 0;
      this.user = user;
      this.form.setValue(user);
    } 
    else{
      this.user = new UserInfomation();
      this.user.id = 0;      
      this.user.role = 'user';
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
    this.adminService.update_user(this.cachService.getToken(), user).then(res=>{
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
    user.role = "user";
    this.adminService.add_user(this.cachService.getToken(), user).then(res=>{
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
        svc.adminService.remove_user(this.cachService.getToken(), user.id).then(res=>{
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

  get_agency_data(id)
  {    
    for(let i=0; i<this.agencies.length; i++)
    {
      if(this.agencies[i].id == id)
      {
        return this.agencies[i];
      }
    }
    return null;
  }

  get_agency(id)
  {
    let data = this.get_agency_data(id);
    if(data!=null)
    {
      return data.login;
    }
    return '';
  }

  get_operator(id)
  {
    let data = this.get_agency_data(id);
    if(data == null) return '';
    
    let parent = '';
    this.operators.forEach(op =>{
      if(op.id == data.parent_id)
      {
        parent = op.login;
      }
    })
    return parent;
  }

  on_search()
  {
    let filter = {
      name: this.name,
      surname: this.surname,
      gender: this.gender,
      birthday: this.birthday,
      phone: this.phone,
      town: this.town,
      country: this.country,   
      operator: this.operator,
      agency: this.agency,
      login: this.login,
      id: this.id,
      email: this.email,
      balance_min: this.balance_min,
      balance_max: this.balance_max,
      created_from: this.created_from,
      created_to: this.created_to,
      view_from: this.view_from,
      view_count: this.view_count
    };

    this.adminService.get_all_users(this.cachService.getToken(), filter).then(res =>{
      if(res)
        this.users = res;
        this.users.forEach(usr =>{
          if(usr.is_terminal==0)
            usr.is_terminal = 0;
        })
    });
  }

}
