import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { ServicesMyDataService } from '../services-my-data.service';
import { ServicesMyHttpService } from '../services-my-http.service';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { settingsOutline, earthOutline } from 'ionicons/icons';

addIcons({
  'settings-outline': settingsOutline,
  'earth-outline': earthOutline,
});

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  imports: [ IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonIcon, IonToolbar, IonButtons, CommonModule, FormsModule, RouterLink]
})

export class NewsPage implements OnInit {
  
  newsInfo: any = [];
  country: string = '';
  options: HttpOptions = {
    url: 'https://newsdata.io/api/1/latest?apikey=pub_6182620d5deadc7e73c0a7ff6b237b6a00533&country=',
  };

  constructor(private mhs: ServicesMyHttpService, private ds: ServicesMyDataService) {}


  ngOnInit() {
    this.countryAndNews();
  }

  async countryAndNews() {
    this.country = await this.ds.get("country");
    await this.newUrl();
    await this.getCountry();
  }

  async getCountry() {
    let result = await this.mhs.get(this.options);
    this.newsInfo = result.data.results;
    console.log(this.newsInfo)
  }

  async newUrl() {
    let cca2 = await this.ds.get("cca2");
    this.options.url = this.options.url.concat(cca2);
    console.log(this.options.url);
  }
}