import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class ContentService {
    constructor(private http: Http) { } 
    getAll() {
        return this.http.get('/ContentList')
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    getOne(id){
        return this.http.get('/contentListDetails?id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    hcpAvaiable(id){
        return this.http.get('/listOfContentUser?userType=2&content='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    hciAvaiable(id){
        return this.http.get('/listOfContentUser?userType=3&content='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    assignHci(content,data){        
        return this.http.post('/addContentUser',{content:content,userType:3,user:data})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    assignHcp(content,data){        
        return this.http.post('/addContentUser',{content:content,userType:2,user:data})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    create(data){
        return this.http.post('/addContent',data)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    update(data){
        return this.http.put('/editContent',data)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    delete(data){
        return this.http.put('/deleteContent',{id:data})
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    addfile(id,file){
        let formData = new FormData();
        formData.append('contentId', id);
        formData.append('content_file', file); 
       return this.http.put('/addContentFile?contentId='+id,formData)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError);   
    }
    addImage(id,file){
        let formData = new FormData();
        formData.append('id', id);
        formData.append('cover_image', file); 
       return this.http.put('/addContentCoverImage?id='+id,formData)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError);  
    }
    active(data){
        return this.http.put('/activeInactiveContent?id='+data,{active:1})
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    inactive(data){
        return this.http.put('/activeInactiveContent?id='+data,{active:0})
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    //without authurization calling api for pdf content
    getPdf(id){
        return this.http.get('/contentListDetailsToken?id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}