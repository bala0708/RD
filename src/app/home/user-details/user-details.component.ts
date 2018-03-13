import { Component, OnInit } from '@angular/core';
import { RequestService , RoleService } from '../../services/index';
import { OrderByPipe, SearchPipe } from '../../pipes/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  loading = false;
  constructor(private router: Router,
    private requestService: RequestService,
    private datePipe: DatePipe,
    private orderby: OrderByPipe,
    private roleService : RoleService,
    private toasterService: ToasterService) { }

    APIURL = {}
    ngOnInit() {
      this.APIURL = appConfig.apiUrl;
    }
  userDetails = [];
  viewDetailsUsers(id){
    this.loading = true;
    this.roleService.viewUser(id)
    .subscribe(
        data => { 
            this.userDetails = data.result[0];
            this.loading = false;
        },
        error => {     
          console.log('error');
        });
  }
}
