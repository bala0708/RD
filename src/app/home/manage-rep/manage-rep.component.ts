import { Component, OnInit } from '@angular/core';
import { RequestService , RepService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder,FormGroup }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { appConfig } from '../../app.config';
import {FormControl, Validators} from '@angular/forms';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
declare var jQuery:any;

@Component({
  selector: 'app-manage-rep',
  templateUrl: './manage-rep.component.html',
  styleUrls: ['./manage-rep.component.css']
})
export class ManageRepComponent implements OnInit {

  loading = false;
  isEmpty :boolean;
  constructor(
  	private router: Router,
  	private fb: FormBuilder,
    private repService : RepService,
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
  	this.repService.getAll()
  	.subscribe(
  		data => {
        	this.loading = false;
        	this.user = data.result;
          this.tempAll = data.result;
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
    this.bio = bio;
  }
  reset(){
  	this.bio = [];
  	this.cv = [];
  	this.user_image = []; 
  //	jQuery("#myModalNorm").modal("hide");
    this.router.navigateByUrl('home/redirect/5');
  }
  contents(id){
  	//window.location.href = '/#/home/hci/contents/'+id;
  	this.router.navigate(['/home/rep/contents', id]);
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
  	this.repService.createUser(dataUser)
  	.subscribe(
  		data => {
  			let id = data.result.id;
        	this.loading = false;
        	 // upload cv into this user
        	this.uploadCV(id);
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  }
  uploadCV(id){
  	this.loading = true;
  	if(this.cv.length==0){
  		this.uploadBIO(id);
  	}else{
	this.repService.uploadCv(id,this.cv)
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
	this.repService.uploadBio(id,this.bio)
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
		this.toasterService.pop('success', 'REP', "User Added Successfully");
    this.loading = false;
    jQuery("#myModalNorm").modal("hide");
    this.listUser();
    this.router.navigateByUrl('home/redirect/5');
  }else{
	this.repService.profileImage(id,this.user_image)
  	.subscribe(
  		data => {
          this.toasterService.pop('success', 'REP', "User Added Successfully");
        	this.loading = false;
          jQuery("#myModalNorm").modal("hide");
          this.listUser();
          this.router.navigateByUrl('home/redirect/5');
        	 // upload cv into this user
        	//this.uploadBIO(id);
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  	}
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
}
