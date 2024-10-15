import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMovie } from '../movie';
import { MovieService } from './services/movie.service';
import { filter } from 'rxjs';
import { SortBy } from './enums/sortBy';
import { SortType } from './enums/sortType';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MovieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'imdb.client';

  movies: IMovie[] = [];

  // form with default values
  movieForm = new FormGroup({
    imdb_id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    year: new FormControl(new Date().getFullYear(), Validators.required),
    rating: new FormControl(5.5, Validators.required)
  })

  filterByForm = new FormGroup({
    year: new FormControl(),
    sort: new FormControl(),
    order: new FormControl(),
  })

  sortBy = SortBy;
  sortType = SortType;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    console.log("TEST")

    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
      console.log(data)
    })
  }

  createMovie(movie: IMovie) {
    this.movieService.createMovie(movie).subscribe(data => {
      this.movies.push(movie);
      this.movieForm.reset();
    })
  }

  deleteMovie(imdb_id: string) {
    this.movieService.deleteMovie(imdb_id).subscribe(data => {
      // remove without refreshing the page
      const index = this.movies.findIndex(movie => movie.imdb_id === imdb_id);
      this.movies.splice(index, 1);
    })
  }

  openCreateMovieModal(content: any) {
    this.modalService.open(content, { backdrop: 'static', keyboard: false })
  }

  saveMovie() {
    var movie: IMovie = {
      imdb_id: this.movieForm.controls.imdb_id.value || '',
      title: this.movieForm.controls.title.value || '',
      year: this.movieForm.controls.year.value || new Date().getFullYear(),
      rating: this.movieForm.controls.rating.value || 5.5,
      poster: undefined
    }

    this.createMovie(movie);
  }

  confirmDelete(movie: IMovie) {
    if (confirm("Are you sure to delete " + movie.title)) {
      this.deleteMovie(movie.imdb_id);
    }
  }

  filterBy() {
    console.log("clicked filter button");
    console.log(this.filterByForm.controls.year.value,
      this.filterByForm.controls.sort.value,
      this.filterByForm.controls.order.value)
    this.movieService.getMovies(
      this.filterByForm.controls.year.value,
      Number(this.filterByForm.controls.sort.value),
      Number(this.filterByForm.controls.order.value)
    ).subscribe(data => {
      this.movies = data;
      console.log(this.filterByForm.controls)
    })
  }

  clearFilter() {
    this.filterByForm.reset();
    console.log(this.filterByForm.controls)
    console.log("clicked clear filter");
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    })
  }
}
