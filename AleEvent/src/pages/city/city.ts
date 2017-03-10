import { Component, OnInit} from '@angular/core';
import { HttpService} from '../../app/http.service';
import { CartService } from '../../app/cart.service';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Response} from '@angular/http';
import { City } from '../../app/city';
import {ModalContentPage} from '../../modal/modal';
import {EventPage} from  '../event/event';
import { Cart } from '../../app/cart';
@Component({
    selector: 'page-city',
    templateUrl: 'city.html'
})
export class CityPage {

    cities: City[] = []
    data: Array<string> = []
    carts: Cart[];

    constructor(public navCtrl: NavController, private httpService: HttpService, public modalCtrl: ModalController, private cartService: CartService) {

    }

    openModal(characterNum) {
        this.data = [];
        this.data.push(characterNum, 'city');
        let modal = this.modalCtrl.create(ModalContentPage, this.data, this.cities);
        modal.present();
    }

    ngOnInit() {
        this.carts = this.cartService.getCart();
        console.log(this.carts);
        this.httpService.getData('http://10.100.3.68/api/city?column=sort&direction=asc&page=1&search_column=id&search_operator=equal_to&search_query_1=&search_query_2=')
            .subscribe((data: Response) => {
                let citiesList = data.json().model.data;
                for (let index in citiesList) {
                    let city = citiesList[index];
                    this.cities.push({ picture: city.picture, name: city.name, description: city.description, video: city.video, pictures: city.pictures, status: city.status, show: false});
                }
            });
    }

    openEvent(item) {
        item.show = !item.show;
        if (!item.show) return;
        this.cities.forEach(function(item2, i, arr) {
            if (item2 != item){
                item2.show = false;
            }
        });
        this.cartService.createCart(item.id,'city');
        this.navCtrl.push(EventPage);
    }

    onLink(url: string) {
        window.open(url);
    }
}
