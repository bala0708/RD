import { Component, OnInit } from '@angular/core';
import { RequestService , PollsService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder,FormGroup }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { appConfig } from '../../app.config';
import {FormControl, Validators} from '@angular/forms';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { DOCUMENT } from "@angular/platform-browser";
import {MatFormFieldControl,MatTooltip} from '@angular/material';
@Component({
  selector: 'app-manage-polls',
  templateUrl: './manage-polls.component.html',
  styleUrls: ['./manage-polls.component.css']
})
export class ManagePollsComponent implements OnInit {
  loading = false;
  showSelected : boolean;
  ques_list : any;
  constructor(
    private router: Router,
  	private fb: FormBuilder,
    private pollsService : PollsService,
    private dragulaService: DragulaService,
    private toasterService: ToasterService,
  ) {
    dragulaService.dropModel.subscribe((value) => {
      console.log(value); 
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      console.log(value);
      this.onRemoveModel(value.slice(1));
    });
    this.showSelected = false; 
   }
   private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
   }
    private onRemoveModel(args) {
      let [el, source] = args;
      // do something else
    }
  ShowButton(){
    this.showSelected = true;
  }
  HideButton(){
      this.showSelected = false;
  }
  // ----------------------------------------------------------------------------
  availableTopics = [];	
  assignedTopics = [];
  listTopics(id){
  	this.loading = true;
  	this.pollsService.listOfPollsTopics(id)
  	.subscribe(
  		data => {          
          this.loading = false;
          this.availableTopics = data.availableTopic;
          this.assignedTopics = data.assiginedTopic;

          console.log(data);
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  }
  assignedTopicID :any = [];
  assignUserTopics(){
  	this.loading = true;
  	console.log(this.assignedTopics);
  	this.assignedTopics.forEach(items =>{
  		this.assignedTopicID.push(items.id);
  	})
  	this.pollsService.assignPollsTopics(this.assignedTopicID,this.pollsDetails.id)
  	.subscribe(
  		data => {          
          this.loading = false;
          this.toasterService.pop('success', 'HCI', "Topic assigned to user");
  		},
	  	error => {
        let err = JSON.parse(error);
        this.toasterService.pop('error', 'Polls', err.result);
        this.loading = false;
	  	})
  }

  assignedQuestionsID :any = [];
  assignAllQuestion(){
  	this.loading = true;
  	this.assignedQuestions.forEach(items =>{
  		this.assignedQuestionsID.push(items.id);
    })
    this.assignedQuestionsID["mandatory"] = "1";
    this.assignedQuestionsID["mandatory"] = "1";
let json = {
  "question" : 4,
  "poll" : 15,
  "mandatory" : 1,
  "sortOrder" :1
}
  	this.pollsService.assignPollsQuestions(json,this.pollsDetails.id)
  	.subscribe(
  		data => {          
          this.loading = false;
          this.toasterService.pop('success', 'HCI', "Topic assigned to user");
  		},
	  	error => {
        let err = JSON.parse(error);
        this.toasterService.pop('error', 'Polls', err.result);
        this.loading = false;
	  	})
  }

  APIURL : any = {};
  ngOnInit() {
    this.listPolls();
    this.APIURL = appConfig.apiUrl;
  }
  polls : any = [];
  addPoll : any = [];
  listPolls(){
    this.loading = true;
    this.pollsCollection = [];
  	this.pollsService.getAll()
  	.subscribe(
  		data => {
        	this.loading = false;
          this.polls = data.result;
          console.log(this.polls.assignedTopics);
          if(data.result.length!=0){
            this.getOnePoll(data.result[0].id);
          }
  		},
	  	error => {
        let err = JSON.parse(error);
        this.toasterService.pop('error', 'Polls', err.result);
        this.loading = false;
	  	})
  }
  questionsCount:number;
  questions = [];
  assignedQuestions = [];
  openCount : number;
  closeCount : number;
  ratingCount : number;
  likertCount : number;
  multipleCount :number; 
  questionDetails(){
    this.pollsService.getQuestions()
    .subscribe(
      data => {
        this.questions = data.result;
      }
    )
  }
  assignedQuestionDetails(id){
    this.pollsService.getAssignedQuestions(id)
    .subscribe(
      data => {
        this.questionsCount = data.result.length;
        for(let i = 0; i< this.questionsCount; i++){
          this.assignedQuestions.push(
            {
              id:data.result[i].question.id,
              question:data.result[i].question.question
            }
          )
        }
        // this.assignedQuestions = data.result;
        for(let i=0; i < data.result.length; i++){
          data.result[i].question.questionType === 1 ? this.closeCount += 1 : this.closeCount = this.closeCount;
          data.result[i].question.questionType === 2 ? this.ratingCount += 1 : this.ratingCount= this.ratingCount;     
          data.result[i].question.questionType === 3 ? this.likertCount += 1 : this.likertCount = this.likertCount;
          data.result[i].question.questionType === 4 ? this.multipleCount += 1 : this.multipleCount = this.multipleCount      ;
          data.result[i].question.questionType === 5 ? this.openCount += 1 : this.openCount = this.openCount;          
        }
        // window.console.log(this.closeCount+ "   :close count");
        // window.console.log(this.ratingCount+ "   :rating count");
        // window.console.log(this.likertCount+ "   :likert count");
        // window.console.log(this.multipleCount+ "   :multiple count");
        // window.console.log(this.openCount+ "   :open count");
      }
    )
  }
  pollsDetails :any = [];
  getOnePoll(id){
    this.loading = true;
  	this.pollsService.getOne(id)
  	.subscribe(
  		data => {
        	this.loading = false;
          this.pollsDetails = data.result;
          this.listTopics(id);
          this.questionDetails();
          this.openCount = 0;
          this.closeCount = 0;
          this.ratingCount = 0;
          this.likertCount = 0;
          this.multipleCount = 0; 
          this.assignedQuestionsID  = [];
          this.assignedQuestions = [];
          this.assignedQuestionDetails(id);
  		},
	  	error => {
        let err = JSON.parse(error);
        this.toasterService.pop('error', 'Polls', err.result);
        this.loading = false;
	  	})
  }
  reset(){
    this.router.navigateByUrl('home/redirect/8'); 
  }
  pollsCollection:any = [];
  checkPolls(id){
    const indexBrand: number = this.pollsCollection.indexOf(id); 
    if (indexBrand  == -1) {
      this.pollsCollection.push(id);
    }else{
      this.pollsCollection.splice(indexBrand, 1);
    }
  }
  suspendOne(id){
    this.loading = true;
    this.pollsService.suspendAll(id)
    .subscribe(
      data => {
          this.loading = false;
          this.toasterService.pop('success', 'Polls', "Suspended Successfully");
          this.listPolls();
      },
      error => {
        let err = JSON.parse(error);
        this.toasterService.pop('error', 'Polls', err.result);
        this.loading = false;
      })
  }
  ActiveOne(id){
    this.loading = true;
    this.pollsService.activeAll(id)
    .subscribe(
      data => {
          this.loading = false;
          this.toasterService.pop('success', 'Polls', "Activated Successfully");
          this.listPolls();
      },
      error => {
        let err = JSON.parse(error);
        this.toasterService.pop('error', 'Polls', err.result);
        this.loading = false;
      })
  }
  deleteOne(id){
    this.loading = true;
    this.pollsDetails = [];
    this.pollsService.deleteAll(id)
    .subscribe(
      data => {
          this.loading = false;
          this.toasterService.pop('success', 'Polls', "Deleted Successfully");
          this.listPolls();
      },
      error => {
        let err = JSON.parse(error);
        this.toasterService.pop('error', 'Polls', err.result);
        this.loading = false;
      })
  }
  suspendAll(){
    if(this.pollsCollection.length == 0){
      this.toasterService.pop('error', 'Polls', "Select atleast one polls");
    }else{
      this.loading = true;
      this.pollsService.suspendAll(this.pollsCollection)
      .subscribe(
        data => {
            this.loading = false;
            this.toasterService.pop('success', 'Polls', "Suspended Successfully");
            this.listPolls();
        },
        error => {
          let err = JSON.parse(error);
          this.toasterService.pop('error', 'Polls', err.result);
          this.loading = false;
        })
    }
  }
  deleteAll(){
    if(this.pollsCollection.length == 0){
      this.toasterService.pop('error', 'Polls', "Select atleast one polls");
    }else{
      this.pollsDetails = [];
      this.loading = true;
      this.pollsService.deleteAll(this.pollsCollection)
      .subscribe(
        data => {
            this.loading = false;
            this.toasterService.pop('success', 'Polls', "Deleted Successfully");
            this.listPolls();
        },
        error => {
          let err = JSON.parse(error);
          this.toasterService.pop('error', 'Polls', err.result);
          this.loading = false;
        })
    }
  }
  poll_image :any = [];
  poll_image_update:any = [];
  fileChanged(e: FileList) {
    this.poll_image = e;
  }
  imageRemoved(file: FileList) {
    this.poll_image = '';    
  }  
  fileChanged1(e: FileList) {
    this.poll_image_update = e;
  }
  imageRemoved1(file: FileList) {
    this.poll_image_update = '';    
  } 
  error :any = [];
  createPoll(data){   
    if(this.poll_image.length == 0){
      this.error="Polls Image is required";
    }else{
      this.loading = true;
      this.pollsService.create(data)
      .subscribe(
        data => {
            this.loading = false;
            this.addImage(this.poll_image,data.result.id);
        },
        error => {
          let err = JSON.parse(error);
          this.toasterService.pop('error', 'Polls', err.result);
          this.loading = false;
        })
    }
  }
  addImage(file,id){    
    this.loading = true;
  	this.pollsService.addPollImage(file,id)
  	.subscribe(
  		data => {
        	this.loading = false;
          this.polls = data.result;
          this.toasterService.pop('success', 'Polls', 'Added Successfully');
          this.router.navigateByUrl('home/redirect/8'); 
          // this.tempAll  = data.result;
  		},
	  	error => {
        let err = JSON.parse(error);
        this.toasterService.pop('error', 'Polls', err.result);
        this.loading = false;
	  	})
  }
}
