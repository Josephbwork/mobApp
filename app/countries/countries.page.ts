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
 
  countryName:string = "";
  countryInfo!:any;
  options: HttpOptions = {
    url: "https://restcountries.com/v3.1/name/"
  }

country: any;

  constructor(private router: Router, private ds:ServicesMyDataService, private mhs:ServicesMyHttpService) {}

  ngOnInit() {
    this.getCN();
  }
  
  async getCN(){
    this.countryName = await this.ds.get('cn')
    this.options.url = this.options.url.concat(this.countryName)
    let result = await this.mhs.get(this.options)
    this.countryInfo = result.data
    console.log(JSON.stringify(this.countryInfo))
  }
 
 async openNews(country: any) {
  await this.ds.set("cca2", country.cca2); 

  console.log(this.ds.get('cca2'))
  this.router.navigate(['/news'])
  }
  
}
