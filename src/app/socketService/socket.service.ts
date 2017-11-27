import { Injectable, NgModule } from '@angular/core';
import { Socket } from 'ng2-socket-io';
 
@Injectable()
export class BoardSocket extends Socket {
 
    constructor() {
        super({ url: 'http://url_one:portOne', options: {} });
    }
 
}