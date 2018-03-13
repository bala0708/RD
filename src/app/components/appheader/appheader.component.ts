import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent  {
  removeLocal(){
  	localStorage.removeItem('topic_id');
  }
  removeLocalBrand(){
  	localStorage.removeItem('clientInit');
  	localStorage.removeItem('productInit');
  }
  removeLocalContent(){
    localStorage.removeItem('contentId');
  }
}
