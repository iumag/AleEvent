import { Cart, AllSum } from './cart';
import { RelationService } from './relations.service'
import { Injectable } from '@angular/core';
@Injectable()
export class CartService {
    carts: Cart[] = [];
    allSum: AllSum = {allSum: 0};

    constructor(private relation: RelationService) { }

    getCart(): Cart[] {
        return this.carts;
    }

    getAllSum(): AllSum {
        return this.allSum
    }

    createCart(entity_id: Number, entity_type: String, item: Array<any>, name: String) {
        this.allSum.allSum = 0;
        if (item.cost) this.allSum.allSum += +item.cost
        this.carts.forEach(function (element, i, arr) {
            if (entity_type != 'related_event') {
                if (element.entity_type === entity_type) {
                    this.carts.splice(i, 1);
                }
            }
            if (element.item.cost) this.allSum.allSum += +element.item.cost
        }.bind(this));
     
        this.carts.push({ entity_id: entity_id, entity_type: entity_type, item: item, name: name });
    }

    deleteCart(entity_id: Number, entity_type: String) {
        this.carts.forEach(function (element, i, arr) {
            if ((element.entity_type === entity_type) && (entity_id === element.entity_id)) {
                this.allSum.allSum -= +element.item.cost
                this.carts.splice(i, 1);
                switch (entity_type) {
                    case 'related_event':
                        this.relation.setShowEvent(element)
                        break;
                    case 'hotel':
                        this.relation.setShowHotel(element)
                        break;
                    case 'transport':
                        this.relation.setShowTransport(element)
                        break;
                }
            }
        }.bind(this));
    }
}