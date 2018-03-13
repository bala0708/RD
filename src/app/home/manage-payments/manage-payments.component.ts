import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { PaymentService,HciService } from '../../services/index';
import { OrderByPipe, SearchPipe } from '../../pipes/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { appConfig } from '../../app.config';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
declare var jQuery:any;
@Component({
  selector: 'app-manage-payments',
  templateUrl: './manage-payments.component.html',
  styleUrls: ['./manage-payments.component.css']
})
export class ManagePaymentsComponent implements OnInit ,AfterViewInit{
  loading = false;
  is_hide : boolean;
  constructor(
    private hciService : HciService,
    private router: Router,
    private paymentService: PaymentService,
    private datePipe: DatePipe,
    private orderby: OrderByPipe,
    private dragulaService: DragulaService,
    private toasterService: ToasterService,
    ) {}

  ngOnInit() {
    this.listPayment();
    this.convertStr();
    this.listBrands();
    this.APIURL = appConfig.apiUrl;
  }
  payment = [];
  listPayment(){
	this.loading = true;
 	this.paymentService.getAll()
    .subscribe(
        data => { 
        	this.loading = false;
          this.payment = data.result;          
        	this.getOneRecord(data.result[0].id);
        },
        error => {     
          this.toasterService.pop('error', 'Payments', 'Try Again Later');
          this.loading = false;
        });
  }
  initRecord = [];
  paymentInit :any = [];
  getOneRecord(id){
  this.loading = true;
  // window.scroll({
  //   top: 0, 
  //   left: 0, 
  //   behavior: 'smooth' 
  // });
 	this.paymentService.getOne(id)
    .subscribe(
        data => { 
        	this.loading = false;
        	this.paymentInit = data.result[0];
          this.initRecord= id;          
        },
        error => {     
          this.toasterService.pop('error', 'Payments', 'Try Again Later');
          this.loading = false;
        });
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
                 items: 3,
                 nav: true,
                 loop: false,
                 margin: 20
               }
             }
           })
        
}
userId = [];
APIURL = {}
private onDropModel(args) {
  let [el, target, source] = args;
  // do something else
}
userData: any = [];
selectedBrand : any = [];
bioExtension = [];
cvExtension = [];
payMode(id,status){
  this.loading = true;
  let data = {
    id : id,
    status : status
  }
  this.paymentService.payMode(data)
  .subscribe(
    data => {
      this.toasterService.pop('success', 'Payment', data.result);
      this.loading = false;
      this.getOneRecord(id);       
    },
    error => {
        this.loading = false;
        console.log(error);
    })
}
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
}
