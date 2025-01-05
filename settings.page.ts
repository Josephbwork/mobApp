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

  //Declare variable to store users choice. Set metric as default as required
    selectedUnit: string = "metric";
  

     ngOnInit() {
     this.updateUnit() //Call to get and set the saved unit when component is loaded
    }
  
    async updateUnit() {
      const savedUnit = await this.ds.get("unit") //Gets saved unit from storage using DS
      this.selectedUnit = savedUnit || "metric" //Set retrieved unit or use metric
      console.log("Unit chosen is", this.selectedUnit)
    }
  //Async method to save users chosen unit
    async chosenUnit(option: string) {
      this.selectedUnit = option; //Update selectedUnit with chosen option
      await this.ds.set("selectedUnit", this.selectedUnit) //Save to storage using DS
      console.log("Unit saved is", this.selectedUnit)
    }
  }
