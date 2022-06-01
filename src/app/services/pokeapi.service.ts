import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

const URL_BASE = 'https://pokeapi.co/api/v2';
const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  constructor(private http: HttpClient) { }

  getPokemonById(id: number): Observable<Pokemon> {
    const url =`${URL_BASE}/pokemon/${id}`;
    return this.http.get<Pokemon>(url);
  }

  getPokemonSpeciesById(id: number): Observable<any> {
    const url =`${URL_BASE}/pokemon-species/${id}`;
    return this.http.get<any>(url);
  }

  getPokemonDetailByURL(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getPokemonByName(name: string): Observable<any> {
    const url =`${URL_BASE}/pokemon/${name}`;
    return this.http.get<any>(url)
    .pipe(
      catchError(this.handleError())
    )
  }

  getPokemonList(): Observable<any> {
    const url =`${URL_BASE}/pokemon`;
    return this.http.get<any>(url);
  }

  private handleError() {
    return (error: any): Observable<any> => {
        // console.error(error);
        return of([]);
    }
  }

}


