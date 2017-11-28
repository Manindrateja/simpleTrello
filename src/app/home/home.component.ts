import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { BoardService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
      styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    boards: any[] = [];

    newboard: string;


    constructor(private boardService: BoardService, public dialog: MatDialog, private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.getAllboards();
    }

    deleteBoard(id: string) {
        this.boardService.deleteBoard({ boardId : id}).subscribe(() => { this.getAllboards() });
    }

    private getAllboards() {
      this.boardService.getAllboards().subscribe(response => { 
        this.boards = response; 
        for (let item of this.boards){
          item.color = this.getRandomColor();
        }
      });
    }

    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    private createBoard(board){
        this.boardService.createBoard(board).subscribe(response => { this.getAllboards() });
    }

    gotoBoard(board){
      console.log(board);
      localStorage.setItem('currentBoard', JSON.stringify(board.id));
      this.router.navigate(['/board']);
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(CreateBoardDialog, {
          width: '50%',
          // data: { name: this.name, animal: this.animal }
          data: { name: this.newboard }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          this.newboard = result;
          console.log(this.newboard)
          this.createBoard(result)
        });
    }
}


@Component({
  selector: 'create-board-dialog',
  templateUrl: 'create.board.html',
  styleUrls: [ 'create.board.css']
})
export class CreateBoardDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateBoardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
       this.data.name = '';
    }

    sendData(): void {
        this.dialogRef.close(this.data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}