import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { BoardService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
      styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    //boards: <Array> = [];

    newboard: string;


    constructor(private boardService: BoardService, public dialog: MatDialog, private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.getAllboards();
    }

    deleteBoard(id: number) {
        this.boardService.deleteBoard(id).subscribe(() => { this.getAllboards() });
    }

    private getAllboards() {
        this.boardService.getAllboards().subscribe(users => { this.users = users; });
    }

    private createBoard(board){
        this.boardService.createBoard(board).subscribe(users => { this.getAllboards() });
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
     
    }

    sendData(): void {
        this.dialogRef.close(this.data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}