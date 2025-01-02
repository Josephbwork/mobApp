import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { ServicesMyDataService } from '../services-my-data.service';
import { ServicesMyHttpService } from '../services-my-http.service';
import { HttpOptions } from '@capacitor/core';
import { Router , RouterLink } from '@angular/router'

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  imports: [IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class NewsPage implements OnInit {
  
  
  options: HttpOptions = {
    url: "https://newsdata.io/api/1/latest?apikey=pub_63915cb99240dd505d706cc9fcfe0bb9b3b61"
  }

  newsInfo: any = [];



  constructor(private router: Router, private ds:ServicesMyDataService, private mhs:ServicesMyHttpService) {}

 ngOnInit() {
     this.getNews();

 }

 async getNews(){
  var result = await this.mhs.get(this.options)
  this.newsInfo = result.data;

 }
}