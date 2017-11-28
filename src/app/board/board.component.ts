import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//import { Router } from '@angular/router';

import { UserService, BoardService } from '../_services/index';

import { Task } from '../_models/index';


@Component({
    moduleId: module.id,
    templateUrl: 'board.component.html',
    styleUrls: ['board.component.scss']
})

export class BoardComponent implements OnInit{

    users: any[] = [];
    newlistName: string;
    boardId: string = '5a1a81fa52b310469230c1a6';
    board: any;
    newMember: string;
    loading: boolean = false;

    dragList: boolean = true;
    setDragList(value): void{
      this.dragList = value;
    }
    constructor(private boardService: BoardService, public userService: UserService, public dialog: MatDialog) {
         
    }

    //this.router.navigate(['/login']);
    ngOnInit() {
        this.boardId = JSON.parse(localStorage.getItem('currentBoard'));
        this.getBoard();
        this.getAllUsers();
        //console.log(paramMap);
        this.longpool();
    }

    longpool(): void{
        setInterval(() => { this.checkBoardChange(); }, 30000);
    }

    checkBoardChange(): void{
      
      this.boardService.checkBoardChange({time : this.board.timeStamp, boardId : this.board.id}).subscribe(response => { 
         if(response === "1")
           this.getBoard();
      });
    }

    private getBoard() {
        this.loading = true;
        this.boardService.getBoard(this.boardId).subscribe(board => { 
          this.board = board; 
          this.loading = false;
          for (let item of this.board.lists) {
            for (let task of item.tasklists){
              task.fromlistId = item.id;
            }
          }
        });
    }

    private getAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private createlist(board){
      this.boardService.createList(board).subscribe(response => { 
        this.getBoard();
      });
    }

    private deleteList(listId){
      this.boardService.deleteList({listId : listId, boardId: this.board.id}).subscribe(response => { 
        this.getBoard();
      });
    }

    private createTask(task){
        this.boardService.createTask(task).subscribe(response => { 
          this.getBoard() 
        });
    }

    private deleteTask(task){
        let obj = {
          taskId: task.id,
          boardId: this.board.id,
          listId: task.fromlistId
        }
        this.boardService.deleteTask(obj).subscribe(response => { 
          this.getBoard() 
        });
    }

    saveTask(item){

      let task = {
        id: item.id,
        name: item.name1,
        description: item.description1,
        assignedTo: (item.assignedTo1 && item.assignedTo1.id)?item.assignedTo1.id: item.assignedTo.id
      }

      this.boardService.updateTask(task).subscribe(response => { 
          this.getBoard() 
      });

    }

    editTask(item){
      item.edit = !item.edit;
      if(item.edit){
        item.name1 = item.name;
        item.description1 = item.description;
        item.assignedTo1 = item.assignedTo;
      }
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(CreateListDialog, {
          width: '50%',
          data: { name: this.newlistName, boardId: this.boardId }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.newlistName = result;
          if(result && result.name)
              this.createlist(result)
        });
    }

    saveAll(): void {
      let lboard = {
        id : this.board.id,
        lists: [],
        listIds: []
      }

      for(let list of this.board.lists){
        lboard.listIds.push(list.id);
        let temp = {
          id: list.id,
          tasklists: []
        }
        for (let item of list.tasklists){
          console.log(item)
          temp.tasklists.push(item.id)
        }
        lboard.lists.push(temp);

      }
      console.log(lboard);
      
      this.boardService.saveBoard(lboard).subscribe(response => { this.getBoard() });
    }

    addTask(id): void {
        let dialogRef = this.dialog.open(CreateTaskDialog, {
          width: '50%',
          data: { listId: id }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if(result && result.name)
              this.createTask(result)
        });
    }

    addMember(){
      let data = {
        userId: this.newMember,
        boardId: this.board.id
      }
      this.boardService.addMember(data).subscribe(response => { this.getBoard() });
    }

    removeMember(id : string){
       let data = {
        userId: id,
        boardId: this.board.id
      }
      this.boardService.removeMember(data).subscribe(response => { this.getBoard() }); 
    }

    sortMoveTask(){
      this.saveAll();
    }

    sortMoveTask1(data : any, list: any, index: number): void{

      console.log(list);
      console.log(data,  list.id);
      
      if(list.id === data.fromlistId){
        console.log('sortTask');
        let sortReq = {
          listId : list.id,
          tasklists : [],
          boardId: this.board.id
        }

        for (let item of list.tasklists) {
          sortReq.tasklists.push(item.id)
        }
        console.log(sortReq);

        this.boardService.sortTask(sortReq).subscribe(response => { this.getBoard() });
      }else{

        let sortReq = {
          to : {
              id: list.id,
              tasklists : []
          },
          fromlistId : data.fromlistId,
          id: data.id,
          boardId: this.board.id
        }

        for (let item of list.tasklists) {
          sortReq.to.tasklists.push(item.id)
        }

        console.log(sortReq);

        this.boardService.moveTask(sortReq).subscribe(response => { this.getBoard() });

        /*let sortReq = {
          to : {
              id: list.id,
              tasklists : []
          },
          from : {
              id: data.fromlistId,
              tasklists : []
          }
        }

        for (let item of list.tasklists) {
          sortReq.to.tasklists.push(item.id)
        }

        //console.log(this.board);
        let fromList = this.board.lists
        for( let listitem of fromList){
          if(listitem.id == data.fromlistId ){
            for (let item of listitem.tasklists) {
              sortReq.from.tasklists.push(item.id)
            }
          }
        }

        console.log(sortReq);

        this.boardService.moveTask(sortReq).subscribe(response => { this.getBoard() });*/
      }
    }
    sortList(){
      this.saveAll()
    }
    sortList1(data: any): void{
      console.log(this.board.lists);
      let sortReq = {
        boardId : this.board.id,
        lists : []
      }
      for (let item of this.board.lists) {
        sortReq.lists.push(item.id)
      }
      console.log(sortReq);
      this.boardService.sortList(sortReq).subscribe(response => { this.getBoard() });
    }
}


@Component({
  selector: 'create-List-dialog',
  templateUrl: 'create.list.html',
  styleUrls: [ 'create.list.css']
})
export class CreateListDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     this.data.name = '';
    }

    // sendData(): void {
    //     this.dialogRef.close(this.data);
    // }

    onNoClick(): void {
      this.dialogRef.close();
    }
}


@Component({
  selector: 'create-task-dialog',
  templateUrl: 'create.task.html',
  styleUrls: [ 'create.task.css']
})
export class CreateTaskDialog implements OnInit {

  users: any[] = []; 
   constructor(
    public dialogRef: MatDialogRef<CreateTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) {
      
    }

    ngOnInit() {
        this.userService.getAll().subscribe(users => { 
        console.log(users);
        this.users = users; 
      });
    }

    // sendData(): void {
    //     this.dialogRef.close(this.data);
    // }

      onNoClick(): void {
        this.dialogRef.close();
      }
}
