import { Component, OnInit } from '@angular/core';
import {Group} from '../../../../core/model'
import { DataService, AdminService, CacheService } from 'src/app/core/service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  searchText:string='';
  public p:any;
  group: Group;
  groups: Group[] =[];
  public modalRef: NgbModalRef;
  public form:FormGroup;

  constructor(public adminService: AdminService,
    public cacheService: CacheService,
    public fb:FormBuilder, 
    public toastrService: ToastrService,
    public confirmationDialogService:  ConfirmationDialogService,
    public modalService: NgbModal) 
  {
    let svc = this;
    this.adminService.get_groups(this.cacheService.getToken()).then(res=>{
      if(res!=null)
      {
        svc.groups = res;
      }
    });
  }
  ngOnInit() {
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.compose([Validators.required])],
      descr: ''
    });      
  }

  public openModal(modalContent, group:Group) {

    if(group!=null){
      this.group = group;
      this.form.setValue(group);
    } 
    else{
      this.group = new Group();
      this.group.id = 0;      
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


  public onSubmit(group:Group):void {
    if (this.form.valid) {
      if(group.id){
        this.updateData(group);
      }
      else{
        this.addData(group);
      }      
      this.modalRef.close();    
    }
  } 

  updateData(group:Group)
  {
    let svc = this;
    this.adminService.update_group(this.cacheService.getToken(), group).then(res=>{
      if(res)
      {
        svc.groups.forEach(opt =>{
          if(opt.id == group.id)
          {
            opt.name = group.name;
            opt.descr = group.descr;
          }
        })        
        this.toastrService.success('Success', 'Updated group');
      }
      else
      {
        svc.toastrService.error('Failed!', svc.adminService._message);        
      }
    })
  }

  addData(group:Group)
  {
    let svc = this;
    this.adminService.add_group(this.cacheService.getToken(), group).then(res=>{
      if(res > 0)
      {
        group.id = res;
        svc.groups.push(group);
        this.toastrService.success('Success', 'Added new group');
      }
      else
      {
        svc.toastrService.error('Failed!', svc.adminService._message);
      }
    })
  }

  deleteData(group:Group)
  {
    // this.toastrService.success('Hello world!', 'Toastr fun!');
    let svc = this;
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this group ?')
    .then((confirmed) => {
      if(confirmed)
      {
        svc.adminService.remove_group(this.cacheService.getToken(), group.id).then(res=>{
          if(res)
          {
            for(let i=0; i<svc.groups.length; i++)
            {
              if(svc.groups[i].id == group.id)
              {
                svc.groups.splice(i, 1);
                break;
              }
            }
            this.toastrService.success('Success', 'Removed group');
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

}
