import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SafeResourceUrl,DomSanitizer} from '@angular/platform-browser';
import { ContentService } from '../services/index';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { appConfig } from '../app.config';
@Component({
  selector: 'app-pdfcontent',
  templateUrl: './pdfcontent.component.html',
  styleUrls: ['./pdfcontent.component.css']
})
export class PdfcontentComponent implements OnInit {
  loading=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private contentService: ContentService,
    private toasterService: ToasterService,
  ) { }

url = {};
fileUrl={};
APIURL={};
  ngOnInit() {
    this.url = this.route.snapshot.paramMap.get('url');   
    this.loadData(this.url);
    this.APIURL = appConfig.apiUrl;
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  viewFile :any= {};
  loadData(url){
    this.contentService.getPdf(url)
    .subscribe(
      data =>{
        this.viewFile = data.result;
        let temp = 'assets/ViewerJS/#'+this.APIURL+this.viewFile.content_path+this.viewFile.file_name;
        this.fileUrl= this.transform(temp);
      },
      error =>{
        this.toasterService.pop('error', 'RD', 'Try Again Later');
      }
    )
    
  }
}
