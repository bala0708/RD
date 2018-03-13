import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class ClientService {
    constructor(private http: Http) { }
 
    listClients() {
        return this.http.get('/companyBrandList')
            .map((response: Response) => {
                let user = response.json();
                return user;
            }).catch(this.handleError);
    }
    listClientsData(page){
        return this.http.get('/companyBrandList?page='+page+'&limit=3')
        .map((response: Response) => {
            let user = response.json();
            return user;
        }).catch(this.handleError);
    }
    viewProducts(value){
        return this.http.get('/companyBrandList?id='+value)
        .map((response: Response) => {
            let user = response.json();
            return user;
        }).catch(this.handleError);
    }
    addClients(brandName){
        return this.http.post('/addCompanyBrand', {
            brand_name :brandName.brand_name_new
        })
        .map((response: Response) => {
            let results = response.json();
            if(results.apiStatus==true){
                var id =results.result.id;
                return results;
            }
        }).catch(this.handleError);
    }
    addProducts(data,brand){
        return this.http.post('/addProduct', {
            product_name :data.product_name_new,
            brand: brand
        })
        .map((response: Response) => {
            let results = response.json();
            if(results.apiStatus==true){
                var id =results.result.id;
                return results;
            }
        }).catch(this.handleError);
    }
    addClientImage(id,brandImage){
        let formData = new FormData();
        // formData.append(brandImage);
        formData.append('id', id);
        formData.append('brand_image', brandImage); 
        return this.http.put('/addBrandImage?id='+id,formData)
        .map((response: Response) => {
            console.log(response);
            let brand = response.json();
            return brand;
        }).catch(this.handleError);
    }
    addProductImage(id,productImage){
        let formData = new FormData();
        // formData.append(brandImage);
        //formData.append('product', id);
        formData.append('product_image', productImage); 
        return this.http.post ('/addProductImage?product='+id,formData)
        .map((response: Response) => {
            console.log(response);
            let brand = response.json();
            return brand;
        }).catch(this.handleError);
    }
    addProductStatutory(id,productDocs){

        console.log(productDocs);
        let formData = new FormData();
        // formData.append(brandImage);
        formData.append('product', id);
        formData.append('product_statutory', productDocs); 
        return this.http.post ('/addProductStatutory',formData)
        .map((response: Response) => {
            console.log(response);
            let brand = response.json();
            return brand;
        }).catch(this.handleError);
    }
    deleteClients(id){
        return this.http.put('/deleteCompanyBrand?id='+id,{id:id})
        .map((response: Response) => {
            let deleteData = response.json();
            return deleteData;
        }).catch(this.handleError);
    }
    productsList(products){
        let id = products;
        return this.http.get('/productList?id='+id)
        .map((response: Response) => {
            let deleteData = response.json();
            return deleteData;
        }).catch(this.handleError);
    }
    suspendProduct(id,type){
        return this.http.put('/activeInactiveProduct?id='+id+'&active='+type,{id:id,active:type})
        .map((response: Response) => {
            let deleteData = response.json();
            return deleteData;
        }).catch(this.handleError);
    }
    suspendClient(id,type){
        return this.http.put('/activeInactiveCompanyBrand?id='+id+'&active='+type,{id:id,active:type})
        .map((response: Response) => {
            let deleteData = response.json();
            return deleteData;
        }).catch(this.handleError);
    }
    viewClients(id){
        return this.http.get('/companyBrandList?id='+id)
        .map((response: Response) => {
            let deleteData = response.json();
            return deleteData;
        }).catch(this.handleError);
    }
    deleteProduct(id){
         return this.http.put('/deleteProduct?id='+id,{id:id})
        .map((response: Response) => {
            let deleteData = response.json();
            return deleteData;
        }).catch(this.handleError);
    }
    removeProduct(id){
         return this.http.put('/deleteProductStatutory?id='+id,{id:id})
        .map((response: Response) => {
            let deleteData = response.json();
            return deleteData;
        }).catch(this.handleError);
    }
    suspendTopic(id,type){
        return this.http.put('/activeInactiveCompanyBrand?id='+id+'&active='+type,{id:id,active:type})
        .map((response: Response) => {
            let deleteData = response.json();
            return deleteData;
        }).catch(this.handleError);
    }
    updateClient(id,data){
        let ids = id;
        console.log(data);
        return this.http.put('/editCompanyBrand?id='+ids,{id:ids,brand_name:data.brand_name})
        .map((response: Response) => {
            let deleteData = response.json();
            return deleteData;
        }).catch(this.handleError);
    }
    editProductsData(id,fromdata){
        console.log(fromdata);
        let data = {
            product_desc:fromdata.product_desc,
            product_name : fromdata.product_name,
            id : id,
        }
        return this.http.put('/editProduct?id='+id,data)
        .map((response: Response) => {
            let returnData = response.json();
            return returnData;
        }).catch(this.handleError);
    }
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}