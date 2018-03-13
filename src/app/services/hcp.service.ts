import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class HcpService {
    constructor(private http: Http) { } 
    getAll() {
        return this.http.get('/listUser?user_type=2')
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    getAllRep(){
       return this.http.get('/listUser?user_type=1')
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
        return this.http.post('/addTopicsHci',data)
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
    listBrand(){        
     return this.http.get('/CompanyBrandList')
        .map((response: Response) => {
            let data = response.json();
            return data;
     }).catch(this.handleError); 
    }
    assignBrand(userId,brandId,productId){
     let data = {
         userId:userId,
         brandId:brandId,
         productId:productId
     }
     return this.http.post('/addUserBrandProduct',data)
        .map((response: Response) => {
            let data = response.json();
            return data;
     }).catch(this.handleError); 
    }
    delete(data){
        return this.http.put('/deleteTopicsHCi',{id:data})
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
    createUser(data){
        return this.http.post('/createUser',data)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    getOneUser(id){
        return this.http.get('/listUser?id='+id)
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
    profileImage(id,data){
        let formData = new FormData();
        formData.append('profile_image', data);
        formData.append('id', id);
        return this.http.put('/addProfileImage?id='+id,formData)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    uploadBio(id,data){
        let formData = new FormData();
        formData.append('biography_file', data[0]);
        formData.append('id', id); 
        return this.http.put('/addBiographyFile?id='+id,formData)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    updateUser(id,data){
        return this.http.put('/editUser?id='+id,data)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError); 
    }
    uploadCv(id,data){
        let formData = new FormData();
        formData.append('cv_file',data[0]);
        formData.append('id', id); 
        return this.http.put('/addCvFile?id='+id,formData)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError);         
    }
    // -----------------------------------------------------------
    listTopic(user){
       return this.http.get('/listOfAvailableTopics?user='+user)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError);  
    }
    assignTopics(user,topic){
        let data = {
            user : user,
            topic : topic
        }
        return this.http.post('/assignMultipleTopicsToUser',data)
            .map((response: Response) => {
                let data = response.json();
                return data;
        }).catch(this.handleError);  
    }
    // -----------------------------------------------------------
    listOfRequest(user){
     return this.http.get('/adminListMeeting?userType=2&toUser='+user)
            .map((response: Response) => {
                let data = response.json();
                return data;
     }).catch(this.handleError);         
    }
    getOneRequest(id){
        return this.http.get('/adminListMeeting?id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);   
    }
    listOfRequestSend(user){
     return this.http.get('/adminListMeeting?fromUser='+user)
            .map((response: Response) => {
                let data = response.json();
                return data;
     }).catch(this.handleError);         
    }
    getOneRequestSend(id){
        return this.http.get('/adminListMeeting?id='+id)
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
    // -----------------------------------------------------------
    listEvents(user){
        return this.http.get('/adminListMeeting?userType=3&toUser='+user)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError); 
    }
    getOneRequestEvent(user,id){
        return this.http.get('/adminListMeeting?userType=3&toUser='+user+'&id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError); 
    }
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}