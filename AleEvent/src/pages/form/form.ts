import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartService } from '../../app/cart.service';
import { Cart } from '../../app/cart';
import axios from 'axios'
import { MenuController, AlertController } from 'ionic-angular';
@Component({
    selector: 'page-form',
    templateUrl: 'form.html'
})

export class FormPage {
    carts: Cart[] = []

    constructor(private cartService: CartService, public menu: MenuController, public alertCtrl: AlertController) {
        this.carts = cartService.getCart();
    }

    save() {
        var form = document.querySelector('#form_data');
        var formdata = new FormData(<HTMLFormElement>form);
        axios['post']('https://aleevent.pl/api/basket/', formdata)
            .then(function (response) {
                let alert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'Success',
                    buttons: ['OK']
                });
                alert.present();

            })
            .catch(function (error) {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Пожалуйста, обратитесь к администратору',
                    buttons: ['OK']
                });
                alert.present();
            }.bind(this));
    }

    openMenu() {
        this.menu.open();
    }
}