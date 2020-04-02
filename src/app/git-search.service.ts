import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient } from '@angular/common/http';
//Cuidado, no se pone toda la ruta pues en la nueva versión da problemas
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  // Array con las últimas consultas realizadas para no enviar
  // peticiones repetidas al servidor. Deberíamos ponerle un tiempo
  // para que pasado se vuelva a pedir al servidor por si han cambiado los datos en remoto

  cachedValues: Array<{
    [query: string]: GitSearch;
  }> = [];

  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  gitSearch = (query: string) => {
    let promise = new Promise((resolve, reject) => {
      if (this.cachedValues[query]) {
        resolve(this.cachedValues[query]);
      } else {
        this.http
          .get('https://api.github.com/search/repositories?q=' + query)
          .toPromise()
          .then(
            response => {
              resolve(response as GitSearch);
            },
            error => {
              reject(error);
            }
          );
      }
    });
    return promise;
  };
}
