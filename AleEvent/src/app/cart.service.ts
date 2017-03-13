import { Cart } from './cart';

export class CartService {
    carts: Cart[] = [];

    getCart(): Cart[] {
        return this.carts;
    }

    createCart(entity_id: Number, entity_type: String, item : Array<any>) {
        if (entity_type != 'event') {
            this.carts.forEach(function (element, i, arr) {
                if (element.entity_type === entity_type) {
                    this.carts.splice(i, 1);
                }
            }.bind(this));
        }
        this.carts.push({ entity_id: entity_id, entity_type: entity_type, item: item });
    }

    deleteCart(entity_id: Number, entity_type: String){
            this.carts.forEach(function (element, i, arr) {
                if ((element.entity_type === entity_type) && (entity_id === element.entity_id)) {
                    this.carts.splice(i, 1);
                }
            }.bind(this));
    }
}