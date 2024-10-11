import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://localhost:8090/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    console.log('Get movies')
    return this.http.get<Movie[]>(this.apiUrl);
  }
}
