import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from 'ng2-validation';
import { AppSettings } from '../app.settings';
import { Settings } from '../app.settings.model';
import { GlobalVar } from '../core/GlobalVar';
import { UserInfo } from '../core/model';
import { AuthService, CacheService } from '../core/service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagesComponent implements OnInit {

  public modalRef: NgbModalRef;

  // register
  public form_register:FormGroup;
  public name_register:AbstractControl;
  public email_register:AbstractControl;
  public password_register:AbstractControl;
  public confirmPassword_register:AbstractControl;  
  public register_error: boolean = false;
  public register_error_message: string = '';

  public form_login:FormGroup;
  public email_login:AbstractControl;
  public password_login:AbstractControl;
  public login_error: boolean = false;
  public login_error_message: string = '';  

  


    public showMenu:boolean = false;
    public showSetting:boolean = false;
    public menus = ['vertical', 'horizontal'];
    public menuOption:string;
    public menuTypes = ['default', 'compact', 'mini'];
    public menuTypeOption:string;    
    public settings: Settings;
    
    constructor(
        public modalService: NgbModal,        
        public fb: FormBuilder,
        private cacheService:CacheService,
        private authService:AuthService,
        public appSettings:AppSettings, 
        public router:Router){        
        this.settings = this.appSettings.settings; 
        if(sessionStorage["skin"]) {
            this.settings.theme.skin = sessionStorage["skin"];
        }     

  // init register form
  this.form_register = fb.group({
    name_register: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    email_register: ['', Validators.compose([Validators.required, emailValidator])],
    password_register: ['', Validators.required],
    confirmPassword_register: ['', Validators.required]
},{validator: matchingPasswords('password_register', 'confirmPassword_register')});

this.name_register = this.form_register.controls['name_register'];
this.email_register = this.form_register.controls['email_register'];
this.password_register = this.form_register.controls['password_register'];
this.confirmPassword_register = this.form_register.controls['confirmPassword_register'];

// init login form
this.form_login = fb.group({
'email_login': ['', Validators.compose([Validators.required])],
'password_login': ['', Validators.compose([Validators.required])]
});
this.email_login = this.form_login.controls['email_login'];
this.password_login = this.form_login.controls['password_login'];
        
    }

    ngOnInit() {        
        if(window.innerWidth <= 768){
            this.settings.theme.showMenu = false;
            this.settings.theme.sideChatIsHoverable = false;
        }
        this.showMenu = this.settings.theme.showMenu;
        this.menuOption = this.settings.theme.menu;
        this.menuTypeOption = this.settings.theme.menuType;           
    }

    public chooseMenu(menu){
        this.settings.theme.menu = menu; 
        this.router.navigate(['/']);      
    }

    public chooseMenuType(menuType){
        this.settings.theme.menuType = menuType;
        jQuery('.menu-item-link').tooltip({
            sanitize: false,
            sanitizeFn: function (content) {
                return null;
            }
        });
        if(menuType=='mini'){
            jQuery('.menu-item-link').tooltip('enable');
        }else{
            jQuery('.menu-item-link').tooltip('disable');
        }
    }

    public changeTheme(theme){
        this.settings.theme.skin = theme;
        sessionStorage["skin"] = theme;        
    }
 
    ngAfterViewInit(){
        document.getElementById('preloader').classList.add('hide');
    }

    on_logout()
    {
        this.cacheService.clearToken();        
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        window.location.reload();
        //this.router.navigate(['/']);        
    }

    on_enter_login()
    {
      if(this.form_login.value.email_login != "" && this.form_login.value.password_login != "")
        this.on_login(this.form_login.value);
    }

    on_login(values)
    {
      this.login_error = false;
      this.authService.login(values.email_login, values.password_login).then((res)=>{
        if(res!=null)
        {
            this.cacheService.setToken(res.token, res.expire);
            let user = this.cacheService.getUser();
            if(user!=null)
            {
              GlobalVar.balance = user.balance;
              GlobalVar.balanceUpdateTime = new Date();

              this.modalRef.close();
              this.router.routeReuseStrategy.shouldReuseRoute = function () {
                return false;
              };    
              window.location.reload();
              // this.router.navigate(['/']);
            }
        }
        else
        {
          this.login_error = true;
          this.login_error_message = this.authService._message;
        }
      });        
    }
    on_register(values)
    {
      this.register_error = false;
  
      let user = new UserInfo();
      user.name = values.name_register;
      user.email = values.email_register;
      user.password = values.password_register;
  
      // register_error_message
      this.authService.register(user).then(res=>
        {
            if(res)
            {
              this.register_error = false;
              this.register_error_message = res;
            }                
            else{
              this.register_error = true;
              this.register_error_message = this.authService._message;
            }
        });    
    }  

    on_open_login(modalContent)
    {
      if(this.modalRef)
        this.modalRef.close();
      this.login_error = false;
  
      let options: any = {
        size: "dialog-centered",
        // container: '.app'
      };
      this.modalRef = this.modalService.open(modalContent, options);    
      this.modalRef.result.then((result) => {
        this.form_register.reset();
      }, (reason) => {
        this.form_register.reset();
      });
    }
    on_open_register(modalContent)
    {
      if(this.modalRef)
        this.modalRef.close();
  
      this.register_error = false;
      let options: any = {
        size: "dialog-centered",
        // container: '.app'
      };
      this.modalRef = this.modalService.open(modalContent, options);    
      this.modalRef.result.then((result) => {
        this.form_register.reset();
      }, (reason) => {
        this.form_register.reset();
      });
    }


    @HostListener('window:resize')
    public onWindowResize():void {
        let showMenu= !this._showMenu();

        if (this.showMenu !== showMenu) {
            this.showMenuStateChange(showMenu);
        }
        this.showMenu = showMenu;
    }

    public showMenuStateChange(showMenu:boolean):void {
        this.settings.theme.showMenu = showMenu;
    }

    private _showMenu():boolean {
        return window.innerWidth <= 768;
    }
}


export function emailValidator(control: FormControl): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
  }
  
  export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password= group.controls[passwordKey];
        let passwordConfirmation= group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true})
        }
    }
  }