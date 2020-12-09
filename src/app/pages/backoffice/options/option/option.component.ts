import { Component, OnInit } from '@angular/core';
import {Option} from '../../../../core/model'
import { DataService, AdminService, CacheService } from 'src/app/core/service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  searchText:string='';
  public p:any;
  option: Option;
  options: Option[] =[];
  public modalRef: NgbModalRef;
  public form:FormGroup;

  constructor(public adminService: AdminService,
    public fb:FormBuilder, 
    public cacheService: CacheService,    
    public toastrService: ToastrService,
    public confirmationDialogService:  ConfirmationDialogService,
    public modalService: NgbModal) 
  {
    let svc = this;
    this.adminService.get_options(this.cacheService.getToken()).then(res=>{
      if(res!=null)
      {
        svc.options = res;
      }
    });
  }
  ngOnInit() {
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.compose([Validators.required])],
      key: [null, Validators.compose([Validators.required])],
      relation: 'goal'
    });      
  }

  public openModal(modalContent, option:Option) {
    if(option){
      this.option = option;
      this.form.setValue(option);
    } 
    else{
      this.option = new Option();
      this.option.id = 0;      
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


  public onSubmit(option:Option):void {
    if (this.form.valid) {
      if(option.id){
        this.updateData(option);
      }
      else{
        this.addData(option);
      }      
      this.modalRef.close();    
    }
  } 

  updateData(option:Option)
  {
    let svc = this;
    this.adminService.update_option(this.cacheService.getToken(), option).then(res=>{
      if(res)
      {
        svc.options.forEach(opt =>{
          if(opt.id == option.id)
          {
            opt.name = option.name;
            opt.key = option.key;
            opt.relation = option.relation;
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

  addData(option:Option)
  {
    let svc = this;
    this.adminService.add_option(this.cacheService.getToken(), option).then(res=>{
      if(res > 0)
      {
        option.id = res;
        svc.options.push(option);
        this.toastrService.success('Success', 'Added new option');
      }
      else
      {
        svc.toastrService.error('Failed!', svc.adminService._message);
      }
    })
  }

  deleteData(option:Option)
  {
    // this.toastrService.success('Hello world!', 'Toastr fun!');
    let svc = this;
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this option ?')
    .then((confirmed) => {
      if(confirmed)
      {
        svc.adminService.remove_option(this.cacheService.getToken(), option.id).then(res=>{
          if(res)
          {
            for(let i=0; i<svc.options.length; i++)
            {
              if(svc.options[i].id == option.id)
              {
                svc.options.splice(i, 1);
                break;
              }
            }
            this.toastrService.success('Success', 'Removed option');
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
