import { Component, OnInit } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { IMovie } from '../movie';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'imdb.client';

  movies: IMovie[] = [];


  private baseApiUri = 'http://localhost:8090/movies';

  // form with default values
  movieForm = new FormGroup({
    imdb_id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    year: new FormControl(new Date().getFullYear(), Validators.required),
    rating: new FormControl(5.5, Validators.required)
  })

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

  createMovie(movie: IMovie) {
    console.log("create movie")
    return this.http.post<IMovie>(this.baseApiUri, movie).subscribe({
      next: (response) => {
        console.log("Movie created successfully", response);
        // add without refreshing the page
        this.movies.push(response);
        this.movieForm.reset();
      },
      error: (error) => {
        console.error("Error creating movie", error);
      }
    });
  }

  deleteMovie(imdb_id: string) {
    return this.http.delete<IMovie>(this.baseApiUri + '/' + imdb_id).subscribe({
      next: (response) => {
        console.log("Movie deleted successfully", response);
        // remove without refreshing the page
        const index = this.movies.findIndex(movie => movie.imdb_id === imdb_id);
        this.movies.splice(index, 1);
      },
      error: (error) => {
        console.error("Error deleting movie", error);
      }
    });
  }

  openCreateMovieModal(content: any) {
    this.modalService.open(content, { backdrop: 'static', keyboard: false })
  }

  saveMovie() {
    var movie: IMovie = {
      imdb_id: this.movieForm.controls.imdb_id.value || '',
      title: this.movieForm.controls.title.value || '',
      year: this.movieForm.controls.year.value || new Date().getFullYear(),
      rating: this.movieForm.controls.rating.value || 5.5
    }

    this.createMovie(movie);
  }

  confirmDelete(movie: IMovie) {
    if (confirm("Are you sure to delete " + movie.title)) {
      this.deleteMovie(movie.imdb_id);
    }
  }
}
