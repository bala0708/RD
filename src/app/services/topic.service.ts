import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class TopicService {
    constructor(private http: Http) { } 
    listTopic() {
        return this.http.get('/topicsList')
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    create(data){
        return this.http.post('/addTopics',{topic_title:data.topic_title_new})
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    addImage(id,image){
        let formData = new FormData();
        formData.append('topic_id', id);
        formData.append('topic_image', image); 
        return this.http.put('/addTopicsImage?topic_id='+id,formData)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    getOne(id){
        return this.http.get('/topicsList?id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    getProduct(id){
        return this.http.get('/CompanyBrandList?id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    assignEligibility(data){
        return this.http.post('/assignEligibilityToTopic',data)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }    
    availableHci(topic){        
        return this.http.get('/listOfAvailableUsers?topic='+topic)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    assignHci(topic){        
        return this.http.get('/assiginedUserTopicsList?topic='+topic)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    assignHciTopic(data,topic){
        let dataPost = {
            topic : topic,
            user : data,
        }
        return this.http.post('/assignMultipleUserToTopics',dataPost)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    getContent(topic){
        return this.http.get('/listOfAvailableContent?topic='+topic)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    assignContent(topic){
        return this.http.get('/assiginedTopicContentList?topic='+topic)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);     
    }
    editTopicData(topic){
        return this.http.put('/editTopics?id='+topic.id,topic)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);       
    }
    editTopicBrands(topic){
        return this.http.post('/addProductTopics',topic)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);       
    }
    removeProduct(id){
         return this.http.put('/deleteTopicStatutory?id='+id,{id:id})
        .map((response: Response) => {
            let deleteData = response.json();
            return deleteData;
        }).catch(this.handleError);
    }
    assignContents(data,topic){
        let dataPost = {
            topicId : topic,
            contectId : data,
        }
        return this.http.post('/addTopicsContent',dataPost)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    addTopicDoc(file,topic){
        let formData = new FormData();
        formData.append('topic', topic);
        formData.append('topic_statutory', file); 
        return this.http.put('/addTopicsStatutory',formData)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    deleteTopics(id){
        return this.http.put('/deleteTopics?id='+id,{id:id})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);    
    }
    suspendTopicsData(id){
        return this.http.put('/activeInactiveTopics?id='+id,{active:0})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);   
    }
    activeTopicsData(id){
        return this.http.put('/activeInactiveTopics?id='+id,{active:1})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);   
    }
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}