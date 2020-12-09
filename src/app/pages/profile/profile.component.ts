import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from 'src/app/core/model';
import { AuthService, BetService, CacheService, DatetimeService, PrintService, TransactionService } from 'src/app/core/service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public modalRef: NgbModalRef; 
  userInfo: UserInfo;
  link:any='';  
  image:any;

  deposite_amount:number = 0;
  windowReference:any;

  old_password:string='';
  new_password:string='';
  new_password_confirm:string='';


  //get bet options
  void:boolean = false;
  lost:boolean = false;
  won:boolean = false;
  inprogress:boolean = false;
  from:string;
  to:string;
  bets:any[]=[];
  selected_bet: any;
  selected_bet_results :any;
  public p:any;

  constructor(
    public fb: FormBuilder, 
    public modalService: NgbModal,  
    
    public authService: AuthService,
    public toastrService: ToastrService,    
    private cacheService:CacheService,
    public printService: PrintService,
    public betService: BetService,
    public transactionService: TransactionService,
    public router:Router,
    public datetimeService:DatetimeService

  ) { 
    this.userInfo = this.cacheService.getUser();
    console.log(this.userInfo);

    if(this.userInfo==null)
    {
      this.router.navigate(['/']);
    }

    let week = this.cacheService.getWeekInfo();
    this.from = week.from;
    this.to = week.to;
  }

  ngOnInit() {
  }

  on_get_bet_list()
  {
    let filter = {
      from: this.from,
      to:this.to,
      void:this.void,
      lost:this.lost,
      won: this.won,
      inprogress:this.inprogress
    };    
    this.betService.get_bet_list(this.cacheService.getToken(), filter).then(res=>{
      this.bets = res;
    });
  }

  on_view_bet(bet, betResultModalContent)
  {
    this.selected_bet = bet;
    this.selected_bet_results = JSON.parse(bet.results);

    let options: any = {
      size: "dialog-centered",
    };
    this.modalRef = this.modalService.open(betResultModalContent, options);    
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  on_view_ticket(ticketModalContent)
  {
    this.modalRef.close();

    let options: any = {
      size: "dialog-centered",
    };
    this.modalRef = this.modalService.open(ticketModalContent, options);
    this.modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  on_print_ticket()
  {
    let contents =document.getElementById('ticket-content').outerHTML;
    this.modalRef.close();

    let iframe = document.createElement("iframe");
    document.body.appendChild(iframe);

    iframe.contentDocument.write('<html><head><title>' + document.title + '</title>');
    iframe.contentDocument.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></head>');

    iframe.contentDocument.write('</head><style>');
    iframe.contentDocument.write(this.stylesheet_html());
    iframe.contentDocument.write('</style><body>');
    iframe.contentDocument.write(contents);
    iframe.contentDocument.write('</body></html>');
    iframe.contentDocument.close();
    iframe.contentWindow.onload = function() {
      iframe.style.display = "none";      
      iframe.contentWindow.print();
      setTimeout(function() { document.body.removeChild(iframe) }, 1000);
    }
  }

  stylesheet_html() {
    let css = [];
    for (let sheeti = 0; sheeti < document.styleSheets.length; sheeti++) {
        let sheet = <CSSStyleSheet>document.styleSheets[sheeti];
        try {
          var rules = sheet.cssRules ? sheet.cssRules : sheet.rules;          
            for (let rulei = 0; rulei < rules.length; rulei++) {
                let rule = rules[rulei];
                css.push(rule.cssText);
            }
        } catch (ex) { }
    }
    return css.join('\n');
  }


  on_start_deposite()
  {
    if(this.deposite_amount<=0) return;
    this.transactionService.start_deposite(this.cacheService.getToken(), this.deposite_amount).then(res=>
      {
        if(res==null)
        {
          this.toastrService.error(this.transactionService._message, 'Error');          
        }
        else
        {
          this.windowReference = window.open(res.authorization_url, '_blank', 'toolbar=0, width=800, height=400');
          this.windowReference.close = function(){
            console.log("unloading checkout window!!!");
          }
          
        }
      });    
  }

  on_change_password()
  {
    this.authService.change_password(this.cacheService.getToken(), this.old_password, this.new_password).then(res=>
      {
        if(res)
        {
          this.toastrService.success("New password was settled", "Change Password");
        }
        else
        {
          this.toastrService.error(this.authService._message, "Change Password");
        }
      })
  }

  fileChange(input){
    const reader = new FileReader();
    if (input.files.length) {
        const file = input.files[0];
        reader.onload = () => {
            this.image = reader.result;
            this.link = this.image;
        }
        reader.readAsDataURL(file);
    }
  }

  on_save_profile_img()
  {
    this.authService.change_profile_img (this.cacheService.getToken(), this.image).then(res=>{
      if(res!=null)
      {
        this.image=null;
        this.link = '';
        this.cacheService.setToken(res.token, res.expire);
        this.userInfo = this.cacheService.getUser();
      }
      else
      {
        this.toastrService.error(this.authService._message, "Change Profile Image");
      }
    })
  }


}
