import { Injectable} from '@angular/core';


@Injectable()

export class AppServiceService {

  public isLoggedIn: boolean = false;

  public data: any;

  constructor() {

  }


  setIsLoggedIn(data: boolean){
    this.isLoggedIn = data
  }

  getIsLoggedIn(data: boolean){
    return this.isLoggedIn
  }

  settter(data: any) {

    this.data = data;

  }

  getter() {

    return this.data;
  }
}