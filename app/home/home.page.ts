import { Component } from '@angular/core';
import { IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ServicesMyDataService } from '../services-my-data.service';
import { Router , RouterLink } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ RouterLink, IonIcon, IonButton, FormsModule, IonInput, IonHeader, IonToolbar, IonTitle, IonContent],
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