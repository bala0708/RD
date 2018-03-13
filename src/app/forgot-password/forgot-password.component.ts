import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from './../custom/index';
import { AuthenticationService } from '../services/index';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  model = [];
  form: FormGroup;
  constructor(
    fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,)
  {
    this.form = fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      //contactemail : [null, Validators.compose([Validators.required, Validators.email,  Validators.minLength(5), Validators.maxLength(30)])],
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    })
  }

  token = {};
  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
  }
  onSubmit() {
    console.log(this.form.value);
    this.authenticationService.reset(this.token,this.form.value.password)
    .subscribe(
        data => {
            this.toasterService.pop('success', 'Forgot Password', data.result);
            this.router.navigate(['login']);
        },
        error => {     
            let err = JSON.parse(error);
            this.router.navigate(['login']);
            this.toasterService.pop('error', 'Forgot Password', err.result);
        });
  }
}
