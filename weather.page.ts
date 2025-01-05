import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { ServicesMyDataService } from '../services-my-data.service';
import { ServicesMyHttpService } from '../services-my-http.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [RouterLink, IonIcon, IonButton, IonButtons,  IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardContent, IonCardTitle,],
})

export class WeatherPage implements OnInit {


  weatherInfo: any = [];
  capital: string = "Unknown Capital";
  weatherIconUrl: string = "";
  unit: string = 'metric';
  apiKey: string = 'e0f7278a7c38090e5ccfb29c01bd4130';
  options: HttpOptions = { 
          url: 'https://api.openweathermap.org/data/2.5/weather?'
        };
  displayWeather: boolean = false;

  constructor(private mhs: ServicesMyHttpService, private ds: ServicesMyDataService) {}

  ngOnInit() {
    this.initWeather();
  }
  
  async initWeather() {

      const savedUnit = await this.ds.get('selectedUnit'); //Get selected unit 
      this.unit = savedUnit || 'metric'; //Or metric if none selected
  
      const savedCapital = await this.ds.get('capital'); 
      this.capital = savedCapital || 'Unknown Capital'; //Or unkown capital if not found
  
      const latlng = await this.ds.get('latlng'); 
      if (latlng && latlng.length === 2) { //Make sure latlng has 2 elements
      const [lat, lon] = latlng;

      //Weather API URL with the lat/lng and selected unit (Using openweathermap.org)
      this.options.url = `${this.options.url}lat=${lat}&lon=${lon}&units=${this.unit}&appid=${this.apiKey}`;
  
      await this.getWeatherInfo(); //Get weatherinfo and display
      this.displayWeather = true;
      } else {
        console.error('Lat & long invalid'); 
      }

    }
  
  async getWeatherInfo() {

      const result = await this.mhs.get(this.options); //Get weather data using options
    
      if (!result?.data) { //Error if result is undefined or empty
        console.error('No weather info avaialble');
        return;
      }

      this.weatherInfo = result.data; //Save the weather data
    
      //Get the weather icon (if available) and build the icon URL
      const weatherIcon = this.weatherInfo.weather?.[0]?.icon;
      this.weatherIconUrl = weatherIcon 
        ? `https://openweathermap.org/img/wn/${weatherIcon}@2x.png` 
        : '';
    }
}

