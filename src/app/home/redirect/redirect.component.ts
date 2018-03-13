import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(
  	private router: Router,
  	private activatedRoute: ActivatedRoute,
  	) { }
  userId = {};
  ngOnInit() {
  	  this.activatedRoute.params.subscribe((params: Params) => {
        this.userId = params['id'];
      });
  	this.loadPage();
  }
  loadPage(){
  	var id = this.userId;
  	if(id == 1){
  		this.router.navigateByUrl('home/manage-brands');   
  	}else if(id == 2){
      this.router.navigateByUrl('home/manage-topics'); 
    }else if(id == 3){
      this.router.navigateByUrl('home/hci'); 
    }else if(id == 4){
      this.router.navigateByUrl('home/hcp'); 
    }else if(id == 5){
      this.router.navigateByUrl('home/rep'); 
    }else if(id == 6){
      this.router.navigateByUrl('home/manage-content'); 
    }else if(id == 7){
      this.router.navigateByUrl('home/manage-category'); 
    }else if(id == 8){
      this.router.navigateByUrl('home/manage-polls'); 
    }
  }
}
