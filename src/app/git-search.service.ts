import { Injectable, Inject } from '@angular/core';
import { GitSearch } from './git-search';
import { GitUser } from './git-user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs';
/* 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Origin': '*'
  })
};
 */
@Injectable()
export class GitSearchService {
  private cadenahttp: string;

  cachedValues: Array<{
    [query: string]: GitSearch
  }> = [];

  cachedValuesUser: Array<{
    [user: string]: GitUser
  }> = [];


  constructor(private http: HttpClient) {
  
  }

  gitSearch = (query: string, page: number): Promise<GitSearch> => {
  
    let promise = new Promise<GitSearch>((resolve, reject) => {
        if (this.cachedValues[query+page]) {        
            resolve(this.cachedValues[query+page])
        }
        else {                    
          if (page === null)
            {
              this.cadenahttp = query;
            }
            else
            {
              this.cadenahttp = query + '&page=' + page;
            }
            console.log('CADENA ' + this.cadenahttp);

            this.http.get('https://api.github.com/search/repositories?q=' + this.cadenahttp)
            .toPromise()
            .then( (response) => {
                this.cachedValues[query+page] = (response as GitSearch);
                resolve(response as GitSearch)
            }, (error) => {
                reject(error);
            })
        }
    })
    return promise;
  }

  gitSearchUser = (user: string): Promise<GitUser> => {
    let promise = new Promise<GitUser>((resolve, reject) => {
        if (this.cachedValuesUser[user]) {
            resolve(this.cachedValuesUser[user])
        }
        else {
            this.http.get('https://api.github.com/search/users?q=' + user)
            .toPromise()
            .then( (response) => {
                resolve(response as GitUser)
            }, (error) => {
                reject(error);
            })
        }
    })
    return promise;
  }


}