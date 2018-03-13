import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { appConfig } from '../../app.config';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl,DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-manage-content',
  templateUrl: './manage-content.component.html',
  styleUrls: ['./manage-content.component.css']
})
@Pipe({ name: 'safe' })
export class ManageContentComponent implements OnInit {
  is_add: boolean;
  is_list: boolean;
  is_edit : boolean;
  isEmpty : boolean;
  loading = false;
  fileUrl: SafeResourceUrl;
  constructor(
    private router: Router,
    private contentService: ContentService,
    private dragulaService: DragulaService,
    private toasterService: ToasterService,
    private sanitizer: DomSanitizer) { 
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }
  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
  }

  private onRemoveModel(args) {
    let [el, source] = args;
    // do something else
  }
  APIURL = {};
  ngOnInit() {
    this.is_add = true;
    this.is_list = false;
    this.isEmpty = true;
    this.APIURL = appConfig.apiUrl;
    this.listData();
    this.disableEdit();
  }
  enableEdit(){
    this.is_edit = false;
  }
  disableEdit(){
    this.is_edit = true;
  }
  content_image:any = [];
  imageRemoved1(file: FileList) {
    this.content_image = '';
    this.isEmpty = true;
  }  
  fileChanged(e: FileList) {
    this.content_image = e;
    this.isEmpty = false;
  }
  content_image_update :any = [];
  imageRemoved2(file: FileList) {
    this.content_image_update = '';
  }  
  fileChanged2(e: FileList) {
    this.content_image_update = e;
  }
  topicListView = []; 
  topicListViewInit:any = [];
  topics = [];
  listData(){
    this.loading = true;
    this.contentService.getAll()
    .subscribe(
        data => { 
          this.topicListView = data.result; 
          this.topicListViewInit = data.result[0];   
          this.loading = false;
          this.topicView(this.topicListViewInit.id,1);
          this.availableHci(this.topicListViewInit.id);
          this.availableHcp(this.topicListViewInit.id);
        },
        error => {     
          console.log('error');
          this.loading = false;
        });
  }
  availableUser: Array<any> = [];
  assignUser: Array<any> = [];
  availableHci(id){
    this.loading = true;
    this.contentService.hciAvaiable(id)
    .subscribe(
        data => { 
          this.loading = false;
          this.availableUser = data.availableUser;
          this.assignUser = data.assiginedUser;    
        },
        error => {     
          console.log('error');
          this.loading = false;
        });
  }
  availableUserHcp: Array<any> = [];
  assignUserHcp: Array<any> = [];
  availableHcp(id){
    this.loading = true;
    this.contentService.hcpAvaiable(id)
    .subscribe(
        data => { 
          this.loading = false;
          this.availableUserHcp = data.availableUser;
          this.assignUserHcp = data.assiginedUser;    
        },
        error => {     
          console.log('error');
          this.loading = false;
        });
  } 
  assignedUser:any = [];
  assignHciUser(data){
    this.loading = true;
    this.assignedUser = [];
    this.assignUser.forEach(item =>{
      this.assignedUser.push(item.id);
    });
    this.contentService.assignHci(this.topicListViewInit.id,this.assignedUser)
    .subscribe(
        data => { 
          this.loading = false;
          this.toasterService.pop('success', 'Content', 'HCI Assigned Successfully');
        },
        error => {    
          this.loading = false; 
          console.log('error');
        });
  } 
  assignedUserHcp : any = [];
  assignHcpUser(data){
    this.loading = true;
    this.assignedUserHcp = [];
    this.assignUserHcp.forEach(item =>{
      this.assignedUserHcp.push(item.id);
    });
    this.contentService.assignHci(this.topicListViewInit.id,this.assignedUserHcp)
    .subscribe(
        data => { 
          this.loading = false;
          this.toasterService.pop('success', 'Content', 'HCI Assigned Successfully');
        },
        error => {    
          this.loading = false; 
          console.log('error');
        });
  } 
 
  fileExtensions: any= {};
  topicView(id,type){
    this.disableEdit();
    this.loading = true;
    // window.scroll({
    //       top: 0, 
    //       left: 0, 
    //       behavior: 'smooth' 
    // });
    if(type == 1){
      if(localStorage.contentId=='' || localStorage.contentId==undefined){
        localStorage.setItem('contentId',id); 
        var data = id;        
      }else{         
        data =  localStorage.contentId;          
        //this.loadProduct(localStorage.clientInit,2);        
      }  
    }else{
      localStorage.setItem('contentId',id); 
      data =  id;       
    }        
    this.contentService.getOne(data)
    .subscribe(
        data => { 
          this.topicListViewInit = data.result;
          this.loading = false;
          let x = data.result.file_name;
          if(x){
            let xy =  x.split(".");
            this.fileExtensions = xy[1];
          }
          if(this.fileExtensions=='pdf'){
            var z = '../../../assets/ViewerJS/#';
          }
          else{
                    var z = 'https://docs.google.com/viewerng/viewer?embedded=true&url=';    
          }
         
          let Y = z+this.APIURL+data.result.content_path+x;
          this.fileUrl = this.transform(Y);
          this.availableHci(this.topicListViewInit.id);
          this.availableHcp(this.topicListViewInit.id);   
         
        },
        error => {     
          console.log('error'); 
          this.loading = false;
        });
  }
  enableSection(){
    this.is_add = false;
    this.is_list = true;
  }
  suspendContent(id){
    this.loading = true;
    this.contentService.inactive(id)
    .subscribe(
        data => {  
          this.topicView(id,2);
          this.disableSection();
          this.toasterService.pop('success', 'Content', "Suspended Successfully Content");
          this.loading = false;
        },
        error => {     
          console.log('error');
          this.loading = false;
        }); 
  }
  activeContent(id){
    this.loading = true;
    this.contentService.active(id)
    .subscribe(
        data => { 
          this.topicView(id,2);
          this.disableSection();
          this.toasterService.pop('success', 'Content', "Activated Successfully Content");
          this.loading = false;
        },
        error => {     
          console.log('error');
          this.loading = false;
        }); 
  }
  disableSection(){
    this.is_add = true;
    this.is_list = false;
    this.topics = [];
    this.router.navigateByUrl('home/redirect/6'); 
  }
  content_file :any= {};
  fileChangeEvent(event) {
    this.content_file = event.srcElement.files;

  }   
  content_file_update :any= {};
  fileChangeEventUpdate(event){
    this.content_file_update = event.srcElement.files;
    console.log(this.content_file_update);
  }
  addTopics(data){   
   this.loading = true;
    this.contentService.create(data.value)
    .subscribe(
        data => { 
        var id = data.result.id;
        if(this.content_image.length == 0){

        }else{
          this.addimage(id,this.content_image);
        }
        if(this.content_file.length>0){
          this.addFile(id,this.content_file[0]);      
        }else{
          this.loading = false;
          this.listData();
          this.disableSection();
          this.toasterService.pop('success', 'Content', "Added Successfully Content");
        }
        },
        error => {     
          //console.log(error);
          let err = JSON.parse(error);
          this.toasterService.pop('error', 'Server Error', err.result);
          this.loading = false;
        }); 
  }
  addimage(id,image){
    this.loading = true;
    this.contentService.addImage(id,image)
    .subscribe(
        data => {   
          this.listData();
          this.disableSection();
          this.content_image = [];
          this.loading = false;
          this.toasterService.pop('success', 'Content', "Added Successfully Content Image");
        },
        error => {     
          console.log('error');
          this.toasterService.pop('success', 'Server', "Error");
          this.loading = false;
        }); 
  }
  addFile(id,file){
  this.loading = true;
    this.contentService.addfile(id,file)
    .subscribe(
        data => {   
          if(this.content_image_update.length == 0){

          }else{
            this.addimage(id,this.content_image_update);
          }
          this.listData();
          this.disableSection();
          this.content_file = {};
          this.loading = false;
          this.toasterService.pop('success', 'Content', "Added Successfully Content With Content File");
        },
        error => {     
          console.log('error');
          this.toasterService.pop('success', 'Server', "Error");
          this.loading = false;
        }); 
  }
  addImage(id,file){
    this.contentService.addImage(id,file)
    .subscribe(
        data => {   
          this.listData();
          this.disableSection();
          this.loading = false;
          this.toasterService.pop('success', 'Content', "Added Successfully Content With Content File");
        },
        error => {     
          console.log('error');
          this.toasterService.pop('success', 'Server', "Error");
          this.loading = false;
        }); 
  }
  editTopic(data){
    this.loading = true;    
    let topicData = {
      content_name:data.value.content_name,
      id:this.topicListViewInit.id
    }
    this.contentService.update(topicData)
    .subscribe(
        data => { 
        var id = data.result[0].id;        
        if(this.content_file_update.length>0){
          this.addFile(id,this.content_file_update[0]);      
        }else{
          this.loading = false;
          if(this.content_image_update.length == 0){

          }else{
            this.addimage(id,this.content_image_update);
          }
          this.disableSection();
          this.disableEdit();
          this.toasterService.pop('success', 'Content', "Updated Successfully Content");
        }
        //this.topicView(topicData.id,2);
        },
        error => {     
          let err = JSON.parse(error);
          this.toasterService.pop('error', 'Server Error', err.result);
          this.loading = false;
        });
  }
  isAllChecked() {
    return this.topicListView.every(_ => _.state);
  }
  checkAll(ev) {
    this.topicListView.forEach(x => x.id = ev.target.checked)
  }
  deleteTopic(id){
    this.loading = true;
    this.contentService.delete(id)
    .subscribe(
        data => { 
          this.topicListViewInit = data.result[0];   
          this.listData();
          this.disableSection();
          this.loading = false;
        },
        error => {     
          console.log('error');
          this.loading = false;
        }); 
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}