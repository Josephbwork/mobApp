import { Component } from '@angular/core';
import { IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem,IonButtons } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ServicesMyDataService } from '../services-my-data.service';
import { Router, RouterLink } from '@angular/router'
import { addIcons } from 'ionicons';
import { settingsOutline, earthOutline } from 'ionicons/icons';

// put icons as its own service to call from if needed on all pages
addIcons({
  'settings-outline': settingsOutline,
  'earth-outline': earthOutline,
});

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonButton, FormsModule, IonInput, IonHeader, IonToolbar, IonTitle, IonItem, IonContent, IonButtons, IonIcon, RouterLink]
})
export class HomePage {

  countryName: string = ""
  constructor(private router: Router, private ds:ServicesMyDataService) {
}

async openCountries(){
  await this.ds.set("cn", this.countryName);
  this.router.navigate(['/countries'])
}

}