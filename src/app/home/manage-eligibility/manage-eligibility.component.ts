import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
@Component({
  selector: 'app-manage-eligibility',
  templateUrl: './manage-eligibility.component.html',
  styleUrls: ['./manage-eligibility.component.css']
})
export class ManageEligibilityComponent implements OnInit {
  is_add: boolean;
  is_list: boolean;
  loading = false;
  constructor(
  	private router: Router,
    private settingService: SettingService,
    private toasterService: ToasterService,) { }

  ngOnInit() {
  	this.is_add = true;
    this.is_list = false;
    this.listData();
  }
  topicListView = []; 
  topicListViewInit:any = [];
  topics = [];
  listData(){
    this.loading = true;
  	this.settingService.getAll()
    .subscribe(
        data => { 
          this.topicListView = data.result; 
          this.topicListViewInit = data.result[0];   
          this.loading = false;
          console.log(data);
        },
        error => {     
          console.log('error');
        });
  }
  topicView(id){
    this.loading = true;
    this.settingService.getOne(id)
    .subscribe(
        data => { 
          this.topicListViewInit = data.result[0];   
          this.loading = false;
        },
        error => {     
          console.log('error');
        });
  }
  enableSection(){
    this.is_add = false;
    this.is_list = true;
  }
  disableSection(){
    this.is_add = true;
    this.is_list = false;
    this.topics = [];
  }
  addTopics(data){
   this.loading = true;
    this.settingService.create(data.value)
    .subscribe(
        data => { 
          this.topicListViewInit = data.result[0];   
          this.listData();
          this.disableSection();
        },
        error => {     
          console.log('error');
        }); 
  }
  editTopic(data){
    this.loading = true;    
    let topicData = {
      eligibility_title:data.value.eligibility_title,
      id:this.topicListViewInit.id
    }
    this.settingService.update(topicData)
    .subscribe(
        data => { 
          this.topicListViewInit = data.result[0];   
          this.toasterService.pop('success', 'Eligibility', data.result);
          this.loading = false;
          this.topicView(topicData.id);
        },
        error => {     
          console.log('error');
        });
  }
  deleteTopic(id){
    this.loading = true;
    this.settingService.delete(id)
    .subscribe(
        data => { 
          this.topicListViewInit = data.result[0];   
          this.listData();
          this.disableSection();
        },
        error => {     
          console.log('error');
        }); 
  }
}
