import { Component, OnInit ,AfterViewInit,ElementRef  } from '@angular/core';
import { TopicService , RepService, RoleService, RequestService } from '../../../services/index';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { appConfig } from '../../../app.config';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { DatePipe } from '@angular/common';
declare var jQuery:any;

@Component({
  selector: 'app-rep-contents',
  templateUrl: './rep-contents.component.html',
  styleUrls: ['./rep-contents.component.css']
})
export class RepContentsComponent implements OnInit {

loading = false;
  is_hide : boolean;
  showSelected : boolean;
  constructor(
    private router: Router,
  	private activatedRoute: ActivatedRoute,
  	private repService : RepService,
    private roleService : RoleService,
    private requestService : RequestService,
  	private topicService : TopicService,
  	private dragulaService: DragulaService,
  	private datePipe: DatePipe,
  	private toasterService: ToasterService) { 

	dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
    this.showSelected = false;  
  }
  ShowButton(){
    this.showSelected = true;
  }
  HideButton(){
      this.showSelected = false;
  }
  userId = [];
  APIURL = {}
  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
  }

  private onRemoveModel(args) {
    let [el, source] = args;
    // do something else
  }
  ngOnInit() {
  	  this.activatedRoute.params.subscribe((params: Params) => {
        this.userId = params['id'];
      });
      this.is_hide = false;
      this.APIURL = appConfig.apiUrl;
      this.listBrands();
      this.convertStr();
  }
  activeUser(id,status){
    this.loading = true;
    this.requestService.activeUserID(id,status)
    .subscribe(
      data => {
        this.toasterService.pop('success', 'Speaker', data.result);
        this.loading = false;    
        this.getUser(this.userId);             
      },
      error => {
          this.loading = false;
          console.log(error);
      })
  }
  deleteUser(id){
    this.loading = true;
    this.requestService.deleteUserId(id)
    .subscribe(
      data => {
        this.toasterService.pop('success', 'Speaker', data.result);
        this.loading = false;    
        this.router.navigateByUrl('home/redirect/5');          
      },
      error => {
          this.loading = false;
          console.log(error);
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
  convertStr(){
    let date = this.datePipe.transform(new Date(), 'z');
    var str     = date;
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join('');
    this.dateZone = acronym; 
    console.log(this.dateZone);
  }
  userData: any = [];
  selectedBrand : any = [];
  bioExtension = [];
  cvExtension = [];
  getUser(id){
  	this.loading = true;
  	this.repService.getOneUser(id)
  	.subscribe(
  		data => {
        	this.loading = false;
        	this.userData = data.result[0];
          let brand = this.userData.userBrand;
          let product = this.userData.userProduct; 
          let x = this.userData.cv;
          if(x){
            let xy =  x.split(".");
            this.cvExtension = xy[1];
          }
          // -----------------------

          let z = this.userData.biography;
          if(z){
            let zy =  z.split(".");
            this.bioExtension = zy[1];
          }
          //console.log(this.bioExtension);
          // ----------------------- 
          brand.forEach(items => {
            this.selectedBrand.push(items.brand);      
            this.getProduct(items.brand);
          })
          product.forEach(data => {
            this.updatePro.push(data.product);
            this.selectedProduct.push(data.product);
          })
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  }
  url :any= [];
  imageUser :any = [];
  readUrl(event) {
	  if (event.target.files && event.target.files[0]) {
	    var reader = new FileReader();
	    this.imageUser = event.target.files;
	    reader.onload = (event:any) => {
	      this.is_hide = true;
	      this.url = event.target.result;
	    }

	    reader.readAsDataURL(event.target.files[0]);
	  }
  }
  updateUser(data){
  	console.log(data);
  	this.loading = true;
  	this.repService.updateUser(this.userId,data)
  	.subscribe(
  		data => {
        	this.loading = false;
        	if(this.imageUser.length==0){
        		 this.toasterService.pop('success', 'REP', "User Updated Successfully");
        	}else{
        		this.uploadProfile(data.result.id);
        	}
        	console.log(this.userData);
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  }
  brandList = [];
  selectedProduct = [];
  listBrands(){
    this.brandList = [];
    this.productList = [];    
  	this.loading = true;
  	this.repService.listBrand()
  	.subscribe(
  		data => {
  			this.loading = false;
  			this.brandList = data.result;    
        this.getUser(this.userId);    	
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  }
  productList = [];
  updatePro = [];
  updateBrand = [];
  getProduct(id){
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
  updateBrandProduct(){
    if(this.updateBrand.length!=0){
      if(this.updatePro.length==0){
        this.toasterService.pop('error', 'REP', "Product Should be required");
        return false;
      }
    }
  	this.loading = true;
	  this.repService.assignBrand(this.userId,this.updateBrand,this.updatePro)
  	.subscribe(
  		data => {
          this.toasterService.pop('success', 'REP', "User Brand Updated Successfully");
          this.loading = false;
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  }
  uploadProfile(id){
	this.loading = true;
	this.repService.profileImage(this.userId,this.imageUser[0])
  	.subscribe(
  		data => {
          this.toasterService.pop('success', 'REP', "User Updated Successfully");
          this.loading = false;
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  }
  // ----------------------------------------------------------------------------
  availableTopics = [];	
  assignedTopics = [];
  listTopics(){
  	this.loading = true;
  	this.repService.listTopic(this.userId)
  	.subscribe(
  		data => {          
          this.loading = false;
          this.availableTopics = data.availableTopics;
          this.assignedTopics = data.assiginedTopics;
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
  	this.repService.assignTopics(this.userId,this.assignedTopicID)
  	.subscribe(
  		data => {          
          this.loading = false;
          this.toasterService.pop('success', 'REP', "Topic assigned to user");
          console.log(data);
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  }
  // ----------------------------------------------------------------------------
  // manage request receive
  requestData = [];
  requestInit = [];
  listRequest(){
  	this.requestInitLen = [];
  	this.loading = true;
  	this.repService.listOfRequest(this.userId)
  	.subscribe(
  		data =>{
  			this.loading = false;
        if(data.result.length>0){
          this.activeRow = data.result[0].id
          this.getOneRecord(data.result[0].id);
        }
  			// this.activeRow = data.result[0].id
  			// this.getOneRecord(data.result[0].id);
  			this.requestData = data.result;
        console.log(this.requestData);
  		},
  		error => {
			this.loading = false;
			this.toasterService.pop('errro', 'REP', "Try Again Later");
  		})
  }
  activeRow = [];
  requestInitLen= [];
  getOneRecord(id){
    this.loading = true;    
    this.activeRow = id;
    this.repService.getOneRequest(id)
    .subscribe(
      data => {
        this.requestInitLen = data.result;
        this.requestInit = data.result[0];
        this.loading = false;
      },
      error => {
          this.loading = false;
          console.log(error);
          this.toasterService.pop('errro', 'REP', "Try Again Later");
      })
  }
  cancelRequest(id){
    this.loading = true;
    this.repService.cancel(id)
    .subscribe(
      data => {
        this.toasterService.pop('success', 'REP', "Meeting Request Cancelled");
        this.loading = false;
        this.listRequest();        
      },
      error => {
          this.loading = false;
          console.log(error);
          this.toasterService.pop('errro', 'REP', "Try Again Later");
      })
  }
  // manage request receive end
  // ----------------------------------------------------------------------------
    // ----------------------------------------------------------------------------
  // manage request send
  requestDataSend = [];
  requestInitSend = [];
  listRequestSend(){
    this.requestInitLenSend = [];
    this.loading = true;
    this.repService.listOfRequestSend(this.userId)
    .subscribe(
      data =>{
        this.loading = false;
        if(data.result.length>0){
          this.activeRowSend = data.result[0].id
          this.getOneRecordSend(data.result[0].id);
        }
        // this.activeRowSend = data.result[0].id
        // this.getOneRecordSend(data.result[0].id);
        this.requestDataSend = data.result;
        console.log(this.requestDataSend);
      },
      error => {
      this.loading = false;
      this.toasterService.pop('errro', 'REP', "Try Again Later");
      })
  }
  activeRowSend = [];
  requestInitLenSend= [];
  getOneRecordSend(id){
    this.loading = true;    
    this.activeRow = id;
    this.repService.getOneRequestSend(id)
    .subscribe(
      data => {
        this.requestInitLenSend = data.result;
        this.requestInitSend = data.result[0];
        this.loading = false;
      },
      error => {
          this.loading = false;
          console.log(error);
          this.toasterService.pop('errro', 'REP', "Try Again Later");
      })
  }
  cancelRequestSend(id){
    this.loading = true;
    this.repService.cancel(id)
    .subscribe(
      data => {
        this.toasterService.pop('success', 'Request', "Meeting Request Cancelled");
        this.loading = false;
        this.listRequestSend();        
      },
      error => {
          this.loading = false;
          console.log(error);
          this.toasterService.pop('errro', 'REP', "Try Again Later");
      })
  }
  // manage request sent end
  // ----------------------------------------------------------------------------
  // manage events start
  listEvents = [];
  activeEvent = [];
  listEventsData(){
  	this.loading  = true;
  	this.repService.listEvents(this.userId)
  	.subscribe(
  		data=>{
  			this.listEvents = data.result;
        if(data.result.length!=0){
            this.activeEvent = data.result[0].id
            this.getOneEvent(data.result[0].id);
        }
        this.listEvents = data.result;
  			this.loading = false;
  		},
  		error =>{
			this.loading = false;
			this.toasterService.pop('errro', 'REP', "Try Again Later");
  		})
  }
  eventInitLen = [];
  eventInit = [];
  getOneEvent(id){
    this.loading = true;    
    this.activeEvent = id;
    this.repService.getOneRequestEvent(this.userId,id)
    .subscribe(
      data => {
        this.eventInitLen = data.result;
        this.eventInit = data.result[0];
        console.log(this.eventInit);
        this.loading = false;
      },
      error => {
          this.loading = false;
          console.log(error);
          this.toasterService.pop('errro', 'REP', "Try Again Later");
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
          console.log('error');
        });
  }
  // manage events end
  // ----------------------------------------------------------------------------

  ngAfterViewInit() {
       //Copy in all the js code from the script.js. Typescript will complain but it works just fine
       jQuery(document).ready(function() {
             jQuery('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 3,
                    nav: false
                  },
                  1000: {
                    items: 6,
                    nav: true,
                    loop: false,
                    margin: 20
                  }
                }
              })
            })
  }
	paymentSort = [
    {value: 'accept', viewValue: 'Accept'},
    {value: 'reject', viewValue: 'Reject'},
    {value: 'price', viewValue: 'Price'}
  ];
}
