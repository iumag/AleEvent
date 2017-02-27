import { Component, OnInit} from '@angular/core';
import { HttpService} from '../../app/http.service';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Response} from '@angular/http';
import { Holiday } from '../../app/holiday';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    holidays: Holiday[]=[]

    constructor(public navCtrl: NavController, private httpService: HttpService, public modalCtrl: ModalController) {
    
    }

    openModal(characterNum) {
        let modal = this.modalCtrl.create(ModalContentPage, characterNum, this.holidays);
        modal.present();
    }
    
    ngOnInit() {

        this.httpService.getData('http://10.100.3.68/api/holiday?column=sort&direction=asc&page=1&search_column=id&search_operator=equal_to&search_query_1=&search_query_2=')
            .subscribe((data: Response) => {
                let holidaysList = data.json().model.data;
                for (let index in holidaysList) {
              
                    let holiday = holidaysList[index];
                    this.holidays.push({ picture: holiday.picture, name: holiday.name, description: holiday.description, video: holiday.video, pictures: holiday.pictures, picture_app: holiday.picture_app});
                }
            });

   
    }
  
  onLink(url: string) {
      window.open(url);
  }
}

@Component({
    template: `
<ion-header>
  <ion-toolbar>
    <ion-title style="text-transform: uppercase;">
     <img src="http://10.100.3.68/img/holiday/{{holiday?.picture}}">
       {{holiday?.name}}
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
<ion-icon ios="ios-close-circle" md="md-close-circle"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
  
 <div [innerHTML]="holiday.description"></div>
      <ion-item *ngFor="let item of holiday['items']">
        {{item.title}}
        <ion-note item-right>
          {{item.note}}
        </ion-note>
      </ion-item>
  </ion-list>
</ion-content>
`
})
export class ModalContentPage {
   holiday;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController
    ) {
        console.log(this.params.get('opts'));
        var holidays = this.params.get('opts');
        this.holiday = holidays[this.params.get('charNum')];
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}