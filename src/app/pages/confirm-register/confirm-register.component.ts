import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService, CacheService } from 'src/app/core/service';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.scss']
})
export class ConfirmRegisterComponent implements OnInit {

  failed : boolean = false;
  err_msg: string = '';
  constructor(private router:Router, 
    private authService: AuthService,
    private cacheService: CacheService
    ) { 

    }

  ngOnInit() {
    let svc = this;
    let activatedRoute = this.router.routerState.snapshot.root;    

    let hashId = activatedRoute.queryParams['id'];
    let uid = activatedRoute.queryParams['uid'];

    console.log(hashId);

    if(hashId !=null && hashId!="")
    {
      this.authService.confirm_register(hashId, uid).then(res =>{
        if(res == null)
        {
          svc.failed = true;
          svc.err_msg = svc.authService._message;
        }
        else
        {
          svc.cacheService.setToken(res.token, res.expire);
          let user = svc.cacheService.getUser();
          if(user!=null)
          {
            svc.router.navigate(['']);
          }
        }
      });
    }
    else
    {
      svc.failed = true;
      svc.err_msg = "Invalid link!";
    }

  }

}
