import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//import { Router } from '@angular/router';

import { UserService, BoardService } from '../_services/index';

import { Task } from '../_models/index';


@Component({
    moduleId: module.id,
    templateUrl: 'board.component.html',
    styleUrls: ['board.component.css']
})

export class BoardComponent implements OnInit{

    users: any[] = [];
    newlistName: string;
    boardId: string = '5a1a81fa52b310469230c1a6';
    board: any;

    dragList: boolean = true;
    setDragList(value): void{
      this.dragList = value;
    }
    constructor(private boardService: BoardService, public userService: UserService, public dialog: MatDialog) {
        
    }

    // constructor(
    //     private router: Router,
    //     private paramMap: ParamMap,
    //     private userService: UserService,
    //     private boardService: BoardService) { }

        //this.router.navigate(['/login']);
    ngOnInit() {
        this.boardId = JSON.parse(localStorage.getItem('currentBoard'));
        this.getBoard();
        this.getAllUsers();
        //console.log(paramMap);
    }

    private getBoard() {
        this.boardService.getBoard(this.boardId).subscribe(board => { this.board = board; });
    }

    private getAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private createlist(board){
        this.boardService.createList(board).subscribe(users => { this.getBoard() });
    }

    private createTask(task){
        this.boardService.createTask(task).subscribe(users => { this.getBoard() });
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(CreateListDialog, {
          width: '50%',
          // data: { name: this.name, animal: this.animal }
          data: { name: this.newlistName, boardId: this.boardId }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          this.newlistName = result;
          console.log(this.newlistName)
          if(result && result.name)
              this.createlist(result)
        });
    }

    addTask(id): void {
        let dialogRef = this.dialog.open(CreateTaskDialog, {
          width: '50%',
          // data: { name: this.name, animal: this.animal }
          data: { listId: id }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          if(result && result.name)
              this.createTask(result)
        });
    }

    taskItemMovedordered(data : any): void{
       console.log(data);
    }

    listItemorder(data: any): void{
      console.log(data);
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
