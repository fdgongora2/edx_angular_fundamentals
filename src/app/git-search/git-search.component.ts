import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service'
import { GitSearch } from '../git-search'

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {

  resultadosBusqueda : GitSearch;
  searchQuery: string='';  

 /*  // Recordad que el parámetro del constructor se convierte en una variable local del objeto
  // es una forma de declararla y asignarle el valor de la llamada */
  constructor(private GitSearchService: GitSearchService) { }

   /* Se ejecuta una vez al iniciarse el componente 
   Como se ejecuta al mostrarse debemos indicarle un valor inicial
   para la búsqueda */

  ngOnInit() {
    this.GitSearchService.gitSearch('angular').then((response) => {
      this.resultadosBusqueda = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

/* al llamarse por haber pinchado el botón se busca el valor del formulario
*/
  gitSearch = () => {
    this.GitSearchService.gitSearch(this.searchQuery).then((response) => {
      this.resultadosBusqueda = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })
  }

}
