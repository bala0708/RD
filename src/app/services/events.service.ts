import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class EventService {
    constructor(private http: Http) { } 
    getAll() {
        return this.http.get('/listUser?user_type=2')
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    getOne(){
      return this.http.get('/listUser?user_type=2')
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);  
    }
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}