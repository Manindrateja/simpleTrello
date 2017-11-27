import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class BoardService {
    constructor(private http: Http) { }

    // API_ENDPOINT:string =  'http://127.0.0.1:5000';

    getAllboards() {
        return this.http.get('http://127.0.0.1:5000/getAllBoards', this.jwt()).map((response: Response) => response.json());;
    }

    getBoard(id: string) {
        return this.http.get('http://127.0.0.1:5000/getBoard/' + id, this.jwt()).map((response: Response) => response.json());
    }

    //create Board
    createBoard(board: any) {
        return this.http.post('http://127.0.0.1:5000/createBoard', board, this.jwt()).map((response: Response) => response.json());
    }

    deleteBoard(board: any) {
        return this.http.post('http://127.0.0.1:5000/deleteBoard', board, this.jwt()).map((response: Response) => response.json());
    }


    createList(list: any) {
        return this.http.post('http://127.0.0.1:5000/createList', list, this.jwt()).map((response: Response) => response.json());
    }

    createTask(task: any) {
        return this.http.post('http://127.0.0.1:5000/createTask', task, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    // private jwt() {
    //     // create authorization header with jwt token
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     if (currentUser && currentUser.token) {
    //         let headers = new Headers({ 'token': currentUser.token });
            
    //         headers.append( Content-Type: 'application/json');
            
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