import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from '../../movie';
import { SortBy } from '../enums/sortBy';
import { SortType } from '../enums/sortType';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://localhost:8090/movies';

  constructor(private http: HttpClient) { }

  getMovies(year?: number, sortBy?: SortBy, sortType?: SortType): Observable<IMovie[]> {
    var uriQuery = "";

    console.log(`Year: ${year}`)
    console.log(`Sort by: ${sortBy}`)
    console.log(`Sort type: ${sortType}`)

    if (year != null) {
      uriQuery += "year=" + year;
    }

    if (sortBy != null && sortType != null) {
      if (uriQuery.length >= 1) {
        uriQuery += "&"
      }
      switch (sortBy) {
        case SortBy.Rating:
          console.log('rating')
          uriQuery += "sort=rating";
          break;
        case SortBy.Year:
          console.log('year')
          uriQuery += "sort=year";
          break;
      }

      uriQuery += "&"

      switch (sortType) {
        case SortType.ASC:
          uriQuery += "order=asc"
          break;
        case SortType.DESC:
          uriQuery += "order=desc"
          break
      }
    }

    if (uriQuery.length >= 1) {
      uriQuery = "?" + uriQuery;
    }

    console.log(`uri: ${uriQuery}`);

    return this.http.get<IMovie[]>(this.apiUrl + uriQuery);
  }

  createMovie(movie: IMovie): Observable<any> {
    console.log("create movie")
    return this.http.post<IMovie>(this.apiUrl, movie)
  }

  deleteMovie(imdb_id: string): Observable<any> {
    return this.http.delete<IMovie>(this.apiUrl + '/' + imdb_id)
  }
}
