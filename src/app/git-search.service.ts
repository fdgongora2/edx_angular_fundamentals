import { Injectable, Inject } from '@angular/core';
import { GitSearch } from './git-search';
import { GitUser } from './git-user';
import { HttpClient } from '@angular/common/http';
import 'rxjs';

@Injectable()
export class GitSearchService {
  cachedValues: Array<{
    [query: string]: GitSearch
  }> = [];

  cachedValuesUser: Array<{
    [user: string]: GitUser
  }> = [];
  
  constructor(private http: HttpClient) {
      
  }

  gitSearch = (query: string): Promise<GitSearch> => {
    let promise = new Promise<GitSearch>((resolve, reject) => {
        if (this.cachedValues[query]) {
            resolve(this.cachedValues[query])
        }
        else {
            this.http.get('https://api.github.com/search/repositories?q=' + query)
            .toPromise()
            .then( (response) => {
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