import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class HciService {
    constructor(private http: Http) { } 
    getAll() {
        return this.http.get('/listUser?user_type=3')
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
    payMode(data){
        return this.http.post('/acceptRejectPayment',data)
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
     return this.http.get('/adminListMeeting?userType=3&toUser='+user)
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
    // -----------------------------------------------------------
    listPay(user){
        return this.http.get('/ListOfPayment?hci='+user)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError); 
    }
    listOne(id){
        return this.http.get('/ListOfPayment?id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError); 
    }
    createDur(data,user){
        let duration = {
            from_minutes : data.from_minutes,
            to_minutes: data.to_minutes,
            amount: data.amount,
            user:user
        }
        return this.http.post('/addHciDurationAmount',duration)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);  
    }
    updateDur(data,user){
        let duration = {
            from_minutes : data.from_minutes,
            to_minutes: data.to_minutes,
            amount: data.amount,
            user:user
        }
        return this.http.put('/editHciDurationAmount?id='+data.id,duration)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);  
    }
    listUserDuration(id){
        return this.http.get('/listHciDurationAmount?user='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);  
    }
    activeDuration(id,status){
        return this.http.put('/activeInactiveHciDurationAmount?id='+id,{active:status})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);  
    } 
    deleteDuration(id){
        return this.http.put('/deleteHciDurationAmount?id='+id,{id:id})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    getOneDuration(id){
        return this.http.get('/listHciDurationAmount?id='+id)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);  
    }
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}