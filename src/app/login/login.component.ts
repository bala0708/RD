import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../services/index';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import {MatDialog, MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  animal: string;
  name: string;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private toasterService: ToasterService,
      public dialog: MatDialog,
      private alertService: AlertService) { 
        this.toasterService = toasterService;
      }
      public toasterconfig : ToasterConfig = 
      new ToasterConfig({
          showCloseButton: true, 
          tapToDismiss: false, 
          timeout: 0
      }); 
  ngOnInit() {
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home/dashboard';
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {
                  this.loading = false;
                  if(data.apiStatus==false){
                    this.toasterService.pop('error', 'Login', data.result);
                  }else{
                    this.router.navigate([this.returnUrl]);
                  }
              },
              error => {     
                  let err = JSON.parse(error);
                  this.loading = false;
                  this.toasterService.pop('error', 'Login', err.result);
              });
  }
  forgot(){
    this.authenticationService.forgot()
    .subscribe(
        data => {
            this.toasterService.pop('success', 'Forgot Password', data.result);
        },
        error => {     
            let err = JSON.parse(error);
            this.toasterService.pop('error', 'Forgot Password', err.result);
        });
  }
}
