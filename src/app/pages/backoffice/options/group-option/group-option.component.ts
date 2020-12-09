import { Component, OnInit } from '@angular/core';
import {Option, Group_Option, Group} from '../../../../core/model'
import { DataService, AdminService, CacheService } from 'src/app/core/service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-group-option',
  templateUrl: './group-option.component.html',
  styleUrls: ['./group-option.component.scss']
})
export class GroupOptionComponent implements OnInit {

  searchGroup:number=0;
  public p:any;
  group_option: Group_Option;
  group_options: Group_Option[] =[];

  public modalRef: NgbModalRef;
  public form:FormGroup;

  options: Option[]=[];
  groups: Group[] =[];

  constructor(public adminService: AdminService,
    public fb:FormBuilder, 
    public cacheService: CacheService,    
    public toastrService: ToastrService,
    public confirmationDialogService:  ConfirmationDialogService,
    public modalService: NgbModal) 
  {
    let svc = this;
    this.adminService.get_group_options(this.cacheService.getToken()).then(res=>{
      if(res!=null)
      {
        svc.group_options = res.group_options;
        svc.options = res.options;
        svc.groups = res.groups;
      }
    });
  }
  ngOnInit() {
    this.form = this.fb.group({
      id: null,
      group_id: [null, Validators.compose([Validators.required])],
      option_id: [null, Validators.compose([Validators.required])]
    });      
  }

  public openModal(modalContent, group_option:Group_Option) {
    if(group_option){
      this.group_option = group_option;
      this.form.setValue(group_option);
    } 
    else{
      this.group_option = new Group_Option();
      this.group_option.id = 0;      
      this.group_option.group_id = this.groups[0].id;
      this.group_option.option_id = this.options[0].id;
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

  public get_value(group_option:Group_Option)
  {
    let group = '';
    this.groups.forEach(grp =>{
      if(grp.id == group_option.group_id)
        group = grp.name;
    })

    let option = '';
    this.options.forEach(opt =>{
      if(opt.id == group_option.option_id)
        option = opt.name;
    })
    return {group: group, option: option};
  }

  public closeModal(){
    this.modalRef.close();
  }


  public onSubmit(group_option:Group_Option):void {
    if (this.form.valid) {
      if(group_option.id){
        this.updateData(group_option);
      }
      else{
        this.addData(group_option);
      }      
      this.modalRef.close();    
    }
  } 

  updateData(group_option:Group_Option)
  {
    let svc = this;
    this.adminService.update_group_option(this.cacheService.getToken(), group_option).then(res=>{
      if(res)
      {
        svc.group_options.forEach(opt =>{
          if(opt.id == group_option.id)
          {
            opt.option_id = group_option.option_id;
          }
        })        
        this.toastrService.success('Success', 'Updated option');
      }
      else
      {
        svc.toastrService.error('Failed!', svc.adminService._message);        
      }
    })
  }

  addData(group_option:Group_Option)
  {
    let svc = this;
    this.adminService.add_group_option(this.cacheService.getToken(), group_option).then(res=>{
      if(res > 0)
      {
        group_option.id = res;
        svc.group_options.push(group_option);
        this.toastrService.success('Success', 'Added new entry');
      }
      else
      {
        svc.toastrService.error('Failed!', svc.adminService._message);
      }
    })
  }

  deleteData(group_option:Group_Option)
  {
    // this.toastrService.success('Hello world!', 'Toastr fun!');
    let svc = this;
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this entry ?')
    .then((confirmed) => {
      if(confirmed)
      {
        svc.adminService.remove_group_option(this.cacheService.getToken(), group_option.id).then(res=>{
          if(res)
          {
            for(let i=0; i<svc.group_options.length; i++)
            {
              if(svc.group_options[i].id == group_option.id)
              {
                svc.group_options.splice(i, 1);
                break;
              }
            }
            this.toastrService.success('Success', 'Removed entry');
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

  get_filtered_group_options()
  {
    if(this.searchGroup==0)    
      return this.group_options;

    let grp_opts = [];
    this.group_options.forEach(ent =>{
      if(ent.group_id == this.searchGroup)
      {
        grp_opts.push(ent);
      }
    });
    return grp_opts;
  }

}
