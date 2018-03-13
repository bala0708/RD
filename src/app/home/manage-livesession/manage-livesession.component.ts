import { Component, OnInit } from '@angular/core';
import { RequestService , SessionService, RoleService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder,FormGroup }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { appConfig } from '../../app.config';
import {VideoRecepientComponent} from "../../video-recepient/video-recepient.component";

@Component({
  selector: 'app-manage-livesession',
  templateUrl: './manage-livesession.component.html',
  styleUrls: ['./manage-livesession.component.css'],
  providers: [VideoRecepientComponent],
})
export class ManageLivesessionComponent implements OnInit {
  loading = false;
  constructor(
  	private router: Router,
    private fb: FormBuilder,
    private VideoRecepientComponent: VideoRecepientComponent,
    private sessionService : SessionService,
    private roleService : RoleService,    
    private toasterService: ToasterService,) { }

  APIURL = {}
  ngOnInit() {
  	this.listSession();
    this.APIURL = appConfig.apiUrl;
    this.enableSection = false;
  }
  listLiveSession = [];
  listSession(){
  	this.loading = true;
  	this.sessionService.getAll()
  	.subscribe(
  		data => {
        	this.loading = false;
        	this.listLiveSession = data.result;
          if(data.result!=''){
        	  this.getOneRecord(data.result[0].id);
          }else{
            this.listLiveSession = [];
          }
  		},
	  	error => {
        	this.loading = false;
        	this.toasterService.pop('error', 'Server Issue', "Try again later");
	  	})
  }
  activeRow = [];
  assigned = [];
  requestInit :any = [];
  getOneRecord(id){
    this.loading = true;   
    this.activeRow = id;
    this.assigned = [];
    this.enableSection = false;
    this.sessionService.getOne(id)
    .subscribe(
      data => {
        this.requestInit = data.result[0];
        this.loading = false;
        console.log(data);
        this.liveStream(this.requestInit.token,this.requestInit.sessionId);
      },
      error => {
          this.loading = false;
          this.toasterService.pop('error', 'Server Issue', "Try again later");
      })
  }
  enableSection : boolean;
  liveStream(token,session){
    this.enableSection = false;
    this.VideoRecepientComponent.loadData(session,token);
    setTimeout(()=>{ this.enableSection = true }, 2000)
   // this.enableSection = false;
  }
  suspendMeeting(id){
    this.loading = true;
    this.sessionService.suspend(id)
    .subscribe(
      data => {
        this.toasterService.pop('success', 'Live Session', data.result);
        this.loading = false;
      },
      error => {
          this.loading = false;
          this.toasterService.pop('error', 'Server Issue', "Try again later");
      })
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
          this.loading = false;
          this.toasterService.pop('error', 'Server Issue', "Try again later");
        });
  }
  humanReadable:any = [];
  getTimeDifference(data){
  	var date = new Date(data);
	var timeStart:any  = date;
	var timeEnd:any  = new Date(); 
	var hourDiff =  timeStart-timeEnd; //in ms
	if(timeStart<timeEnd){
		return '-';
	}	
	var secDiff = hourDiff / 1000; //in s
	var minDiff = hourDiff / 60 / 1000; //in minutes
	var hDiff = hourDiff / 3600 / 1000; //in hours
	this.humanReadable.hours = Math.floor(hDiff);
	this.humanReadable.minutes = minDiff - 60 * this.humanReadable.hours;
	var output = 'Starting in '+Math.round(this.humanReadable.hours)+' hrs '+Math.round(this.humanReadable.minutes)+' mins';
	return output;

  }
}
