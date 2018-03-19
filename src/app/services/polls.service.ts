import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class PollsService {
    constructor(private http: Http) { } 
    getAll() {
        return this.http.get('/listOfPolls')
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    getOne(id) {
        return this.http.get('/pollsViewDetails?id='+id)
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    create(data) {
        return this.http.post('/addPoll',data)
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    addPollImage(file,id){
        let formData = new FormData();
        formData.append('pollId', id);
        formData.append('poll_image', file); 
        return this.http.post('/addPollImage?pollId='+id,formData)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    listOfPollsTopics(id){
        return this.http.get('/listOfPollsTopics?poll='+id)
        .map((response: Response)=>{
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    assignPollsTopics(data,id){
        return this.http.post('/assignPollsTopics',{topic:data,poll:id})
        .map((response: Response)=>{
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }

    assignPollsQuestions(data,id){
        return this.http.post('/assignToPoll',{data})
        .map((response: Response)=>{
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    suspendAll(data){
        return this.http.post('/activeInactivePoll',{id:data,active:0})
        .map((response: Response)=>{
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    activeAll(data){
        return this.http.post('/activeInactivePoll',{id:data,active:1})
        .map((response: Response)=>{
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    deleteAll(data){
        return this.http.post('/deletePoll',{id:data,active:0})
        .map((response: Response)=>{
            let data = response.json();
            return data;
        }).catch(this.handleError); 
    }
    suspendPolls(){

    }
    deletePolls(){

    }
    getQuestions(){
        return this.http.get('/listOfQuestion')
        .map((response: Response)=>{
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    getAssignedQuestions(id){
        return this.http.get('/listOfPollQuestion?poll='+id)
        .map((response: Response)=>{
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    addQuestion(data){
        return this.http.post('/addQuestion',data)
        .map((response: Response)=>{
            let data = response.json();
            return data;
        }).catch(this.handleError); 
    }
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error'); 
    }
}