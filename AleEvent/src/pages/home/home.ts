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
     <img width="24" src="http://10.100.3.68/img/holiday/{{holiday?.picture}}">
       {{holiday?.name}}
    </ion-title>
    <ion-buttons end>
      <button ion-button icon-only>
        <ion-icon color="aleevent" name="cart"></ion-icon>
      </button>
    </ion-buttons>
    <ion-buttons end>
      <button  (click)="dismiss()" ion-button icon-only>
        <ion-icon name="close"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>

</ion-header>
<ion-content>
  <ion-list>
  <ion-card>

  <ion-card-content>
    <div [innerHTML]="holiday.description"></div>
  </ion-card-content>
  
  <ion-slides pager>

  <ion-slide *ngFor="let picture of holiday.pictures">
    <img src="http://10.100.3.68/{{picture?.link}}">
  </ion-slide>

</ion-slides>
	<iframe src="http://www.youtube.com/embed/Gym1QEsdHI0" frameborder="0" width="100%" height="315"></iframe>
</ion-card>
   
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
        var holidays = this.params.get('opts');
        this.holiday = holidays[this.params.get('charNum')];
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}