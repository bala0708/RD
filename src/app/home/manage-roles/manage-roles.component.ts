import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
declare var jQuery:any;
@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  roleUser: any = {};
  contents = {};
  featuresControl = [];
  allControl: number[] =[];
  addControl: number[] =[];
  editControl: number[] =[];
  viewControl: number[] =[];
  deleteControl: number[] =[];
  log: any;
  loading = false;
  is_edit: boolean;
  is_hide: boolean;
  isHide:boolean;
  isShow:boolean;
  constructor(
    private router: Router,
    private roleService: RoleService,
    private toasterService: ToasterService,
    
  ) { 
    this.is_edit = true;
    this.is_hide = false;
    this.isHide = true;
    this.isShow = false;
  }
  roleListView = []; 
  roleListViewInit : any = [];
  features = [];
  RoleUserView = [];
  errors = [];
  types = [
    {value: '0', viewValue: 'Admin'},
    {value: '1', viewValue: 'User'},
  ];
  roles = [
    {value: '0', viewValue: 'All'},
    {value: '1', viewValue: 'Mobile'},
    {value: '2', viewValue: 'Web'},
  ];
  
  ngOnInit() {
    this.listRolesData(); 
    this.log = document.querySelector('#log')
    let typesData = this.types;
    let rolesData = this.roles;
  }
  reset(){
    this.roleUser.reset();
  }
  enable(){
    this.is_edit = false;
    this.is_hide = true;
  }
  disable(){
    this.is_edit = true;
    this.is_hide = false;
  }
  roleActiveId = [];
  listRolesData() {
    this.loading = true;
    this.roleService.listRole()
        .subscribe(
            data => {
                this.roleListView = data.result;   
                this.roleListViewInit = data.result[0];
                if(this.roleListView.length !=0){
                  this.roleActiveId = this.roleListViewInit.id;
                  this.getProfileSetting(this.roleActiveId);
                  this.features = data.result[0].roleAccess;   
                  this.RoleUserView = data.result[0].roleUser;
                }
                this.loading = false;
            },
            error => {     
              console.log('error');
            });
  }
  MyJson = {};
  selectedFeature = [];
  featureUpdate(){
    this.loading = true;
      this.selectedFeature = [];
      for(let data of this.features){
        let dataValue = [];
        
        if(data.add_control==true || data.add_control == 1){
          var add_control = 1;
        }else{
          var add_control = 0;
        }
        if(data.all_control==true || data.all_control == 1){
          var all_control = 1;
        }else{
          var all_control = 0;
        }
        if(data.delete_control==true || data.delete_control == 1){
          var delete_control = 1;
        }else{
          var delete_control = 0;
        }
        if(data.edit_control==true || data.edit_control == 1){
          var edit_control = 1;
        }else{
          var edit_control = 0;
        }
        if(data.view_control==true || data.view_control == 1){
          var view_control = 1;
        }else{
          var view_control = 0;
        }
        this.MyJson = {
          add_control : add_control,
          all_control : all_control,
          delete_control : delete_control,
          edit_control : edit_control,
          view_control : view_control,
          id : data.id,
          role : data.role
        }
        this.selectedFeature.push(this.MyJson);        
      }
      this.roleService.updateFeature(this.selectedFeature)
      .subscribe(
          data => { 
              this.loading = false;
              this.toasterService.pop('success', 'Roles', data.result);
              this.listRolesData();
          },
          error => {     
            console.log('error');
            this.loading = false;
          });
  }
  checkAll(ev) {
    this.features.forEach(x => x.all_control = ev.target.checked)
  }
  userDetails = [];
  viewDetailsUsers(id){
    this.loading = true;
    this.roleService.viewUser(id)
    .subscribe(
        data => { 
            this.userDetails = data.result[0];
            this.loading = false;
            this.isHide = false;
            this.isShow = true;
        },
        error => {     
          console.log('error');
        });
  }
  roleView(value){
    this.loading = true;
    this.errors=[];
    this.roleService.viewRole(value)
    .subscribe(
        data => { 
            this.roleListViewInit = data.result[0];
            this.roleActiveId = this.roleListViewInit.id;
            this.getProfileSetting(this.roleActiveId);
            this.features = data.result[0].roleAccess;   
            this.RoleUserView = data.result[0].roleUser;
            this.loading = false;
            this.is_edit = true;  
            this.is_hide = false;
        },
        error => {     
          console.log('error');
        });
  }

  addRole() {
    this.loading = true;
    let userData = this.roleUser;
    this.loading = true;
    this.roleService.addRoleData(userData)
        .subscribe(
            data => {
                this.loading = false;
                if(data.apiStatus==false){
                  this.toasterService.pop('error', 'Role', data.error);
                }else if(data.apiStatus==true){
                  //location.reload();
                  this.loading = false;
                  jQuery("#myModal").modal("hide");
                  this.listRolesData();
                  this.roleUser = [] ;                  
                  this.toasterService.pop('success', 'Roles', data.result);
                }
            },
            error => {     
                let err = JSON.parse(error);
                //this.alertService.error(err.error);
                this.errors = err.result.invalidAttributes.role_name[0].result;
                this.loading = false;
                this.toasterService.pop('error', 'Roles', "Enter the valid param values");
            });
}  
editRoles(){
  this.loading = true;
  this.roleService.editRoleData(this.roleListViewInit)
      .subscribe(
          data => {
              this.loading = false;
              if(data.apiStatus==false){
                this.toasterService.pop('error', 'Role', data.error);
              }else if(data.apiStatus==true){
                this.listRolesData();
                this.disable();
                this.toasterService.pop('success', 'Roles', data.result);
              }
          },
          error => {     
              let err = JSON.parse(error);
              //this.alertService.error(err.error);
              this.errors = err.result.invalidAttributes.role_name[0].message;
              this.loading = false;
              this.toasterService.pop('error', 'Roles', 'Enter the valid param values');
          });
}
deleteRole(value){
  this.loading = true;
  this.roleService.deleteRoleData(value)
  .subscribe(
      data => {
          this.loading = false;
          if(data.apiStatus==false){
            this.toasterService.pop('error', 'Role', data.result);
          }else if(data.apiStatus==true){
            this.listRolesData();
            this.toasterService.pop('success', 'Roles', data.result);
          }
      },
      error => {     
          let err = JSON.parse(error);
          console.log(err);
          this.loading = false;
          this.toasterService.pop('error', 'Roles', err.result);
      });
}
suspendRole(value){
  this.loading = true;
  this.roleService.suspendRoleData(value)
  .subscribe(
      data => {
          this.loading = false;
          if(data.apiStatus==false){
            this.toasterService.pop('error', 'Role', data.error);
          }else if(data.apiStatus==true){
            this.listRolesData();
            this.toasterService.pop('success', 'Roles', data.result);
          }
      },
      error => {     
          let err = JSON.parse(error);
          //this.alertService.error(err.error);
          this.loading = false;
          this.toasterService.pop('error', 'Roles', err.error);
      });
}
activeRole(value){
  this.loading = true;
  this.roleService.activeRoleData(value)
  .subscribe(
      data => {
          this.loading = false;
          if(data.apiStatus==false){
            this.toasterService.pop('error', 'Role', data.error);
          }else if(data.apiStatus==true){
            this.listRolesData();
            this.toasterService.pop('success', 'Roles', data.result);
          }
      },
      error => {     
          let err = JSON.parse(error);
          //this.alertService.error(err.error);
          this.loading = false;
          this.toasterService.pop('error', 'Roles', err.error);
      });
}
selectedValue = [];
change(e, type){
  console.log(e.checked);
  console.log(type);
  if(e.checked){
    this.selectedValue.push(type);
  }
  else{
   let updateItem = this.selectedValue.find(this.findIndexToUpdate, type.maintenancetype);

   let index = this.selectedValue.indexOf(updateItem);

   this.selectedValue.splice(index, 1);
  }

}
findIndexToUpdate(type) { 
  return type.maintenancetype === this;
}
removeUsers(id){
  this.loading = true;
  this.roleService.deleteUserData(id)
  .subscribe(
      data => {
        this.loading = false;
          if(data.apiStatus==false){
            this.toasterService.pop('error', 'Roles', data.error);
          }else if(data.apiStatus==true){
            this.listRolesData();
            this.toasterService.pop('success', 'Roles', data.result);
          }
      },
      error => {     
          let err = JSON.parse(error);
          //this.alertService.error(err.error);
          this.loading = false;
          this.toasterService.pop('error', 'Roles', err.error);
      });
}
profileSetting : any = [];
getProfileSetting(id){
 this.loading = true;
 this.roleService.getProfileFeature(id)
  .subscribe(
      data => {
        this.loading = false; 
        this.profileSetting = data.result; 
        console.log(data);
      },
      error => {     
          let err = JSON.parse(error);
          this.loading = false;
          this.toasterService.pop('error', 'Roles', err.error);
      }); 
}
selectedProfileFeature = [];
dataJson :any = [];
profileUpdate(){
  this.loading = true;
  this.selectedProfileFeature = [];
  this.profileSetting.forEach(item => {
      if(item.edit==true || item.edit == 1){
        var edit = 1;
      }else{
        var edit = 0;
      }
      if(item.delete==true || item.delete == 1){
        var deletes = 1;
      }else{
        var deletes = 0;
      }
      if(item.view==true || item.view == 1){
        var view = 1;
      }else{
        var view = 0;
      }
        this.dataJson = {
          id : item.id,
          edit : edit,
          view : view,
          delete : deletes,
          role : item.role.id
        }
        this.selectedProfileFeature.push(this.dataJson);  
  })
  this.roleService.updateProfile(this.selectedProfileFeature)
      .subscribe(
          data => { 
              this.loading = false;
              this.toasterService.pop('success', 'Roles', "Profile Control Updated Successfully");
          },
          error => {     
            console.log('error');
            this.toasterService.pop('success', 'Server', "Bad Request");
            this.loading = false;
          });
}
}
