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

    deleteList(list: any) {
        return this.http.post('http://127.0.0.1:5000/deleteList', list, this.jwt()).map((response: Response) => response.json());
    }

    createTask(task: any) {
        return this.http.post('http://127.0.0.1:5000/createTask', task, this.jwt()).map((response: Response) => response.json());
    }

    deleteTask(task: any) {
        return this.http.post('http://127.0.0.1:5000/deleteTask', task, this.jwt()).map((response: Response) => response.json());
    }

    updateTask(task: any) {
        return this.http.post('http://127.0.0.1:5000/updateTask', task, this.jwt()).map((response: Response) => response.json());
    }

    sortList(data: any){
        return this.http.post('http://127.0.0.1:5000/sortList', data, this.jwt()).map((response: Response) => response.json());
    }

    sortTask(data: any){
        return this.http.post('http://127.0.0.1:5000/sortTask', data, this.jwt()).map((response: Response) => response.json());
    }

    moveTask(data: any){
        return this.http.post('http://127.0.0.1:5000/moveSortTask', data, this.jwt()).map((response: Response) => response.json());
    }

    saveBoard(data: any){
        return this.http.post('http://127.0.0.1:5000/saveBoard', data, this.jwt()).map((response: Response) => response.json());
    }

    addMember(data: any){
        return this.http.post('http://127.0.0.1:5000/addMember', data, this.jwt()).map((response: Response) => response.json());   
    }

    removeMember(data: any){
        return this.http.post('http://127.0.0.1:5000/removeMember', data, this.jwt()).map((response: Response) => response.json());   
    }

    checkBoardChange(data: any){
        return this.http.post('http://127.0.0.1:5000/checkBoardChange', data, this.jwt()).map((response: Response) => response.json());   
    }

    private jwt() {

        var headers = new Headers({ 'Content-Type': 'application/json' });

        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            headers.append( 'token', currentUser.token);
        }
            
        let res = new RequestOptions({ headers: headers });
        return res;
    }
}