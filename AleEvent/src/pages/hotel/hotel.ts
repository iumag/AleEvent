import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { CartService } from '../../app/cart.service';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Response } from '@angular/http';
import { Hotel } from '../../app/hotel';
import { ModalContentPage } from '../../modal/modal';
import { Cart } from '../../app/cart';
@Component({
    selector: 'page-hotel',
    templateUrl: 'hotel.html'
})

export class HotelPage {
    hotels: Hotel[] = [];
    data: Array<string> = []
    carts: Cart[];

    constructor(public navCtrl: NavController, private httpService: HttpService, public modalCtrl: ModalController, private cartService: CartService) {
    }

    openModal(characterNum) {
        this.data = [];
        this.data.push(characterNum, 'hotel');
        let modal = this.modalCtrl.create(ModalContentPage, this.data, this.hotels);
        modal.present();
    }

     ngOnInit() {
        this.carts = this.cartService.getCart();
        this.httpService.getData('http://10.100.3.68/api/hotel?column=sort&direction=asc&page=1&search_column=city_id&search_operator=equal_to&search_query_1=2&search_query_2=')
            .subscribe((data: Response) => {
                let hotelsList = data.json().model.data;
                for (let index in hotelsList) { 
                    let hotel = hotelsList[index];
                    this.hotels.push({id : hotel.id,  cost: hotel.cost, name: hotel.name, picture: hotel.picture, description: hotel.description, video: hotel.video, pictures: hotel.pictures, show:false });
                }
            });
    }

    openTransport(item){
         item.show = !item.show;
        if (!item.show) return;
        this.hotels.forEach(function(item2, i, arr) {
            if (item2 != item){
                item2.show = false;
            }
        });
        this.cartService.createCart(item.id,'hotel');
        //this.navCtrl.push(EventPage);
    }

}