import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "./../models/storage_keys.config";
import { User } from '../models/user';
import { Despesa } from '../models/despesa';

@Injectable()
export class StorageService {

    getLocalUser(): User {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return new User;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: User) {
        if (obj == null) {
            this.cleanLocalStorageUser();
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getLocalDespesa(): Despesa {
        let ocDespesa = localStorage.getItem(STORAGE_KEYS.localDespesa);
        if (ocDespesa == null) {
            return new Despesa();
        }
        else {
            return JSON.parse(ocDespesa);
        }
    }

    setLocalDespesa(obj: Despesa) {
        if (obj == null) {
            this.cleanLocalStorageDespesa();
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localDespesa, JSON.stringify(obj));
        }
    }

    cleanLocalStorageUser(): void {
        localStorage.setItem(STORAGE_KEYS.localUser, '');
        localStorage.removeItem(STORAGE_KEYS.localUser);
    }

    cleanLocalStorageDespesa(): void {
        localStorage.setItem(STORAGE_KEYS.localDespesa, '');
        localStorage.removeItem(STORAGE_KEYS.localDespesa);
    }

}
