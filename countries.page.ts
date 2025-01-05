import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { ServicesMyDataService } from '../services-my-data.service';
import { ServicesMyHttpService } from '../services-my-http.service';
import { HttpOptions } from '@capacitor/core';
import { Router , RouterLink } from '@angular/router'


@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, RouterLink, FormsModule]
})

export class CountriesPage implements OnInit {
  //Declare variables
  countryName:string = "";
  countryInfo!:any;
  country: any;
  options: HttpOptions = {
    url: "https://restcountries.com/v3.1/name/" //API endpoint for country name
  }

  //Injects router for nav, ds for data handling and mhs for http requests
  constructor(private router: Router, private ds:ServicesMyDataService, private mhs:ServicesMyHttpService) {}

  ngOnInit() {
    this.getCN();
  }
  
  async getCN(){
    this.countryName = await this.ds.get('cn') //Get country name from storage using DS
    this.options.url = this.options.url.concat(this.countryName) //Concat name to API url
    let result = await this.mhs.get(this.options) //Send http get request using mhs and update API options
    this.countryInfo = result.data //Store gathered country info in countryinfo variable
    console.log(JSON.stringify(this.countryInfo))
  }
 
  //Async method to navigate to news page for a selected country
 async openNews(country: any) { 
  await this.ds.set("cca2", country.cca2); //Save selected countries cca2 code to storage using DS
  console.log(this.ds.get('cca2')) //Log stored cca2 to console
  this.router.navigate(['/news']) //Navigate to news
  }
  

  //Async method to navigate to weather page for a selected country
  async openWeather(country: any) { 
    await this.ds.set("capital", country.capital[0]); 
    await this.ds.set("latlng", country.latlng);
    console.log(this.ds.get('captital'))
    this.router.navigate(['/weather'])
    }
}
