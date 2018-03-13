import { Component, OnInit } from '@angular/core';
import {ChangeDetectorRef} from '@angular/core';
import { ClientService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { appConfig } from '../../app.config';
import { FileUploader } from 'ng2-file-upload';
declare var jQuery:any;
@Component({
  selector: 'app-manage-brands',
  templateUrl: './manage-brands.component.html',
  styleUrls: ['./manage-brands.component.css']
})
export class ManageBrandsComponent implements OnInit {
  is_add: boolean;
  is_view: boolean; 
  is_prod: boolean;
  is_prodList: boolean;
  is_editPro : boolean;
  is_editDis : boolean;
  isEmpty :boolean;
  isEmpty1 :boolean;
  isEmpty2 :boolean;
  isEmpty3 :boolean;
  loading = false;
  productsData = [];
  constructor(
    private router: Router,
    private clientService: ClientService,
    private cd : ChangeDetectorRef,
    private toasterService: ToasterService,
  ) {
    this.is_add = true;
    this.is_view = false;
    this.is_prod = true;
    this.is_prodList = false;
    this.is_editPro = false;
    this.is_editDis = true;
    this.isEmpty = true;
    this.isEmpty1 = true;
    this.isEmpty3 = true;
   }
   clients = [];
  ngOnInit() {
    this.listRolesData();

  }
  enableClients(){
    this.is_add = false;
    this.is_view = true;
  }
  rerender = false;
  disableClients(){
    this.is_add = true;
    this.is_view = false;
    this.brand_image = '';
    this.clients = [];
    this.router.navigateByUrl('home/redirect/1');   
  } 
  reload(){
    this.router.navigateByUrl('home/redirect/1');   
  } 
  addProd(){
    this.is_prod = false;
    this.is_prodList = true;
  }
  viewProd(){
    this.is_prod = true;
    this.is_prodList = false;
  }
  addProducts(data){
    this.loading = true;
    let product = data.value;
    let brand = this.activeID;
    this.clientService.addProducts(product,brand)
    .subscribe(
        data => { 
          var id = data.result.id;
          this.clientService.addProductImage(id,this.product_image)
          .subscribe(
           data => { 
             this.loading = false;
             this.toasterService.pop('success', 'Product', 'Add Products Successfully');
             this.router.navigateByUrl('home/redirect/1'); 
           },
           error => {     
             let err = JSON.parse(error);
             this.toasterService.pop('error', 'Product', err.result);
             this.loading = false;
           });
        },
        error => {     
             let err = JSON.parse(error);
             this.toasterService.pop('error', 'Product', err.result);
             this.loading = false;
        });
  }
  urlImage = {};
  is_hide : boolean;
  imageUser :any = [];
  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.brand_image = event.target.files;
      reader.onload = (event:any) => {
        this.is_hide = true;
        this.urlImage = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  addClients(data){
    this.loading = true;
    this.clientService.addClients(data.value)
    .subscribe(
        data => { 
         var id = data.result.id;
         this.clientService.addClientImage(id,this.brand_image)
         .subscribe(
          data => { 
            this.brand_image = '';
            this.toasterService.pop('success', 'Client', 'Add Clients Successfully');
            this.loading = false;
            this.router.navigateByUrl('home/redirect/1'); 
          },
          error => {     
            let err = JSON.parse(error);
            this.toasterService.pop('error', 'Client', err.result);
            this.loading = false;
          });
        },
        error => {     
          this.loading = false;
          let err = JSON.parse(error);
          this.toasterService.pop('error', 'Client', err.result);
        });
  }
  brand_image = {};
  // fileuploaderFileChange(files: FileList){
  //   this.brand_image = files;
  // }

  fileChanged(e: FileList) {
    this.brand_image = e;
    this.isEmpty1 = false;
  }
  imageRemoved1(file: FileList) {
    this.brand_image = '';
    this.isEmpty1 = true;
    this.urlImage = '';    
  }  
  product_image = {};
  fileChangedProduct(e: FileList){
    this.product_image = e;
    this.isEmpty = false;
  }
  imageRemoved(file: FileList) {
    this.product_image = '';
    this.isEmpty = true;
  }
  clientEditImage :any = [];
  fileChangedEdit(file: FileList){
    this.clientEditImage = file;
  }
  imageRemoved3(file: FileList) {
    this.clientEditImage = '';
  }  
  disableProct(){
    this.is_prod = true;
    this.is_prodList = false;
    this.productsData = [];
    this.isEmpty = true;
    this.product_image = '';
    this.router.navigateByUrl('home/redirect/1');   
  }
  product_docs = {};
  product_docsA = {};
  fileChangedDocs(docs: FileList){
    this.product_docsA = docs;
    this.product_docs = docs[0];
  }
  productImage = {};
  fileProduct(image: FileList){
   this.productImage = image;
  }
  imageRemoved2(file: FileList) {
    this.product_image = '';
  }
  clientsListView :any = [];
  clientsListViewPage = [];
  clientsListViewInit : any= [];
  listClient = [];
  API_URL = {};
  cart = [];
  dataList = [];
  topics : any = [];
  activeID :any = {};
  listRolesData() {
    this.loading = true;
    this.dataList = [];
    this.cart = [];
    this.clientService.listClients()
        .subscribe(
            data => {
                this.clientsListView = data.result;  
                if(this.clientsListView != 0){  
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
                          this.loading = false;
                        });
                  }}     
                  if(localStorage.clientInit=='' || localStorage.clientInit==undefined){
                      localStorage.setItem('clientInit',this.activeID);  
                      this.loadProduct(this.clientsListViewInit,2);          
                  }else{                    
                      this.brandsView(localStorage.clientInit);
                  }    
                  
                  this.API_URL = appConfig.apiUrl;
              
            },
            error => {     
              console.log('error');
              this.loading = false;
            });
  }
  EnableUpdate(){
    this.is_editPro = true;
    this.is_editDis = false;
  }
  DisableUpdate(){
    this.is_editPro = false;
    this.is_editDis = true;
  }
  productData :any = {};
  disable = {};
  productDocs = [];
  loadProduct(products,type){
    this.DisableUpdate();
    this.product_docsA = [];
    this.tempDocs = [];
    this.productData=[];
    this.disable = 1;
    this.loading = true;
    if(products==''){
      this.loading = false;
    }else{
      if(type == 1){
       var proId = products;
      }else{
        var dataPro =products[0].id;
        var proId = dataPro;
      }
      localStorage.setItem('productInit',proId);
      this.clientService.productsList(proId)
      .subscribe(
          data => {             
            this.productData = data.result[0];
            this.loading = false;
            this.productDocs = this.productData.product_statutory;
            this.topics=this.productData.product_topics;      
            this.disable = 0;
            this.productImage = '';
            this.product_docs = '';
          },
      error => {     
        console.log('error');
        this.loading = false;
      });
    }
  }
  brandsView(value){
    this.loading = true;
      this.clientsListViewInit = [];
      this.clientService.viewProducts(value)
      .subscribe(
          data => { 
            this.activeID = data.result[0].id;
            this.clientsListViewInit = data.result[0].brandProduct;
            this.loading = false;
            if(localStorage.clientInit==value){
              if(localStorage.clientInit=='' || localStorage.clientInit==undefined){
                  localStorage.setItem('clientInit',value);
                  this.loadProduct(this.clientsListViewInit,2);          
              }else{   
                  if(this.clientsListViewInit.length == 0){
                    localStorage.removeItem('productInit');
                  }
                  if(localStorage.productInit=='' || localStorage.productInit==undefined) {
                    this.loadProduct(this.clientsListViewInit,2);   
                  }else{
                    this.loadProduct(localStorage.productInit,1);
                  }  
              } 
            }else{
                  localStorage.setItem('clientInit',value);
                  this.loadProduct(this.clientsListViewInit,2);
            }
          },
          error => {     
            console.log('error');
            this.loading = false;
          });
  }
  deleteClients(id){
    this.loading = true;
    localStorage.removeItem('clientInit');
    this.clientService.deleteClients(id)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            this.loading = false;
            this.toasterService.pop('success', 'Client', response.result);
            this.listRolesData();
          }
        },
        error => {     
          let err = JSON.parse(error);
          this.toasterService.pop('error', 'Client', err.result);
          this.loading = false;
        });
  }
  editProducts(data){
    this.loading = true;
    let image = this.productImage ;
    let docs = this.product_docs ;
    let id = this.productData.id;
    this.tempDocs.forEach(items =>{
      this.removedocs(items);
    })
    this.clientService.editProductsData(id,data.value)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            if(image!=''){
              this.loading = true;
              this.clientService.addProductImage(id,image)
              .subscribe(
                  data => { 
                    var response = data;
                    if(response.apiStatus==true){
                      this.loading = false;    
                      if(docs!=''){
                        this.loading = true;
                        this.clientService.addProductStatutory(id,docs)
                        .subscribe(
                            data => { 
                              var response = data;
                              if(response.apiStatus==true){
                                this.loading = false;
                                this.toasterService.pop('success', 'Product','Documents Updated Successfully');
                                this.router.navigateByUrl('home/redirect/1'); 
                              }
                            },
                            error => {     
                              console.log('error');
                              this.loading = false;
                            });
                      }else{
                        this.loading = false;
                        this.router.navigateByUrl('home/redirect/1');   
                        this.toasterService.pop('success', 'Product','Image Updated Successfully');
                      }                    
                    }
                  },
                  error => {     
                    console.log('error');
                    this.loading = false;
                  });
            }
            if(docs!=''){
              this.loading = true;
              this.clientService.addProductStatutory(id,docs)
              .subscribe(
                  data => { 
                    var response = data;
                    if(response.apiStatus==true){
                      this.loading = false;
                      this.toasterService.pop('success', 'Product','Documents Updated Successfully');
                      this.router.navigateByUrl('home/redirect/1'); 
                    }
                  },
                  error => {     
                    console.log('error');
                    this.loading = false;
                  });
            }else{
              this.loading = false;
              this.router.navigateByUrl('home/redirect/1');   
              this.toasterService.pop('success', 'Product','Updated Successfully');
            }   
            if(docs=='' && image==''){
              this.router.navigateByUrl('home/redirect/1');   
              this.loading = false;
              //this.toasterService.pop('success', 'Product','Updated Successfully');
            }
          }         
        },
        error => {     
          console.log('error');
          this.loading = false;
        });
  }
  suspendUpdate(id){
    this.loading = true;
    this.clientService.suspendProduct(id,0)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            this.loading = false;
            this.toasterService.pop('success', 'Product', response.result);
            this.brandsView(this.activeID);
          }
        },
        error => {    
          let myJSON = JSON.parse(error);
          this.loading = false;
          this.toasterService.pop('error', 'Product',myJSON.result);
        });
  }
  suspendClient(id){
    this.loading = true;
    this.clientService.suspendClient(id,0)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            this.loading = false;
            this.toasterService.pop('success', 'Suspend Client', response.result);
            this.listRolesData();
          }
        },
        error => {    
          let myJSON = JSON.parse(error);
          this.loading = false;
          this.toasterService.pop('error', 'Suspend Client',myJSON.result);
        });
  }
  activeClient(id){
    this.loading = true;
    this.clientService.suspendClient(id,1)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            this.loading = false;
            this.toasterService.pop('success', 'Active Client', response.result);
            this.listRolesData();
          }
        },
        error => {    
          let myJSON = JSON.parse(error);
          this.loading = false;
          this.toasterService.pop('error', 'Active Client',myJSON.result);
        });
  } 
  editClientsData = [];
  viewEditClients(id){
    this.loading = true;
    this.clientService.viewClients(id)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            this.loading = false;     
            this.editClientsData = response.result[0];
          }
        },
        error => {    
          let myJSON = JSON.parse(error);
          this.loading = false;
          this.toasterService.pop('error', 'Clients',myJSON.result);
        });
  }
  idOpt :any = []; 
  updateClientData(data){
    let formdata = data.value;
    this.idOpt= this.editClientsData;
    let imageClient = this.clientEditImage;
    let id = this.idOpt.id;
    this.loading = true;
    this.clientService.updateClient(id,formdata)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            if(imageClient != ''){
              this.clientService.addClientImage(id,imageClient)
              .subscribe(
               data => { 
                 this.toasterService.pop('success', 'Client', 'Update Client Successfully');
                 this.loading = false;
                 this.router.navigateByUrl('home/redirect/1'); 
               },
               error => {     
                 this.loading = false;
                 let myJSON = JSON.parse(error);
                // this.toasterService.pop('error', 'Client', myJSON.result);
                 this.router.navigateByUrl('home/redirect/1'); 
                 this.loading = false;
               });
            }else{
              this.toasterService.pop('success', 'Client', 'Update Client Successfully');
              this.router.navigateByUrl('home/redirect/1'); 
              this.loading = false;
            }
          }
        },
        error => {     
          console.log('error');
          this.router.navigateByUrl('home/redirect/1'); 
        });
  }
  deleteProduct(id){
    localStorage.removeItem('productInit');
    this.loading = true;
    this.clientService.deleteProduct(id)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            this.loading = false;
            this.toasterService.pop('success', 'Product', response.result);
            this.brandsView(this.activeID);
          }
        },
        error => {    
          let myJSON = JSON.parse(error);
          this.loading = false;
          this.toasterService.pop('error', 'Product',myJSON.result);
        }); 
  }
  removedocs(id){
    let mode = this.productData.id;
    this.clientService.removeProduct(id)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            this.loading = false;
            //this.toasterService.pop('success', 'Product', response.result);
            //this.brandsView(this.activeID);
            //this.loadProduct(mode,1);
          }
        },
        error => {    
          let myJSON = JSON.parse(error);          
          this.toasterService.pop('error', 'Product',myJSON.result);
        });
  }
  tempDocs = [];
  removeAtt(data,id){
    this.tempDocs.push(id);
    const intBrand: number = this.productDocs.indexOf(data); 
    this.productDocs.splice(intBrand,1);
  }
  activeUpdate(id){
    this.loading = true;
    this.clientService.suspendProduct(id,1)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            this.loading = false;
            this.toasterService.pop('success', 'Product', response.result);
            this.brandsView(this.activeID);
          }
        },
        error => {     
          this.loading = false;
        });
  }
  suspendTopic(id){
    this.loading = true;
    this.clientService.suspendTopic(id,0)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            this.loading = false;
            this.toasterService.pop('success', 'Suspend Client', response.result);
            location.reload();
          }
        },
        error => {    
          let myJSON = JSON.parse(error);
          this.loading = false;
          this.toasterService.pop('error', 'Suspend Client',myJSON.result);
        });
  }

  activeTopic(id){
    this.loading = true;
    this.clientService.suspendTopic(id,1)
    .subscribe(
        data => { 
          var response = data;
          if(response.apiStatus==true){
            this.loading = false;
            this.toasterService.pop('success', 'Active Client', response.result);
            location.reload();
          }
        },
        error => {    
          let myJSON = JSON.parse(error);
          this.toasterService.pop('error', 'Active Client',myJSON.result);
        });
  } 
}
