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

//Seperate this in next edit
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
  options: HttpOptions = { //HttpOptions object stores API request
    url: 'https://newsdata.io/api/1/latest?apikey=pub_6182620d5deadc7e73c0a7ff6b237b6a00533&country=',
  }; //API endpoint gets news with placeholder for country code (newsdata.io/enpoints)

  //Inject mhs for http requests and ds for data handling
  constructor(private mhs: ServicesMyHttpService, private ds: ServicesMyDataService) {}


  ngOnInit() {
    this.countryAndNews(); //Method to initialise country and get news
  }
 //Can't async ngOnInit directly so call here
  async countryAndNews() {
    this.country = await this.ds.get("country"); //Get country from storage using DS 
    await this.newUrl(); //Update API URL with country name
    await this.getCountry(); //Get news info for named country
  }
 //Method to get news from API
  async getCountry() {
    let result = await this.mhs.get(this.options); //Send http get request using mhs and updated API options
    this.newsInfo = result.data.results; //Store the gathered news info in newsinfo variable
    console.log(this.newsInfo) //Log updated API
  }

  async newUrl() {
    let cca2 = await this.ds.get("cca2"); //Get cca2 from storage using DS
    this.options.url = this.options.url.concat(cca2); //Concat cca2 to API url
    console.log(this.options.url); //log updated API url to console
   }
}
