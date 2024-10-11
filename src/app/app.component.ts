import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  movies: any = [];
  selectedMovie!: any;

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

  getMovies(): Observable<any> {
    return this.http.get<any[]>(this.baseApiUri);
  }

  openModal(movie: any, content: any) {
    this.selectedMovie = movie;
    this.modalService.open(content, { backdrop: 'static', keyboard: false })
  }
}
