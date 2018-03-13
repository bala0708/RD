import { Component, OnInit } from '@angular/core';
import { TopicService,ClientService,SettingService,HciService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { appConfig } from '../../app.config';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-manage-topics',
  templateUrl: './manage-topics.component.html',
  styleUrls: ['./manage-topics.component.css']
})
export class ManageTopicsComponent implements OnInit {
  loading = false;
  is_add: boolean;
  is_view: boolean;
  isEmpty :boolean;   
  isEmpty1 :boolean; 
  constructor(
    private router: Router,
    private topicService : TopicService,
    private settingService: SettingService,
    private hciService: HciService,    
    private datePipe: DatePipe,
    private toasterService: ToasterService,
    private clientService : ClientService,
    private dragulaService: DragulaService,
  ) { 
    this.is_add = true;
    this.is_view = false;
    this.isEmpty = true;
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
  APIURL = {}
  ngOnInit() {
    this.listBrands();    
    this.listRolesData();
    this.APIURL = appConfig.apiUrl;
    this.listEligibility();
    this.convertStr();
  }
  assignedContent:any = [];
  addTopicsContents(data){
    this.loading = true;
    this.assignedContent = [];
    this.assignContent.forEach(item =>{
      this.assignedContent.push(item.id);
    });
    this.topicService.assignContents(this.assignedContent,this.initialActive)
    .subscribe(
        data => { 
          this.loading = false;
          this.toasterService.pop('success', 'Topics', 'Content Assigned Successfully');
        },
        error => {    
          this.loading = false; 
          console.log('error');
        });
  }
  removedocs(id){
    //this.loading = true;
    this.topicService.removeProduct(id)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            this.loading = false;
            // this.toasterService.pop('success', 'Product', response.result);
            // this.getTopic(this.initialActive);
          }
        },
        error => {    
          let myJSON = JSON.parse(error);
          console.log(myJSON);
          this.toasterService.pop('error', 'Product',myJSON.result);
        });
  }
  tempDocs = [];
  removeAtt(data,id){
    this.tempDocs.push(id);
    const intBrand: number = this.initialRecord.topic_statutory.indexOf(data); 
    this.initialRecord.topic_statutory.splice(intBrand,1);
  }
  assignedTopic:any = [];
  addTopicsContent(data){
    this.loading = true;
    this.assignedTopic = [];
    this.assignUser.forEach(item =>{
      this.assignedTopic.push(item.id);
    });
    this.topicService.assignHciTopic(this.assignedTopic,this.initialActive)
    .subscribe(
        data => { 
          this.loading = false;
          this.toasterService.pop('success', 'Topics', 'HCI Assigned Successfully');
        },
        error => {    
          this.loading = false; 
          console.log('error');
        });
  }
  addTopics(){
    this.is_add = false;
    this.is_view = true;
  }
  topics = [];
  viewTopics(){
    this.is_add = true;
    this.is_view = false;
    this.router.navigateByUrl('home/redirect/2'); 
  } 
  topic_image = {};
  fileChanged(e: FileList) {
    this.topic_image = e;
    this.isEmpty = false;
  }
  imageRemoved(file: FileList) {
    this.topic_image = '';    
    this.isEmpty = true;
  }   
  topic_image_update :any = [];
  fileChangedUpdate(e: FileList){
    this.topic_image_update = e;
    this.isEmpty1 = false;
  }
  imageRemovedUpdate(file: FileList) {
    this.topic_image_update = '';    
    this.isEmpty1 = true;
  }  
  getTopics = [];
  initialRecord : any = [];
  initialActive:any = {};
  initBrand :any = {};
  eligibility = [];
  selectedBrandData = [];
  loadTopics(){
    this.loading = true;
    this.topicService.listTopic()
    .subscribe(
        data => {           
          this.getTopics = data.result; 
          this.loading = false;
          if(this.getTopics.length != 0){
            this.initialRecord = data.result[0];
            this.eligibility = this.initialRecord.topic_eligibility;
            this.loadDependency();
            // this.assignHciTopic(this.initialActive);
            this.availableHci(this.initialActive);
            this.availableContents(this.initialActive);
            if(localStorage.topic_id=='' || localStorage.topic_id==undefined){
              this.initialActive = data.result[0].id;
              let topicID = this.initialActive;
              // this.assignContents(this.initialActive);
              localStorage.setItem('topic_id',topicID);
              this.initBrand = this.initialRecord.topic_brand;
              let brand = this.initialRecord.topic_brand;
              let product = this.initialRecord.topic_products; 
              brand.forEach(items => {
                this.selectedBrandData.push(items.brand);      
                this.getProductForTopic(items.brand);
              })
              product.forEach(data => {
                this.updatePro.push(data.product);
                this.selectedProductData.push(data.product);
              })
            }else{           
              this.getTopic(localStorage.topic_id);
            }
          }
        },
        error => {     
          console.log('error');
        });
  }
  clientsListView = [];
  clientsListViewPage = [];
  clientsListViewInit = [];
  activeID = {};
  API_URL = {};
  cart = [];
  dataList = [];
  selectedProductData = [];
  getTopic(id){
    localStorage.removeItem('topic_id');
    localStorage.setItem('topic_id',id);
    // window.scroll({
    //   top: 0, 
    //   left: 0, 
    //   behavior: 'smooth' 
    // });
    this.listRolesData();
    this.product_docsA = [];
    this.initialRecord = [];
    this.tempDocs = [];
    this.loading = true;
    this.selectedBrandData = [];
    this.updatePro= [];
    this.productList= [];
    this.selectedProductData= [];
    this.updateBrand= [];
    this.topicService.getOne(id)
    .subscribe(
        data => {           
          this.loading = false;
          this.initialActive = data.result[0].id;
          this.initialRecord = data.result[0];   
          this.eligibility = this.initialRecord.topic_eligibility; 
          this.loadDependency();
          // this.assignHciTopic(this.initialActive);
          this.availableHci(this.initialActive);
          this.availableContents(this.initialActive);
          // this.assignContents(this.initialActive);
          let brand = this.initialRecord.topic_brand;
          let product = this.initialRecord.topic_products; 
          brand.forEach(items => {
            this.selectedBrandData.push(items.brand);      
            this.getProductForTopic(items.brand);
          })
          product.forEach(data => {
            this.updatePro.push(data.product);
            this.selectedProductData.push(data.product);
          })
        },
        error => {    
          this.toasterService.pop('error', 'Serve Error', 'Try Again Later'); 
          console.log('error');
        });
  }
  checkingData(id){
    let data = this.eligibility;
     data.forEach(item => {
       if(item.eligibility === id){
         return true;
       }
      });
  }
  selectedData:any = [];
  loadDependency(){
    this.selectedData = [];
    this.elist = [];
    let data = this.eligibility;
    this.eligibility
    data.forEach(item => {
      this.selectedData.push(item.eligibility);
      this.elist.push(item.eligibility);
    });
  }
  dateZone = {};
  convertStr(){
    let date = this.datePipe.transform(new Date(), 'z');
    var str     = date;
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join('');
    this.dateZone = acronym; 
    console.log(this.dateZone);
  }
  listRolesData() {
    this.dataList = [];
    this.cart = [];
    this.loading = true;
    this.clientService.listClients()
        .subscribe(
            data => {
                this.clientsListView = data.result; 
                if(this.clientsListView.length != 0){
                this.activeID = data.result[0].id;  
                this.clientsListViewInit = data.result[0].brandProduct;  
                let pageSize = Math.ceil((data.result.length)/3);
                for (var i = 1; i<=pageSize;i++){
                  this.cart.push(i);
                  this.clientService.listClientsData(i)
                  .subscribe(
                      data => { 
                          this.clientsListViewPage = data.result;                          
                          this.dataList.push(this.clientsListViewPage);                          
                      },
                      error => {     
                        console.log('error');
                      });
                } 
                }         
            },
            error => {     
              console.log('error');
            });
  }
  brandCollection :any[] = [];
  productCollection :any[] = [];
  productSelection :any[] = [];
  chageBrand(id){      
    const indexBrand: number = this.brandCollection.indexOf(id); 
    if (indexBrand  == -1) {
      this.brandCollection.push(id);
    }else{
      this.brandCollection.splice(indexBrand, 1);
    }
    // find products of brands
    this.productCollection = [];
    for (var i = 0; i < this.brandCollection.length; i++) {
      var brand = this.brandCollection[i];
      this.getProducts(brand);
    }    
  }
  deleteTopicsData(id){
   this.loading = true;
   localStorage.removeItem('topic_id');
   this.topicService.deleteTopics(id)
    .subscribe(
        data => { 
          this.loading = false;
          this.toasterService.pop('success', 'Topics', 'Deleted Successfully');          
          this.loadTopics();
        },
        error => {     
          console.log('error');
          this.loading = false;
          this.toasterService.pop('error', 'Serve Error', 'Bad Request');
        });
  }
  chageProduct(data){    
    const indexPro: number = this.productSelection.indexOf(data); 
    if (indexPro  == -1) {
      this.productSelection.push(data);
    }else{
      this.productSelection.splice(indexPro, 1);
    }
  }
  product_docs:any = [];
  product_docsA:any = [];
  fileChangedDocs(docs: FileList){
    this.product_docsA = docs;
    this.product_docs = docs[0];
  }
  getProducts(id){
    this.topicService.getProduct(id)
    .subscribe(
        data => {         
          this.loading = false;  
          var resultReturn = data;
          if(resultReturn.apiStatus == true){
            this.loading = false;
            var product = resultReturn.result[0].brandProduct;
            const indexData: number = this.brandCollection.indexOf(product);            
            if (indexData  == -1) {
              this.productCollection.push(product);
            }else{
              this.productCollection.splice(indexData, 1);
            }
            
          } 
        },
        error => {     
          this.toasterService.pop('error', 'Serve Error', 'Bad Request');
          console.log('error');
        });
  }
  suspendTopicsData(id){
    this.loading = true;
    this.topicService.suspendTopicsData(id)
    .subscribe(
        data => {  
             this.toasterService.pop('success', 'Topics', 'Suspended Sucessfully');
             this.router.navigateByUrl('home/redirect/2'); 
             this.loading = false;
        },
        error => {     
          console.log('error');
        });
  }
  activeTopicsData(id){
    this.loading = true;
    this.topicService.activeTopicsData(id)
    .subscribe(
        data => {  
             this.toasterService.pop('success', 'Topics', 'Activated Sucessfully');
             this.router.navigateByUrl('home/redirect/2'); 
             this.loading = false;
        },
        error => {     
          console.log('error');
        });
  }
  getOneTopics(id){    
    this.topicService.getOne(id)
    .subscribe(
        data => {  
             console.log(data);    
        },
        error => {     
          console.log('error');
        });
  }
  addTopicsData(data){
    this.loading = true;
    this.topicService.create(data.value)
    .subscribe(
        data => {           
          if(data.apiStatus == true){
            var id = data.result.id;
            this.topicService.addImage(id,this.topic_image)
            .subscribe(
                data => {           
                  var resultReturn = data;
                  if(resultReturn.apiStatus == true){
                    this.loading = false;
                    this.toasterService.pop('success', 'Topics', 'Add Topics Successfully');
                    this.loadTopics();
                    this.viewTopics();
                  } 
                },
                error => {     
                   this.loading = false;
                  this.toasterService.pop('error', 'Serve Error', 'Bad Request');
                  console.log('error');
                });
          } 
        },
        error => { 
         this.loading = false;    
          this.toasterService.pop('error', 'Serve Error', 'Bad Request');
          console.log('error');
        });
  }
  editTopics(data){
     this.loading = true;
     this.tempDocs.forEach(items =>{
      this.removedocs(items);
     })
     var brand =  this.updateBrand;
     var product =   this.updatePro;
     var topic = {
       topicId :this.initialActive,
       brandId : this.updateBrand,
       productId :this.updatePro,
     }
     var topicData = {
       topic_title : data.topic_title,
       topic_discription :data.topic_discription,
       id :this.initialActive,
     }
     this.topicService.editTopicData(topicData)
     .subscribe(
      data => {           
          if(data.apiStatus==true){
            this.topicService.editTopicBrands(topic)
            .subscribe(
              data => {           
                if(data.apiStatus==true){
                      this.addTopicDocs(this.product_docs,this.initialActive);
                      if(this.topic_image_update.length==0){
                        //this.addTopicImage(this.initialActive,this.topic_image_update);
                      }else{
                        this.addTopicImage(this.initialActive,this.topic_image_update);
                      }
                }else{
                  this.loading = false;
                  this.toasterService.pop('error', 'Topics', data.result);
                }
              },
            error => {     
              this.router.navigateByUrl('home/redirect/2'); 
              this.loading = false;
              this.toasterService.pop('error', 'Serve Error', 'Bad Request');
              console.log('error');
            });
        }
      },
      error => {  
        this.loading = false;   
        this.toasterService.pop('error', 'Serve Error', 'Bad Request');
        console.log('error');
      });   
  }
  isEmptyObject(obj) {
    for(var prop in obj) {
       if (obj.hasOwnProperty(prop)) {
          return false;
       }
    }
    return true;
  }
  addTopicImage(id,image){
    this.topicService.addImage(id,image)
    .subscribe(
        data => {           
          var resultReturn = data;
          if(resultReturn.apiStatus == true){
            this.toasterService.pop('success', 'Topics', 'Profile Image Updated Successfully');
            this.loadTopics();
            this.viewTopics();
          } 
        },
        error => {     
           this.loading = false;
          this.toasterService.pop('error', 'Serve Error', 'Bad Request');
          console.log('error');
        });
  }
  addTopicDocs(data,topic){
    this.loading = true;
    if(data.length==0){
      this.toasterService.pop('success', 'Topics', 'Updated Successfully');
      this.router.navigateByUrl('home/redirect/2'); 
    }else{
    this.topicService.addTopicDoc(data,topic)
    .subscribe(
        data => { 
          this.toasterService.pop('success', 'Topics', 'Updated Successfully');
          this.router.navigateByUrl('home/redirect/2'); 
        },
        error => { 
          this.loading = false;  
          this.toasterService.pop('error', 'Serve Error', 'Bad request try again');  
        });    
  }
  }
  eligibilityListView = []; 
  listEligibility(){
    this.loading = true;
    this.settingService.getAll()
    .subscribe(
        data => { 
          this.eligibilityListView = data.result; 
          //this.loading = false;
        },
        error => {     
          console.log('error');
        });
  }
  elist :any = [];
  onChange(id){
      const indexEligi: number = this.elist.indexOf(id); 
      if (indexEligi  == -1) {
        this.elist.push(id);
      }else{
        this.elist.splice(indexEligi, 1);
      }
  }
  assignEligibilityTopic(data){
    this.loading = true;
    var dataEligibile = {
      eligibility: this.elist,
      topic:this.initialActive,
    }
    this.topicService.assignEligibility(dataEligibile)
    .subscribe(
        data => { 
          this.loading = false;
          this.toasterService.pop('success', 'Topics', 'Eligibility assigned for topics');
        },
        error => {     
          console.log('error');
        });
  }
  availableUser: Array<any> = [];
  assignUser: Array<any> = [];
  availableHci(data){
    this.loading = true;
    this.topicService.availableHci(data)
    .subscribe(
        data => { 
          this.loading = false;
          this.availableUser = data.availableUser;
          this.assignUser = data.assiginedUser;          
        },
        error => { 
          this.loading = false;    
          console.log('error');
        });
  }

  assignHciTopic(data){
    this.topicService.assignHci(data)
    .subscribe(
        data => { 
          this.loading = false;
          //this.assignUser = data.result;
        },
        error => {    
          this.loading = false; 
          console.log('error');
        });
  }     
  availableContent: Array<any> = [];
  assignContent: Array<any> = [];
  availableContents(data){
    this.loading = true;
    this.topicService.getContent(data)
    .subscribe(
        data => { 
          this.loading = false;
          this.availableContent = data.availableContent;
          this.assignContent = data.assiginedContent
        },
        error => { 
          this.loading = false;    
          console.log('error');
        });
  }

  assignContents(data){
    this.topicService.assignContent(data)
    .subscribe(
        data => { 
          this.loading = false;
          //this.assignContent = data.result;
        },
        error => {    
          this.loading = false; 
          console.log('error');
        });
  }     
  // __________________________________________________________
  // manage brand and sub brands
  brandList = [];
  selectedProduct = [];
  listBrands(){
    this.brandList = [];
    this.productList = [];    
    this.loading = true;
    this.hciService.listBrand()
    .subscribe(
      data => {
        // this.loading = false;
        this.brandList = data.result;   
        this.loadTopics();   
      },
      error => {
          this.loading = false;
        console.log(error);
      })
  }
  productList = [];
  updatePro = [];
  updateBrand = [];
  getProductForTopic(id){    
    const intBrand: number = this.updateBrand.indexOf(id); 
    if (intBrand  == -1) {
      this.updateBrand.push(id);
    }else{
      this.updateBrand.splice(intBrand, 1);
    }
    this.brandList.forEach(items =>{
      if(items.id==id){
        items.brandProduct.forEach(data => {
          const indexBrand: number = this.productList.indexOf(data); 
          if (indexBrand  == -1) {
            this.productList.push(data);
          }else{
            this.productList.splice(indexBrand, 1);
            this.updatePro.splice(this.updatePro.indexOf(data.id), 1);
            this.selectedProduct.splice(this.selectedProduct.indexOf(data.id), 1);
          }    
        })
      }
    })
  }
  proUps(id){
    const intPro: number = this.updatePro.indexOf(id); 
    if (intPro  == -1) {
      this.updatePro.push(id);
    }else{
      this.updatePro.splice(intPro, 1);
    }
  }
  meatingData = {};
  getMeetingData(id){
    this.initialRecord.topic_meeting.forEach(items =>{
      if(items.id==id){        
        this.meatingData=items;
      }
    })
    console.log(this.meatingData);
  }
}

