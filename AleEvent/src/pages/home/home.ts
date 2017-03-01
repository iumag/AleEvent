import { Component, OnInit} from '@angular/core';
import { HttpService} from '../../app/http.service';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Response} from '@angular/http';
import { Holiday } from '../../app/holiday';
import {ModalContentPage} from '../../modal/modal';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    holidays: Holiday[] = []
    data: Array<string> = []

    constructor(public navCtrl: NavController, private httpService: HttpService, public modalCtrl: ModalController) {
    
    }

    openModal(characterNum) {
        this.data = [];
        this.data.push(characterNum, 'holiday');
        let modal = this.modalCtrl.create(ModalContentPage, this.data, this.holidays);
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
