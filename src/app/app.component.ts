import { Component, HostListener} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {TokenStorage} from './core/services/token-storage.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor (
        private router: Router,
        private tokenStorage: TokenStorage
    ) {
        this.redirectoLogin();
    }

    redirectoLogin() {
        this.tokenStorage.clearToken(); 
        this.tokenStorage.getItems('loged').subscribe(res => {
            if(!res){
                this.router.navigate(['/login'])
            }   
        })
    }
   

    @HostListener('window:unload', [ '$event' ])
    unloadHandler(event) {
        this.tokenStorage.clearToken();
        this.tokenStorage.clearItem('loged');
    }

    @HostListener('window:beforeunload', [ '$event' ])
    beforeUnloadHandler(event) {
        this.tokenStorage.clearToken();
       this.tokenStorage.clearItem('loged'); 
    }
 }
