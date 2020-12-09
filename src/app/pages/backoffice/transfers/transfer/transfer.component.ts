import { Component, OnInit } from '@angular/core';
import { AdminService, AdminBetService, CacheService, AdminUserService, DatetimeService, AdminTransactionService } from 'src/app/core/service';
import { UserInfomation, Option } from 'src/app/core/model';
import { ConfirmationDialogService } from 'src/app/pages/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalVar } from 'src/app/core/GlobalVar';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  public p:any;


  move_type :string= 'Deposit';
  amount:number = 0;

  operators: UserInfomation[] = [];
  agencies: UserInfomation[] = [];  
  users:UserInfomation[] = [];  
  username: string = '';
  operator: number = 0;
  agency: number = 0;
  selected_user:any;



  constructor(
    public adminTransactionService: AdminTransactionService,
    public datetimeService: DatetimeService,
    public cachService: CacheService,    
    public toastrService: ToastrService,
    public confirmationDialogService:  ConfirmationDialogService,    
    public adminUserService: AdminUserService) 
  {
    this.get_operators();
  }

  get_operators()
  {
    this.adminUserService.get_operators(this.cachService.getToken()).then(res=>{
      if(res!=null)
      {
        this.operators = res;
        this.users = res;
      }
    });
  }

  on_change_operator()
  {
    if(this.operator == 0)
    {
      this.agency = 0;
      this.agencies = [];
      this.get_operators();
    }
    else
    {
      this.adminUserService.get_agencis(this.cachService.getToken(), this.operator).then(res=>{
        if(res!=null)
        {
          this.agencies = res;
          this.users = res;
        }
      });
    }
  }

  on_change_agency()
  {
    if(this.agency == 0)
    {
      this.on_change_operator();
    }
    else
    {
      this.adminUserService.get_users(this.cachService.getToken(), this.agency).then(res=>{
        if(res!=null)
        {
          this.users = res;
        }
      });      
    }
  }  


  ngOnInit() {
  }

  get_user_permission()
  {
    let user = this.cachService.getUser();
    if(user==null) return null;
    return user.role;
  }  

  on_move()
  {
    if(this.selected_user==null)
    {
      this.toastrService.info("Please select user to transfer!", "Transfer");
      return;
    }

    if(this.amount<=0)
    {
      this.toastrService.info("Please input amount to transfer!", "Transfer");
      return;
    }

    //check amount
    let title = '';
    if(this.move_type == "Deposit")
    {
      if(GlobalVar.balance < this.amount)
      {
        this.toastrService.info("Insufficient balance!", "Transfer");
        return;
      }
      title = "Deposit to '" + this.selected_user.login + "'";
    }
    else
    {
      if(this.selected_user.balance < this.amount)
      {
        this.toastrService.info("Insufficient user's balance!", "Transfer");
        return;
      }
      title = "Withdraw from '" + this.selected_user.login + "'";
    }

    this.confirmationDialogService.confirm(title, 
      "Are you sure transfer ₦ " + this.amount +" ?").then(confirm =>
        {
          if(confirm)
          {
            this.adminTransactionService.transfer(this.cachService.getToken(), this.amount, this.selected_user.id, this.move_type).then(res=>{
              if(res)
              {
                GlobalVar.balance = res.me_balance;
                GlobalVar.balanceUpdateTime = new Date();
                this.selected_user.balance = res.user_balance;
                this.toastrService.success("Transfer success", "Transfer!");
              }
              else
              {
                this.toastrService.error(this.adminTransactionService._message, "Transfer!");
                return;
              }
            })
          }
        });
  } 

}
