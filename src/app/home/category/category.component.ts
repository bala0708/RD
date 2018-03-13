import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { appConfig } from '../../app.config';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
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
    this.APIURL = appConfig.apiUrl;
  }
  isEmpty : boolean;
  addCategory :any = [];
  category_image :any = [];
  category_image_update:any = [];
  fileChanged(e: FileList) {
    this.category_image = e;
    this.isEmpty = false;
  }
  imageRemoved(file: FileList) {
    this.category_image = '';    
    this.isEmpty = true;
  }  
  fileChanged1(e: FileList) {
    this.category_image_update = e;
    this.isEmpty = false;
  }
  imageRemoved1(file: FileList) {
    this.category_image_update = '';    
    this.isEmpty = true;
  }  
  error :any = [];
  create(data){
    if(this.category_image.length == 0){
      this.error="Category Image is required";
      console.log(this.error);
    }else{
      this.loading = true;
      this.categoryService.create(data.category_name)
      .subscribe(
        data =>{
           this.loading = false;          
           this.addImage(data.result.id,this.category_image);          
        },
        error =>{
          this.loading = false;
          let err = JSON.parse(error);
          this.toasterService.pop('error', 'Category', err.result);
          
        }
      )
    }
  }
  update(data){
    this.loading = true;
    this.categoryService.update(data.category_name,this.recordId)
    .subscribe(
      data =>{
        this.loading = false;
        if(this.category_image_update.length != 0){
          this.addImage(this.recordId,this.category_image_update);
        }else{
          this.toasterService.pop('success', 'Category', 'Updated Successfully');
          this.router.navigateByUrl('home/redirect/7'); 
        }
      },
      error =>{
        this.loading = false;
        let err = JSON.parse(error);
        this.toasterService.pop('error', 'Category', err.result);
         
      }
    )
  }
  addImage(id,image){
    this.loading = true;
    console.log(this.category_image);
    this.categoryService.addProfile(image,id)
    .subscribe(
      data =>{
        this.loading = false;
        this.toasterService.pop('success', 'Category', 'Added Successfully');
        this.router.navigateByUrl('home/redirect/7'); 
      },
      error =>{
        this.loading = false;
        let err = JSON.parse(error);
        this.toasterService.pop('error', 'Category', err.result);         
      })
  }
  public title: string = 'Are you sure?';
  public message: string = 'Are you really <b>sure</b> you want to do this?';
  public confirmText: string = 'Yes';
  public cancelText: string = 'No';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  user :any = [];
  listCategory(){
    this.loading = true;
    this.categoryService.getAll()
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
  editCat :any = [];
  recordId :any = {};
  getOneRecord(id){
    this.loading = true;
    this.categoryService.getOne(id)
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
    this.categoryService.delete(id)
    .subscribe(
      data =>{
        this.loading = false;
        this.toasterService.pop('success', 'Category', 'Deleted Successfully');
        this.listCategory();
      },
      error =>{
        this.loading = false;
        let err = JSON.parse(error);
        this.toasterService.pop('error', 'Category', err.result);         
      }
    )
  }
  reset(){
    this.router.navigateByUrl('home/redirect/7'); 
  }
  active(id,status){
    this.loading = true;
    this.categoryService.activated(id,status)
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
 
