import { Component, OnInit } from '@angular/core';
import { GitSearchService } from './git-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponentimplements implements OnInit {

  private GitSearchServiceLocal: GitSearchService; 
  constructor(GitSearchService2: GitSearchService) {
    this.GitSearchServiceLocal = GitSearchService2;

  }

  ngOnInit() {
    this.GitSearchServiceLocal.gitSearch('angular').then( (response) => {
      alert("Total Libraries Found:" + response.total_count);
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }
  title = 'GitHub Browser';
}
