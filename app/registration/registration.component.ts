import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public registerForm:FormGroup;
  public loginForm:FormGroup;
  public msg:String="";
  public msg_login:String="";

  constructor(private fb:FormBuilder , private crud:CrudService , private route:Router) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      firstname:['', [Validators.required , Validators.minLength(2) , Validators.maxLength(12)]],
      lastname:['', [Validators.required , Validators.minLength(2) , Validators.maxLength(12)]],
      email:['', [Validators.required , Validators.email]],
      password:['', [Validators.required , Validators.minLength(4) , Validators.maxLength(12)]],
      mobile:['', [Validators.required , Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      dob:['' , Validators.required],
      city:['', [Validators.required , Validators.minLength(2) , Validators.maxLength(12)]],
      state:['', [Validators.required , Validators.minLength(2) , Validators.maxLength(20)]],
      pincode:['', [Validators.required , Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]]
    })


    this.loginForm = this.fb.group({
      email:['', [Validators.required , Validators.email]],
      password:['', [Validators.required , Validators.minLength(4) , Validators.maxLength(12)]]
    })
  }


    registerData(regForm){
      // console.log(regForm);
      // console.log(regForm.value);

      regForm.value.status = 1;
      console.log(regForm.value);

      this.crud.insertData("users" , regForm.value).subscribe(
        (res)=>{
          console.log(res);
          this.msg = "User Added";
        },(error)=>{
          console.log(error);
        }
      )
    }


    loginData(loginForm){
      // console.log(loginForm.value);
      let txt_email = loginForm.value.email;
      let txt_pass = loginForm.value.password;

      console.log(txt_email,txt_pass);

      this.crud.selectData("users").subscribe(
        (response)=>{
          console.log(response);
          let count=0;
          let userArr = [];
          for(var ans in response){
            // console.log(ans);
            // console.log(response[ans]);
            let email_from_json = response[ans]['email'];
            let pass_from_json = response[ans]['password'];
            // console.log(email_from_json);
            // console.log(pass_from_json);

            if(txt_email == email_from_json && txt_pass == pass_from_json){
              count++;
              userArr['firstname'] = response[ans]['firstname'];
              userArr['lastname'] = response[ans]['lastname'];
              userArr['email'] = response[ans]['email'];
              userArr['mobile'] = response[ans]['mobile'];
              userArr['dob'] = response[ans]['dob'];
              userArr['city'] = response[ans]['city'];
              userArr['state'] = response[ans]['state'];
              userArr['pincode'] = response[ans]['pincode'];
              userArr['status'] = response[ans]['status'];
              break;
            }
          }

          if(count>0){
            this.msg_login = "Authentication Done";
            // console.log(userArr);
            localStorage.setItem("firstname" , userArr['firstname']);
            localStorage.setItem("lastname" , userArr['lastname']);
            localStorage.setItem("email" , userArr['email']);
            localStorage.setItem("mobile" , userArr['mobile']);
            localStorage.setItem("dob" , userArr['dob']);
            localStorage.setItem("city" , userArr['city']);
            localStorage.setItem("state" , userArr['state']);
            localStorage.setItem("pincode" , userArr['pincode']);
            localStorage.setItem("status" , userArr['status']);

            this.route.navigate(['/home']);

          }
          else{
            this.msg_login = "Invalid EmailId or Password";
          }

        }
      )
    }
}
