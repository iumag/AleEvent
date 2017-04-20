import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartService } from '../../app/cart.service';
import { Cart } from '../../app/cart';
import axios from 'axios'
import { MenuController, AlertController } from 'ionic-angular';
import { HttpService } from "../../app/http.service";
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
@Component({
    selector: 'page-form',
    templateUrl: 'form.html'
})

export class FormPage {
    carts: Cart[] = []

    constructor(private httpService: HttpService, private cartService: CartService, public menu: MenuController, public alertCtrl: AlertController) {
        this.carts = cartService.getCart();
    }

    save() {
        var form = document.querySelector('#form_data');
        var formdata = new FormData(<HTMLFormElement>form);
        var data = {
            'FIO' : 'test',
            'email' : 'email'
        }
       this.httpService.postData('https://www.aleevent.pl/api/basket', formdata)
            .subscribe((data: Response) => {
                let saved = data.json().saved;
                if (saved) {
                    let alert = this.alertCtrl.create({
                        title: 'Success',
                        subTitle: 'Success',
                        buttons: ['OK']
                    });
                    alert.present();
                }
           },
           (error: any)=> {
                  let alert = this.alertCtrl.create({
                   title: 'Error',
                   subTitle: 'Пожалуйста, обратитесь к администратору',
                   buttons: ['OK']
               });
               alert.present();
           })
          
         /*   axios['post']('https://www.aleevent.pl/api/basket', formdata)
                .then(function (response) {
                    let alert = this.alertCtrl.create({
                        title: 'Success',
                        subTitle: 'Success',
                        buttons: ['OK']
                    });
                    alert.present();
    
                })
                .catch(function (error) {
                    console.log('test');
                    console.log(error);
                    let alert = this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Пожалуйста, обратитесь к администратору',
                        buttons: ['OK']
                    });
                    alert.present();
                }.bind(this));*/
    }

    openMenu() {
        this.menu.open();
    }
}