import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    baseURL =  'http://localhost:8090/api/';

    constructor() {}

    getLoginURL() {
        return this.baseURL + 'auth/signin';
    }

    getSignupURL() {
        return this.baseURL + 'auth/signup';
    }

    getUpdatePasswordURL() {
        return this.baseURL + 'password/update';
    }

    getUserURL() {
        return this.baseURL + 'user/getUserInfo';
    }

    getAllUserURL() {
        return this.baseURL + 'user/all';
    }

    getAllUsersURL() {
        return this.baseURL + 'user/allUsers';
    }

    getProfileUpdateURL() {
        return this.baseURL + 'profile/updateInfo';
    }

    getImageUpdateURL() {
        return this.baseURL + 'profile/updateImage';
    }

    getCreateRendezVousURL() {
        return this.baseURL + 'rendezVous/create';
    }

    getDeleteRendezVousURL() {
        return this.baseURL + 'rendezVous/delete';
    }

    getDeleteUserURL(){
        return this.baseURL + 'user/delete'
    }

    getMyRendezVousURL() {
        return this.baseURL + 'rendezVous/my';
    }

    getAllRendezVousURL() {
        return this.baseURL + 'rendezVous/all';
    }

    getRendezVousURL() {
        return this.baseURL + 'rendezVous';
    }

    getAllEtablissementsURL() {
        return this.baseURL + 'etablissement/all';
    }

    getEtablissementURL() {
        return this.baseURL + 'etablissement';
    }
}
