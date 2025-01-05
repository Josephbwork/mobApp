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
  
  newsInfo: any = []; //To store gathered news info
  country: string = ''; //To store country 
  noNews: string = ''; //No news message if no news
  options: HttpOptions = { //HttpOptions object stores API request
    url: 'https://newsdata.io/api/1/latest?apikey=pub_6182620d5deadc7e73c0a7ff6b237b6a00533&country=',
  }; //API endpoint gets news with placeholder for country code (newsdata.io/enpoints)

  //Inject mhs for http requests and ds for data handling
  constructor(private mhs: ServicesMyHttpService, private ds: ServicesMyDataService) {}
  

  ngOnInit() {
    this.countryAndNews(); 
  }

  async countryAndNews() {
    try {
      //Get country name and code from storage
      this.country = await this.ds.get('cn') || 'Unknown Country';
      const cca2 = await this.ds.get('cca2');

      if (cca2) {
        await this.newUrl(cca2); //Update api url with the country code
        await this.getCountry(); 
      } else {
        console.error('No cca2 found');
        this.noNews = `No News found for ${this.country}`;
      }
    } catch (error) {
      console.error('Error initialising country and news:', error);
      this.noNews = 'Error getting news information';
    }
  }

  //Update the api url with the country code
  async newUrl(cca2: string) {
    this.options.url += cca2; //Append country code to api url
    console.log('Updated API URL:', this.options.url);
  }

  //Get news data from the API
  async getCountry() {
    try { 
      const result = await this.mhs.get(this.options);
      this.newsInfo = result.data?.results || []; //Store news or give an empty array
      
      if (!this.newsInfo.length) {
        this.noNews = `No News found for ${this.country}`;
      } else {
        this.noNews = ''; //Clear no news message if found
      }
    } catch (error) {
      console.error('Error getting news:', error);
      this.noNews = 'Error getting news information';
    }
  }
}