import { Component, OnInit} from '@angular/core';
import { HttpService} from '../../app/http.service';
import { CartService } from '../../app/cart.service';
import { RelationService } from '../../app/relations.service';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Response} from '@angular/http';
import { Holiday } from '../../app/holiday';
import { ModalContentPage } from '../../modal/modal';
import { CityPage } from  '../city/city';
import { Cart } from '../../app/cart';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

    holidays: Holiday[] = []
    data: Array<string> = []
    carts: Cart[];

    constructor(public navCtrl: NavController, private httpService: HttpService, public modalCtrl: ModalController, private cartService : CartService, private relationService : RelationService) {
        this.carts = null;
    }

    openModal(characterNum) {
        this.data = [];
        this.data.push(characterNum, 'holiday');
        let modal = this.modalCtrl.create(ModalContentPage, this.data, this.holidays);
        modal.present();
    }

    openCity(item) {
        item.show = !item.show;
        if (!item.show) return;
        this.holidays.forEach(function(item2, i, arr) {
            if (item2 != item){
                item2.show = false;
            }
        });
        this.relationService.setHolidayId(item.id);
        this.cartService.createCart(item.id,'hotel');
        this.navCtrl.push(CityPage);
    }
    
    ngOnInit() {
        this.carts = this.cartService.getCart();
        console.log(this.carts);
        this.httpService.getData('http://10.100.3.68/api/holiday?column=sort&direction=asc&page=1&search_column=id&search_operator=equal_to&search_query_1=&search_query_2=')
            .subscribe((data: Response) => {
                let holidaysList = data.json().model.data;
                for (let index in holidaysList) {
              
                    let holiday = holidaysList[index];
                    this.holidays.push({id: holiday.id, picture: holiday.picture, name: holiday.name, description: holiday.description, video: holiday.video, pictures: holiday.pictures, picture_app: holiday.picture_app, show: false});
                }
            });

   
    }
  
  onLink(url: string) {
      window.open(url);
  }
}
