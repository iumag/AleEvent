﻿import { Component, OnInit} from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
    template: `
<ion-header>
   <ion-toolbar>
   <ion-title style="text-transform: uppercase;">
     <img *ngIf="!modal_item.event" width="24" src="http://10.100.3.68/img/{{entity}}/{{modal_item?.picture}}">
  <img *ngIf="modal_item.event" width="24" src="http://10.100.3.68/img/{{entity}}/{{modal_item?.event.picture}}">
      <span *ngIf="!modal_item.event"> {{modal_item?.name}}</span>
 <span *ngIf="modal_item.event"> {{modal_item?.event.name}}</span>
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
    <div *ngIf="!modal_item.event" [innerHTML]="modal_item?.description"></div>
    <div *ngIf="modal_item.event" [innerHTML]="modal_item?.event.description"></div>
  </ion-card-content>
  
  <ion-slides pager>
<div *ngIf="!modal_item.event"> 
  <ion-slide *ngFor="let picture of modal_item?.pictures">
    <img src="http://10.100.3.68/{{picture?.link}}">
  </ion-slide>
</div>
<div *ngIf="modal_item.event"> 
  <ion-slide *ngFor="let picture of modal_item?.event.pictures">
    <img src="http://10.100.3.68/{{picture?.link}}">
  </ion-slide>
</div>
</ion-slides>
	<iframe src="http://www.youtube.com/embed/Gym1QEsdHI0" frameborder="0" width="100%" height="315"></iframe>
</ion-card>
   
  </ion-list>
</ion-content>
`
})
export class ModalContentPage {
    modal_item;
    entity;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController
    ) {
        var index = this.params.get('0')['charNum'];
        this.entity = this.params.get('1');
        var modal_items = this.params.get('opts');
        this.modal_item = modal_items[index];
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}