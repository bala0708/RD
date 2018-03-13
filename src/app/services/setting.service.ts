import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class SettingService {
    constructor(private http: Http) { } 
    getAll() {
        return this.http.get('/EligibilityList')
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    getOne(id){
        return this.http.get('/EligibilityList?id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    create(data){
        return this.http.post('/addEligibility',data)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    update(data){
        return this.http.put('/editEligibility',data)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    delete(data){
        return this.http.put('/deleteEligibility',{id:data})
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    active(data){
        return this.http.post('/activeInactiveEligibility',{topic_title:data.topic_title})
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    inactive(data){
         return this.http.post('/activeInactiveEligibility',{topic_title:data.topic_title})
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}