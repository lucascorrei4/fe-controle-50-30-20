import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "./../models/storage_keys.config";
import { User } from "../models/user";
import { Despesa } from "../models/despesa";
import { Lancamento } from "../models/lancamento";
import { Category } from "../models/category";

@Injectable()
export class StorageService {
  getLocalUser(): User {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return new User();
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: User) {
    if (obj == null) {
      this.cleanLocalStorageUser();
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  getLocalDespesa(): Despesa {
    let ocDespesa = localStorage.getItem(STORAGE_KEYS.localDespesa);
    if (ocDespesa == null) {
      return new Despesa();
    } else {
      return JSON.parse(ocDespesa);
    }
  }

  setLocalDespesa(obj: Despesa) {
    if (obj == null) {
      this.cleanLocalStorageDespesa();
    } else {
      localStorage.setItem(STORAGE_KEYS.localDespesa, JSON.stringify(obj));
    }
  }

  getLocalStorageLancamentos(): Lancamento[] {
    let lancamentos = localStorage.getItem(STORAGE_KEYS.localLancamentos);
    if (lancamentos) {
      return JSON.parse(lancamentos);
    } else {
      return [];
    }
  }

  setLocalStorageLancamentos(lancamentos: any): void {
    if (lancamentos) {
      localStorage.setItem(
        STORAGE_KEYS.localLancamentos,
        JSON.stringify(lancamentos)
      );
    } else {
      this.cleanLocalStorageLancamentos();
    }
  }

  getLocalCategories(): Category[] {
    let categories = localStorage.getItem(STORAGE_KEYS.localCategories);
    if (categories) {
      return JSON.parse(categories);
    } else {
      return [];
    }
  }

  setLocalStorageCategories(categories: any): void {
    if (categories) {
      localStorage.setItem(
        STORAGE_KEYS.localCategories,
        JSON.stringify(categories)
      );
    } else {
      this.cleanLocalStorageLancamentos();
    }
  }

  cleanLocalStorageUser(): void {
    localStorage.setItem(STORAGE_KEYS.localUser, "");
    localStorage.removeItem(STORAGE_KEYS.localUser);
  }

  cleanLocalStorageDespesa(): void {
    localStorage.setItem(STORAGE_KEYS.localDespesa, "");
    localStorage.removeItem(STORAGE_KEYS.localDespesa);
  }

  cleanLocalStorageLancamentos(): void {
    localStorage.setItem(STORAGE_KEYS.localLancamentos, "");
    localStorage.removeItem(STORAGE_KEYS.localLancamentos);
  }

  cleanLocalStorageCategories(): void {
    localStorage.setItem(STORAGE_KEYS.localCategories, "");
    localStorage.removeItem(STORAGE_KEYS.localCategories);
  }
}
