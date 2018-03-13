import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class PaymentService {
    constructor(private http: Http) { } 
    getAll() {
        return this.http.get('/ListOfPayment')
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    getOne(id) {
        return this.http.get('/ListOfPayment?id='+id)
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
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}