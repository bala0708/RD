import { Component, OnInit ,AfterViewInit,ElementRef  } from '@angular/core';
import { TopicService , HciService, RoleService ,RequestService } from '../../../services/index';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { appConfig } from '../../../app.config';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { DatePipe } from '@angular/common';
import { Inject, HostListener } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
declare var jQuery:any;
@Component({
  selector: 'app-hci-contents',
  templateUrl: './hci-contents.component.html',
  styleUrls: ['./hci-contents.component.css']
})
export class HciContentsComponent implements OnInit,AfterViewInit  {
  loading = false;
  is_hide : boolean;
  showSelected : boolean;
  public fixed: boolean = false;
  constructor(
    private router: Router,
  	private activatedRoute: ActivatedRoute,
  	private hciService : HciService,
    private requestService : RequestService,    
    private roleService : RoleService,
  	private topicService : TopicService,
  	private dragulaService: DragulaService,
  	private datePipe: DatePipe,
    private toasterService: ToasterService,
    @Inject(DOCUMENT) private document: Document) { 

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
        this.router.navigateByUrl('home/redirect/3');          
      },
      error => {
          this.loading = false;
          console.log(error);
      })
  }
  paymentTop(id,status){
    this.loading = true;
    let data = {
      id : id,
      status : status
    }
    this.requestService.payMode(data)
    .subscribe(
      data => {
        this.toasterService.pop('success', 'Payment', data.result);
        this.loading = false;
        this.listPayments();       
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
  	this.hciService.getOneUser(id)
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
  	this.hciService.updateUser(this.userId,data)
  	.subscribe(
  		data => {
        	this.loading = false;
        	if(this.imageUser.length==0){
        		 this.toasterService.pop('success', 'Speaker', "User Updated Successfully");
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
  	this.hciService.listBrand()
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
        this.toasterService.pop('error', 'Speaker', "Product Should be required");
        return false;
      }
    }
  	this.loading = true;
	  this.hciService.assignBrand(this.userId,this.updateBrand,this.updatePro)
  	.subscribe(
  		data => {
          this.toasterService.pop('success', 'Speaker', "User Brand Updated Successfully");
          this.loading = false;
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  }
  uploadProfile(id){
	this.loading = true;
	this.hciService.profileImage(this.userId,this.imageUser[0])
  	.subscribe(
  		data => {
          this.toasterService.pop('success', 'Speaker', "User Updated Successfully");
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
  	this.hciService.listTopic(this.userId)
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
  	this.hciService.assignTopics(this.userId,this.assignedTopicID)
  	.subscribe(
  		data => {          
          this.loading = false;
          this.toasterService.pop('success', 'Speaker', "Topic assigned to user");
          console.log(data);
  		},
	  	error => {
        	this.loading = false;
	  		console.log(error);
	  	})
  }
  // ----------------------------------------------------------------------------
  // manage request start
  requestData = [];
  requestInit = [];
  listRequest(){
  	this.requestInitLen = [];
  	this.loading = true;
  	this.hciService.listOfRequest(this.userId)
  	.subscribe(
  		data =>{
  			this.loading = false;
        if(data.result.length>0){
          this.activeRow = data.result[0].id
          this.getOneRecord(data.result[0].id);
        }
  			this.requestData = data.result;
  		},
  		error => {
			this.loading = false;
			this.toasterService.pop('errro', 'Speaker', "Try Again Later");
  		})
  }
  activeRow = [];
  requestInitLen= [];
  getOneRecord(id){
    this.loading = true;    
    this.activeRow = id;
    this.hciService.getOneRequest(id)
    .subscribe(
      data => {
        this.requestInitLen = data.result;
        this.requestInit = data.result[0];
        this.loading = false;
      },
      error => {
          this.loading = false;
          console.log(error);
          this.toasterService.pop('errro', 'Speaker', "Try Again Later");
      })
  }
  cancelRequest(id){
    this.loading = true;
    this.hciService.cancel(id)
    .subscribe(
      data => {
        this.toasterService.pop('success', 'Request', "Meeting Request Cancelled");
        this.loading = false;
        this.listRequest();        
      },
      error => {
          this.loading = false;
          console.log(error);
          this.toasterService.pop('errro', 'Speaker', "Try Again Later");
      })
  }
  // manage request end
  // ----------------------------------------------------------------------------
  // manage events start
  listEvents = [];
  activeEvent = [];
  listEventsData(){
  	this.loading  = true;
  	this.hciService.listEvents(this.userId)
  	.subscribe(
  		data=>{
  			this.listEvents = data.result;
        if(data.result.length>0){
          this.activeEvent = data.result[0].id
          this.getOneEvent(data.result[0].id);
        }
        // this.activeEvent = data.result[0].id
        // this.getOneEvent(data.result[0].id);
  			this.loading = false;
  		},
  		error =>{
			this.loading = false;
			this.toasterService.pop('errro', 'Speaker', "Try Again Later");
  		})
  }
  eventInitLen = [];
  eventInit = [];
  getOneEvent(id){
    this.loading = true;    
    this.activeEvent = id;
    this.hciService.getOneRequestEvent(this.userId,id)
    .subscribe(
      data => {
        this.eventInitLen = data.result;
        this.eventInit = data.result[0];
        this.loading = false;
      },
      error => {
          this.loading = false;
          console.log(error);
          this.toasterService.pop('errro', 'Speaker', "Try Again Later");
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
  // manage payments start
  listPay : any = [];
  listPayInit : any = [];
    listPayments(){
      this.loading = true;
      this.hciService.listPay(this.userId)
      .subscribe(
          data => { 
              this.listPay = data.result;
              this.loading = false;
          },
          error => {     
            this.loading = false;
            console.log('error');
          });
    }
    getOnePayee(id){
    this.loading = true;
    this.hciService.listOne(id)
    .subscribe(
        data => { 
            this.listPayInit = data.result[0];
            this.loading = false;
        },
        error => {     
          this.loading = false;
          console.log('error');
        });
    }
  // manage payments end
  // ----------------------------------------------------------------------------
  addMoney :any = [];
  createDuration(){
    this.loading = true;
    this.hciService.createDur(this.addMoney,this.userId)
    .subscribe(
        data => { 
          this.loading = false;
          this.listUserDurationData();
          this.toasterService.pop('success', 'Speaker Duration', "Added Successfully");
        },
        error => {     
          this.loading = false;
          console.log('error');
          this.toasterService.pop('error', 'Speaker Duration', "Try Again Later");
        });    
  }
  listDuration : any = [];
  listUserDurationData(){
    this.loading = true;
    this.hciService.listUserDuration(this.userId)
    .subscribe(
        data => { 
          this.loading = false;
          this.listDuration = data.result;
        },
        error => {     
          this.loading = false;
          console.log('error');
          this.toasterService.pop('error', 'Speaker Duration', "Try Again Later");
        });   
  }
  suspendDuration(id,status){
    this.loading = true;
    this.hciService.activeDuration(id,status)
    .subscribe(
        data => { 
          this.loading = false;
          this.listUserDurationData();
          this.toasterService.pop('success', 'Speaker Duration', data.result);
        },
        error => {     
          this.loading = false;
          console.log('error');
          this.toasterService.pop('error', 'Speaker Duration', "Try Again Later");
        });    
  }
  deleteDuration(id){
    this.loading = true;
    this.hciService.deleteDuration(id)
    .subscribe(
        data => { 
          this.loading = false;
          this.listUserDurationData(); 
          this.toasterService.pop('success', 'Speaker Duration', data.result);
        },
        error => {     
          this.loading = false;
          console.log('error');
          this.toasterService.pop('error', 'Speaker Duration', "Try Again Later");
        });  
  }
  editDuration :any = [];
  EditDuration(id){
    this.loading = true;
    this.hciService.getOneDuration(id)
    .subscribe(
        data => { 
          this.loading = false;
          this.editDuration = data.result[0];
        },
        error => {     
          this.loading = false;
          console.log('error');
          this.toasterService.pop('error', 'Speaker Duration', "Try Again Later");
        }); 
  }
  updateDuration(){
    this.loading = true;
    this.hciService.updateDur(this.editDuration,this.userId)
    .subscribe(
        data => { 
          this.loading = false;
          this.listUserDurationData();
          this.toasterService.pop('success', 'Speaker Duration', "Updated Successfully");
        },
        error => {     
          this.loading = false;
          console.log('error');
          this.toasterService.pop('error', 'Speaker Duration', "Try Again Later");
        });   
  }
  ngAfterViewInit() {
       //Copy in all the js code from the script.js. Typescript will complain but it works just fine

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
           
  }
	paymentSort = [
    {value: 'accept', viewValue: 'Accept'},
    {value: 'reject', viewValue: 'Reject'},
    {value: 'price', viewValue: 'Price'}
  ];
  

}
