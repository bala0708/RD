import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { appConfig } from '../../app.config';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
    loading = false;
    constructor(
      private router: Router,
      public dialog: MatDialog,
      private toasterService: ToasterService,
      private categoryService: CategoryService,
    ) { }
    APIURL = {};
    ngOnInit() {
      this.listCategory();
      this.listSubCategory();
      this.APIURL = appConfig.apiUrl;
    }
    isEmpty : boolean;
    addCategory :any = [];
    error :any = [];
    create(data){
        this.loading = true;
        this.categoryService.create(data.category_name)
        .subscribe(
          data =>{
             this.loading = false;          
             this.toasterService.pop('success', 'Category', 'Updated Successfully');
          },
          error =>{
            let err = JSON.parse(error);
            this.toasterService.pop('error', 'Category', err.result);
            this.loading = false;
          }
        )
    }
    update(data){
      this.loading = true;
      this.categoryService.update(data.category_name,this.recordId)
      .subscribe(
        data =>{
          this.loading = false;          
          this.toasterService.pop('success', 'Category', 'Updated Successfully');          
        },
        error =>{
          let err = JSON.parse(error);
          this.toasterService.pop('error', 'Category', err.result);
          this.loading = false;
        }
      )
    }
     
    public title: string = 'Are you sure?';
    public message: string = 'Are you really <b>sure</b> you want to do this?';
    public confirmText: string = 'Yes';
    public cancelText: string = 'No';
    public confirmClicked: boolean = false;
    public cancelClicked: boolean = false;
    user :any = [];
    cat : any =[]
    listCategory(){
      this.loading = true;
      this.categoryService.getAll()
      .subscribe(
        data =>{
          this.cat =data.result;
          this.loading = false;
        },
        error =>{
          this.loading = false;
        }
      )
    }
    listSubCategory(){
      this.loading = true;
      this.categoryService.getAllSub()
      .subscribe(
        data =>{
          this.user =data.result;
          this.loading = false;
        },
        error =>{
          this.loading = false;
        }
      )
    }
    nameCat :any= [];
    getName(id){
      this.cat.forEach(items => {
        if(id == items.id){ 
          this.nameCat = items.category_name;
        }
      })
      if(this.nameCat){
        return this.nameCat;
      }else{
        return '';
      }
      
    }
    editCat :any = [];
    recordId :any = {};
    getOneRecord(id){
      this.loading = true;
      this.categoryService.getOneSub(id)
      .subscribe(
        data =>{
          this.editCat =data.result[0];
          this.recordId = this.editCat.id;
          this.loading = false;
        },
        error =>{
          this.loading = false;
        }
      )
    }
    deletes(id){   
      this.loading = true;
      this.categoryService.deleteSub(id)
      .subscribe(
        data =>{
          this.loading = false;
          this.toasterService.pop('success', 'Category', 'Deleted Successfully');
          this.listCategory();
        },
        error =>{
          let err = JSON.parse(error);
          this.toasterService.pop('error', 'Category', err.result);
          this.loading = false;
        }
      )
    }
    reset(){
      this.router.navigateByUrl('home/redirect/7'); 
    }
    foods = [
      {value: 'steak-0', viewValue: 'Steak'},
      {value: 'pizza-1', viewValue: 'Pizza'},
      {value: 'tacos-2', viewValue: 'Tacos'}
    ];
    active(id,status){
      this.loading = true;
      this.categoryService.activatedSub(id,status)
      .subscribe(
        data =>{
          this.loading = false;
          this.toasterService.pop('success', 'Category', data.result);
          this.listCategory();
        },
        error =>{
          let err = JSON.parse(error);
          this.toasterService.pop('error', 'Category', err.result);
          this.loading = false;
        }
      )
    }
}