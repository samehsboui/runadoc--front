import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    languageChanged: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private authService: AuthService) {}

    setLanguage() {
        this.languageChanged.next (true);
    }

    getCurrentUser() {
        return this.authService.currentUser;
    }
}
