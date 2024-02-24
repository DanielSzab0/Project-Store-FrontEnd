import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../../models/Item";
import {ItemService} from "../../services/item.service";
import {CartService} from "../../services/cart.service";
import {ActivatedRoute} from "@angular/router";
import {DashboardComponent} from "../dashboard.component";

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent {
  @Input("showAdmin") showAdmin: boolean = false;
  @Input("showAddToCart") showAddToCart: boolean = true;
  @Output() changeData: EventEmitter<Item> = new EventEmitter<Item>();

  itemsList: Array<Item> = [];

  constructor(private movieService: ItemService, private cartService: CartService, private route: ActivatedRoute ) {
  }

  isDashboardPage(): boolean {
    return this.route.component === DashboardComponent;
  }

  ngOnInit() {
    this.movieService.getItemList().subscribe((itemsList: Array<Item>) => {
      this.itemsList = itemsList;
    });
    if (this.isDashboardPage()) {
      this.showAddToCart = false;
    }
  }

  onDelete(item: Item): void {
    console.log(item);
    // movie.id! => ! ii spune compilatorului ca proprietatea "id" este diferita de null.
    this.movieService.deleteItem(item.id!);
  }

  onEdit(item: Item): void {
    console.log("item list on edit")
    console.log(item);
    this.changeData.emit(item);
  }

  onAddToCart(item: Item): void {
    console.log("item was added to cart")
    console.log(item)
    this.cartService.addToCart(item);
  }
}
