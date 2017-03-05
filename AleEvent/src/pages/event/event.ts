import { Component, OnInit} from '@angular/core';
import { HttpService} from '../../app/http.service';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Response} from '@angular/http';
import { Event } from '../../app/event';
import {ModalContentPage} from '../../modal/modal';
@Component({
    selector: 'page-event',
    templateUrl: 'event.html'
})
export class EventPage {

    events: Event[] = []
    data: Array<string> = []

    constructor(public navCtrl: NavController, private httpService: HttpService, public modalCtrl: ModalController) {

    }

    openModal(characterNum) {
        this.data = [];
        this.data.push(characterNum, 'event');
        let modal = this.modalCtrl.create(ModalContentPage, this.data, this.events);
        modal.present();
    }

    ngOnInit() {

        this.httpService.getData('http://10.100.3.68/api/related_event?per_page=10000&column=sort&direction=asc&page=1&search_column=city_id&search_operator=equal_to&search_query_1=2&search_query_2=&search_query_3=7&search_column2=holiday_id')
            .subscribe((data: Response) => {
                let eventsList = data.json().model.data;
                for (let index in eventsList) { 
                    let city = eventsList[index];
                    this.events.push({ city: city.city, city_id: city.city_id, cost: city.cost, event: city.event, event_id: city.event_id, holiday: city.holiday, holiday_id: city.holiday_id });
                }
            });
    }

    onLink(url: string) {
        window.open(url);
    }
}
