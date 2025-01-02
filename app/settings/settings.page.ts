import { ServicesMyDataService } from '../services-my-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonButtons, IonButton, IonIcon, IonItem, IonLabel} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { settingsOutline, earthOutline } from 'ionicons/icons';

addIcons({
  'settings-outline': settingsOutline,
  'earth-outline': earthOutline,
});

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [ IonContent,IonHeader, IonTitle, IonToolbar, FormsModule, CommonModule, IonButtons, IonRadioGroup, IonRadio, IonButton, IonIcon, RouterLink, IonItem, IonLabel],
})
export class SettingsPage implements OnInit {

  constructor(private ds: ServicesMyDataService) {}

    selectedUnit: string = "metric";
  

     ngOnInit() {
     this.updateUnit()
    }
  
    async updateUnit() {
      const savedUnit = await this.ds.get("unit")
      this.selectedUnit = savedUnit || "metric"
      console.log("Unit chosen is", this.selectedUnit)
    }
  
    async chosenUnit(option: string) {
      this.selectedUnit = option;
      await this.ds.set("selectedUnit", this.selectedUnit)
      console.log("Unit saved is", this.selectedUnit)
    }
  }

  //need to call in weather when weather is built to see choice