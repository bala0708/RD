import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class SessionService {
    constructor(private http: Http) { } 
    getAll() {
        return this.http.get('/adminListOfLiveSession')
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    getOne(id) {
        return this.http.get('/adminListOfLiveSession?id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    } 
    suspend(id){
        return this.http.get('/suspendMeeting?meetingId='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}