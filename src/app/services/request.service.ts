import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class RequestService {
    constructor(private http: Http) { } 
    getAll() {
        return this.http.get('/adminListMeeting?status=1')
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    getOne(id){
        return this.http.get('/adminListMeeting?status=1&id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);   
    }
    cancel(id){
      return this.http.get('/adminMeetingStatusChange?status=2&id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);    
    }
    suspend(id){
      return this.http.get('/adminListMeeting?status=1&id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);    
    }
    // -------------------------------------
    // manage events
    getAllEvents() {
        return this.http.get('/adminListMeeting')
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    getOneEvents(id){
        return this.http.get('/adminListMeeting?id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);   
    }
    suspendEvents(id){
        return this.http.get('/adminMeetingStatusChange?status=0&id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);   
    }
    payMode(data){
        return this.http.post('/acceptRejectPayment',data)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);   
    }
    activeUserID(id,status){
        return this.http.put('/activeInactiveUser?id='+id,{id:id,active:status})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);   
    }
    deleteUserId(id){
        return this.http.put('/deleteUser?id='+id,{id:id})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);  
    }
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}