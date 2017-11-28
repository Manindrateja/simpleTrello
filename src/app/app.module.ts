import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

//Socket imports
// import { SocketIoModule, SocketIoConfig } from 'ng2-socket-io';
// import { BoardSocket } from './socketService/index';
// const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

// Material imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
//import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
//import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
//import {MatToolbarModule} from '@angular/material/toolbar';

//Drag and drop module
import { DndModule } from 'ng2-dnd';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, BoardService } from './_services/index';
import { HomeComponent, CreateBoardDialog } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { NavbarComponent } from './navbar/index';
import { MultiSortableComponent } from './_multisort/index';
import { BoardComponent, CreateListDialog, CreateTaskDialog } from './board/index';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        BrowserAnimationsModule,

        //socket imports
        //SocketIoModule.forRoot(config),

        // import d&d module
        DndModule.forRoot(),
        //Material Elements imports
        MatButtonModule, 
        MatCheckboxModule,
        MatGridListModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatExpansionModule
        //MatToolbarModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        CreateBoardDialog,//create Board
        LoginComponent,
        RegisterComponent,
        NavbarComponent,
        MultiSortableComponent,
        BoardComponent,
        CreateListDialog,//create List dialog
        CreateTaskDialog
    ],
    entryComponents: [
        CreateBoardDialog,
        CreateListDialog,
        CreateTaskDialog
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        BoardService,

        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions


        //socket services
        //BoardSocket
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    bootstrap: [AppComponent]
})

export class AppModule { }