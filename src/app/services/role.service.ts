import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class RoleService {
    constructor(private http: Http) { }
 
    listRole() {
        return this.http.get('/roleList')
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                return user;
            }).catch(this.handleError);
    }
    viewRole(id){
        return this.http.get('/roleList?id='+id)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let listRole = response.json();
            return listRole;
        }).catch(this.handleError);
    }
    viewUser(id){
        return this.http.get('/listUser?id='+id)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let listUser = response.json();
            return listUser;
        }).catch(this.handleError); 
    }
    addRoleData(roleUser){
        return this.http.post('/addRole', {
            role_name :roleUser.username,
            role_short_name:roleUser.role_short_name,
            role_type:roleUser.type,
            no_of_user:roleUser.no_of_users,
            access:roleUser.access,
            feature_device_access:roleUser.feature_device_access,
        })
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let results = response.json();
            return results;
        }).catch(this.handleError);
    }
    editRoleData(roleUser){
        return this.http.put('/editRole?id='+roleUser.id, {
            role_name :roleUser.role_name,
            role_short_name:roleUser.role_short_name,
            role_type:roleUser.type,
            no_of_user:roleUser.no_of_user,
            access:roleUser.access,
            feature_device_access:roleUser.feature_device_access,
        })
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let results = response.json();
            return results;
        }).catch(this.handleError);
    }
    deleteRoleData(id){
        return this.http.put('/deleteRole?id='+id, {id:id})
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let results = response.json();
            return results;
        }).catch(this.handleError);
    }
    suspendRoleData(id){
        return this.http.put('/activeInactiveRole', {id:id,active:0})
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let results = response.json();
            return results;
        }).catch(this.handleError);
    }
    activeRoleData(id){
        return this.http.put('/activeInactiveRole', {id:id,active:1})
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let results = response.json();
            return results;
        }).catch(this.handleError);
    }    
    deleteUserData(value){
        return this.http.put('/removeUserFromRole',{userId:[value]})
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let results = response.json();
            return results;
        }).catch(this.handleError);
    }
    updateFeature(data){
        var updateData = data;
        return this.http.put('/updateAccessList',{updateData})
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let results = response.json();
            return results;
        }).catch(this.handleError);
    }
    getProfileFeature(id){
        return this.http.get('/profileSettingAccessList?role='+id)
        .map((response: Response) => {        
            let results = response.json();
            return results;
        }).catch(this.handleError); 
    }
    updateProfile(data){
        var updateData = data;
        console.log(data);
        return this.http.put('/profileSettingAccess',{updateData})           
        .map((response: Response) => {        
            let results = response.json();
            return results;
        }).catch(this.handleError); 
    }
    public handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }
}