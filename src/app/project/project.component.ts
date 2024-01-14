import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  newsIds: any;
  newsArray: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.callApi()
  }

  callApi() {
    this.http.get("https://hacker-news.firebaseio.com/v0/jobstories.json")
      .subscribe((data: any) => {
        // Handle the response data here
        this.newsIds = data;
        this.callNewsApi()
      });
  }

  callNewsApi() {
    this.newsIds.forEach((id: any) => {
      console.log("id", id);
      this.http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).subscribe((news: any) => {
        // console.log(news);
        this.newsArray.push(news);
      });
    });
    console.log(this.newsArray);
    
  }

}
