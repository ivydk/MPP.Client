import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovie } from '../../movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://localhost:8090/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<IMovie[]> {
    console.log('Get movies')
    return this.http.get<IMovie[]>(this.apiUrl);
  }
}
