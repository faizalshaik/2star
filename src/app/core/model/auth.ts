export class ApiResponse{
    status:number;
    message:string;
    data:any;
}

export class UserInfo{
    id:number;
    login:string ='';
    name:string = '';
    surname:string = '';
    created_at:string='';
    email:string='';
    password:string='';    
    gender:string='';

    phone:string='';
    address:string='';
  
    localtime:number;
    role:string="user";
    balance:number =0;
    profile_img:string ='';    
}


export class AuthResult{
    token:string;
    expire:number;

    static userInfo(token:string):UserInfo
    {
        var data = token.split(".");
        if(data.length!=2) 
            return null;
        let jsonData = atob(data[0]);
        return JSON.parse(jsonData) as UserInfo;
    }
}

