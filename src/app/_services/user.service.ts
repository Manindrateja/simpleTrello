import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    // API_ENDPOINT:string =  'http://127.0.0.1:5000';

    getAll() {
        // return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
        return this.http.get('http://127.0.0.1:5000/getAllUser', this.jwt()).map((response: Response) => response.json());;
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    //register User
    create(user: User) {
        return this.http.post('http://127.0.0.1:5000/register', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    // private jwt() {
    //     // create authorization header with jwt token
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     if (currentUser && currentUser.token) {
    //         let headers = new Headers({ 'token': currentUser.token });
    //         headers.append( 'Content-Type' : 'application/json',);
    //         let res = new RequestOptions({ headers: headers });
    //         return res;
    //     }
    //     else
    //     {
    //         let headers = new Headers({ 'Content-Type': 'application/json' });
    //         let res = new RequestOptions({ headers: headers });
    //         return res;
    //     }
    // }

    private jwt() {

        let headers = new Headers({ 'Content-Type': 'application/json' });

        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            headers.append( 'token': currentUser.token);
        }
            
        let res = new RequestOptions({ headers: headers });
        return res;
    }
}