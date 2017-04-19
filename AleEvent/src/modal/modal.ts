import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { CityPage } from '../pages/city/city';
import { HotelPage } from '../pages/hotel/hotel';
import { PhotographerPage } from '../pages/photographer/photographer';
import { TransportPage } from '../pages/transport/transport';
import { EventPage } from '../pages/event/event';
import { HomePage } from '../pages/home/home';
import { RelationService } from '../app/relations.service';

@Component({
  template: `
<ion-header>
   <ion-toolbar>
   <ion-title style="text-transform: uppercase;">
     <img *ngIf="!modal_item.event" width="24" src="https://aleevent.pl/img/{{entity}}/{{modal_item?.picture}}">
  <img *ngIf="modal_item.event" width="24" src="https://aleevent.pl/img/{{entity}}/{{modal_item?.event.picture}}">
      <span *ngIf="!modal_item.event"> {{modal_item?.name}}</span>
 <span *ngIf="modal_item.event"> {{modal_item?.event.name}}</span>
    </ion-title>
    <ion-buttons end>
      <!-- <button (click)="setShow()" ion-button icon-only>
        <img src="https://aleevent.pl/images/shopping-cart%20(1)2.png" *ngIf="!modal_item?.show" width="32" height="32">
         <img src="https://aleevent.pl/images/shopping-cart-verified-symbol.png" *ngIf="modal_item?.show" width="32" height="32">
      </button> !-->
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
    <div *ngIf="!modal_item.event" [innerHTML]="modal_item?.description"></div>
    <div *ngIf="modal_item.event" [innerHTML]="modal_item?.event.description"></div>
  </ion-card-content>
  
  <ion-slides pager *ngIf="!modal_item.event">

  <ion-slide *ngFor="let picture of modal_item?.pictures">
    <img src="https://aleevent.pl/{{picture?.link}}">
  </ion-slide>




</ion-slides>
  <ion-slides pager *ngIf="modal_item.event">



  <ion-slide *ngFor="let picture of modal_item?.event.pictures">
    <img src="https://aleevent.pl/{{picture?.link}}">
  </ion-slide>

</ion-slides>
	<iframe *ngIf="modal_item.video" src="{{modal_item?.video}}" frameborder="0" width="100%" height="315"></iframe>
</ion-card>
   
  </ion-list>
</ion-content>
`
})
export class ModalContentPage {
  modal_item;
  entity;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private relationService: RelationService,
  ) {
    var index = this.params.get('0')['charNum'];
    this.entity = this.params.get('1');
    var modal_items = this.params.get('opts');
    this.modal_item = modal_items[index];
  }

  dismiss() {
    this.viewCtrl.dismiss();
    /*setTimeout(function() {
    if (this.modal_item.show === true) {
      switch (this.entity) {
        case 'holiday':
          this.navCtrl.push(CityPage);
          break;
        case 'city':
          this.navCtrl.push(EventPage);
          break;
        case 'hotel':
          this.navCtrl.push(PhotographerPage);
          break;
        case 'photographer':
          this.navCtrl.push(TransportPage);
          break;
      }
    }
    }.bind(this), 2000);*/
  }

  setShow() {
    this.modal_item.show = !this.modal_item.show;
    //this.relationService.setShowHoliday(this.modal_item, this.modal_item.show)
  }
}