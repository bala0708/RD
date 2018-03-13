import { Component, OnInit } from '@angular/core';
import { RequestService , RoleService } from '../../services/index';
import { OrderByPipe, SearchPipe } from '../../pipes/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.css'],
  providers : [OrderByPipe],
})
export class ManageEventsComponent implements OnInit {
  loading = false;
  isHide:boolean;
  isShow:boolean;
  constructor(	
  	private router: Router,
    private requestService: RequestService,
    private datePipe: DatePipe,
    private orderby: OrderByPipe,
    private roleService : RoleService,
    private toasterService: ToasterService,) { }

  APIURL = {}
  ngOnInit() {
  	this.listRequest();
    this.convertStr();
    this.APIURL = appConfig.apiUrl;
  }
  listRequestData = [];
  requestInit = [];
  listRequest(){
    this.loading = true;
  	this.requestService.getAllEvents()
  	.subscribe(
  		data => {
        this.loading = false;
        this.listRequestData=data.result;
        this.tempAll = data.result;
        this.getOneRecord(data.result[0].id);
  		},
	  	error => {
        this.loading = false;
	  		console.log(error);
	  	})
  }
  activeRow = [];
  assigned = [];
  getOneRecord(id){
    this.loading = true;
    this.activeRow = id;
    this.assigned = [];
    // window.scroll({
    //       top: 0, 
    //       left: 0, 
    //       behavior: 'smooth' 
    // });
    this.requestService.getOneEvents(id)
    .subscribe(
      data => {
        this.requestInit = data.result[0];
        let topicAssigned = data.result[0].assiginedTopicContent;
        topicAssigned.forEach(items => {
          this.assigned.push(items.id);
        })        
        this.loading = false;
      },
      error => {
          this.loading = false;
          console.log(error);
      })
  }
  tempAll  = [];
  newDataFilter : any = [];
  filter(type){
    this.newDataFilter = [];
    let newData = this.tempAll;
    if(type == 0){
      this.listRequest();
    }else{
      newData.forEach(items =>{     
        if(items.typeOfMeeting==type){
          let data = this.newDataFilter.push(items);        
        }
      })
      this.listRequestData = this.newDataFilter;
      if(this.newDataFilter!=''){
        this.getOneRecord(this.newDataFilter[0].id);
      }else{
        this.requestInit = [];
      }
    }
    console.log(this.listRequestData);
  }
  cancelRequest(id){
    this.loading = true;
    this.requestService.cancel(id)
    .subscribe(
      data => {
        this.toasterService.pop('success', 'Request', "Meeting Request Cancelled");
        this.loading = false;
        this.listRequest();        
      },
      error => {
          this.loading = false;
          console.log(error);
      })
  }
  query(data){
    console.log(data);
    let topic;
    this.listRequestData.forEach(result =>{
      console.log(result);
      let move  = result.filter(it => it[topic] == data);
      console.log(move);
    })
  }
  suspendRequest(id){
    this.loading = true;
    this.requestService.suspendEvents(id)
    .subscribe(
      data => {
        this.toasterService.pop('success', 'Request', data.result);
        this.loading = false;
        this.listRequest();       
      },
      error => {
          this.loading = false;
          console.log(error);
      })
  }
  dateZone = {};
  dateForm = {};
  convertStr(){
    let date = this.datePipe.transform(new Date(), 'z');
    var str     = date;
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join('');
    this.dateZone = acronym; 
    if(this.dateZone=='EST'){
      this.dateForm = 1;
    }else if(this.dateZone=='CST'){
      this.dateForm = 1;
    }else if(this.dateZone=='MST'){
      this.dateForm = 1;
    }else if(this.dateZone=='PST'){
      this.dateForm = 1;
    }else{
      this.dateForm = 2;
    }
  }
  userDetails = [];
  viewDetailsUsers(id){
    this.loading = true;
    this.isHide = true;
    this.isShow = false;
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
}
