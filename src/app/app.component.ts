import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMovie } from '../movie';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'imdb.client';

  movies: IMovie[] = [];
  selectedMovie!: IMovie;

  private baseApiUri = 'http://localhost:8090/movies';

  constructor(
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    console.log("TEST")

    this.getMovies().subscribe((data) => {
      this.movies = data;
      console.log(data)
    })
  }

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.baseApiUri);
  }

  openModal(movie: IMovie, content: any) {
    this.selectedMovie = movie;
    this.modalService.open(content, { backdrop: 'static', keyboard: false })
  }
}
