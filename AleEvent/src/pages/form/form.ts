import { Component} from '@angular/core';
import { NgForm} from '@angular/forms';
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

    constructor (private cartService : CartService, public menu: MenuController){
        this.carts = cartService.getCart();
    }

    save(){
        var form = document.querySelector('#form_data');
        var formdata = new FormData(<HTMLFormElement>form);
        axios['post']('http://10.100.3.68/api/basket', formdata)
            .then(function (response) {

            })
            .catch(function(error) {

            });
    }

     openMenu() {
        this.menu.open();
    }
}