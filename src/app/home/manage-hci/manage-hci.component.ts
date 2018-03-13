import { Component, OnInit } from '@angular/core';
import { RequestService , HciService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder,FormGroup }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { appConfig } from '../../app.config';
import {FormControl, Validators} from '@angular/forms';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
declare var jQuery:any;
@Component({
  selector: 'app-manage-hci',
  templateUrl: './manage-hci.component.html',
  styleUrls: ['./manage-hci.component.css']
})
export class ManageHciComponent implements OnInit {
  loading = false;
  isEmpty :boolean;
  constructor(
  	private router: Router,
  	private fb: FormBuilder,
    private hciService : HciService,
    private toasterService: ToasterService,) { }

  ngOnInit() {
  	this.listUser()
  }
  user = [];
  items = [];
  addUsers = [];
  listUser(){
    this.user_image = [];
  	this.loading = true;
  	this.hciService.getAll()
  	.subscribe(
  		data => {
        	this.loading = false;
        	this.user = data.result;
          this.tempAll  = data.result;
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  }
  user_image :any = {};
  fileChanged(e: FileList) {
    this.user_image = e;
    this.isEmpty = false;
    console.log(this.user_image);
  }
  imageRemoved(file: FileList) {
    this.user_image = '';    
    this.isEmpty = true;
  }   
  cv :any = [];
  fileCV(cv: FileList){
  	console.log(cv);
    this.cv = cv;
  }
  bio :any = [];
  filebio(bio: FileList){
  	console.log(bio);
    console.log('ss');
    this.bio = bio;
  }
  reset(){
  	this.bio = []; 
  	this.cv = [];
  	this.user_image = []; 
  	//jQuery("#myModalNorm").modal("hide");
    this.router.navigateByUrl('home/redirect/3');
  }
  contents(id){
  	//window.location.href = '/#/home/hci/contents/'+id;
  	this.router.navigate(['/home/hci/contents', id]);
  	//console.log('/home/hci/contents/'+id);
  }
  filterItem(value){
   if(!value) this.listUser(); //when nothing has typed
   this.user = Object.assign([], this.items).filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
   )
  }
  typeData = {};
  create(data){
  	this.loading = true;
  	if(data.role==1){
  		this.typeData =  "HCI";
  	}else if(data.role==2){
  		this.typeData =  'HCP';
  	}else if(data.role==3){
  		this.typeData =  'REP';
  	}
  	console.log(this.typeData);
  	let dataUser = {
  		role : data.role,
  		type : this.typeData,
  		firstName :data.firstName,
  		lastName :data.lastName,
  		email :data.email,
  		home_number : data.home_number,
  		telephone :data.telephone,
      userType :  data.role,
      password : 'password',
  	};
  	this.hciService.createUser(dataUser)
  	.subscribe(
  		data => {
  			let id = data.result.id;
        	this.loading = false;
        	 // upload cv into this user
        	this.uploadCV(id);
  		},
	  	error => {
        	this.loading = false;
	  		  let err = JSON.parse(error);
          if(err.result.invalidAttributes.email[0].rule=='unique'){
            this.toasterService.pop('error', 'Speaker', "Email ID Already Exists");
          }else{
            this.toasterService.pop('error', 'Speaker', "Check all the data and try again later");
          }        
	  	})
  }
  uploadCV(id){
  	this.loading = true;
  	if(this.cv.length==0){
  		this.uploadBIO(id);
  	}else{
	this.hciService.uploadCv(id,this.cv)
  	.subscribe(
  		data => {
        	this.loading = false;
        	 // upload cv into this user
        	this.uploadBIO(id);
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  	}
  }
  uploadBIO(id){
  	this.loading = true;
	if(this.bio.length==0){
  		this.uploadProfile(id);
  	}else{
	this.hciService.uploadBio(id,this.bio)
  	.subscribe(
  		data => {
        	this.loading = false;
        	 // upload cv into this user
        	this.uploadProfile(id);
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  	}
  }
  uploadProfile(id){
	this.loading = true;
	if(this.user_image==''){
		this.toasterService.pop('success', 'Speaker', "User Added Successfully");
    this.loading = false;
    jQuery("#myModalNorm").modal("hide");
    this.router.navigateByUrl('home/redirect/3');
    this.listUser();
  }else{
	this.hciService.profileImage(id,this.user_image)
  	.subscribe(
  		data => {
          this.toasterService.pop('success', 'Speaker', "User Added Successfully");
        	this.loading = false;
          jQuery("#myModalNorm").modal("hide");
          this.router.navigateByUrl('home/redirect/3');
          this.listUser();
        	 // upload cv into this user
        	//this.uploadBIO(id);
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  	}
  }
  dataUser:any = [];
  checkAll(ev) {
    this.user.forEach(x => x.id = ev.target.checked);
  }
  tempAll  = [];
  newDataFilter : any = [];
  filter(type){
    this.newDataFilter = [];
    let newData = this.tempAll;
    if(type == 0){
      this.listUser();
    }else{
      newData.forEach(items =>{ 
        if(items.active_status==type){
          let data = this.newDataFilter.push(items);        
        }
      })
      this.user = this.newDataFilter;
    }
  }
  getChecked(id){
    console.log(id);
    const intBrand: number = this.dataUser.indexOf(id); 
    if (intBrand  == -1) {
      this.dataUser.push(id);
    }else{
      this.dataUser.splice(intBrand, 1);
    }
  }
  isAllChecked() {
    return this.user.every(_ => _.id);
  }
}
