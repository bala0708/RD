import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class CategoryService {
    constructor(private http: Http) { } 
    getAll() {
        return this.http.get('/listCategory')
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    getOne(id) {
        return this.http.get('/listCategory?id='+id)
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    create(name){
        return this.http.post('/addCategory',{category_name:name})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    update(name,id){
        return this.http.put('/editCategory?id='+id,{category_name:name})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    delete(id){
        return this.http.put('/deleteCategory?id='+id,{id:id})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    activated(id,status){
        return this.http.put('/activeInactiveCategory?id='+id,{id:id,active:status})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    addProfile(file,id){
        let formData = new FormData();
        formData.append('id', id);
        formData.append('category_image', file); 
        return this.http.put('/addCategoryImage?id='+id,formData)
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    // _____________________________________________
    getAllSub() {
        return this.http.get('/listSubCategory')
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    getOneSub(id) {
        return this.http.get('/listSubCategory?id='+id)
            .map((response: Response) => {
                let data = response.json();
                return data;
            }).catch(this.handleError);
    }
    createSub(name,id){
        return this.http.post('/addSubCategory',{category_id:id,sub_category_name:name})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    updateSub(name,id,catID){
        return this.http.put('/editSubCategory?id='+id,{category_id:catID,sub_category_name:name})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    deleteSub(id){
        return this.http.put('/deleteSubCategory?id='+id,{id:id})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    activatedSub(id,status){
        return this.http.put('/activeInactiveSubCategory?id='+id,{id:id,active:status})
        .map((response: Response) => {
            let data = response.json();
            return data;
        }).catch(this.handleError);
    }
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}