import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CurrencyPipe } from '../../shared/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../../shared/pipes/UpperCasePipe.pipe';
import { RouterLink } from '@angular/router';
import { ProductItem } from '../types/productitem';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    CurrencyPipe,
    UpperCasePipe, 
    NgClass,
    NgIf,
    RouterLink
  ],
  templateUrl: './productitem.component.html',
  styleUrl: './productitem.component.css'
})
export class ProductItemComponent implements OnChanges {
    @Input() products: ProductItem[] = [];

    @Output() dataEvent = new EventEmitter<number>();

    ngOnChanges(changes: SimpleChanges): void {
      console.log(changes['products'].currentValue);
      console.log(changes['products'].previousValue);
    }

    get totalPrice(): string {
      const sum = this.products.reduce((total, item) => {
        return total + item.price;
      }, 0);
      return `Total price: ${sum}`;
    }

    handleDelete = (id: number) => {
        this.dataEvent.emit(id);
    }
}