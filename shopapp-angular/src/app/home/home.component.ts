import { BlogService } from './../../services/BlogService';
import { ProductItem } from './../shared/types/productitem';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductItemComponent } from '../shared/product-item/productitem.component';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductItemComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  btnName = "Click me"
  clickMessage = "";
  isActive = true;
  isVisible = false;
  getBlogApi: Subscription;

  products: ProductItem[]  = [
    {id: 1, name: 'adidas', price: 5000000, image: 'assets/images/shoes.jpg'},
    {id: 2, name: 'nike', price: 4000000, image: 'assets/images/shoes.jpg'},
    {id: 3, name: 'samba', price: 3000000, image: 'assets/images/shoes.jpg'},
    {id: 4, name: 'thuong dinh', price: 2000000, image: 'assets/images/shoes.jpg'},
    {id: 5, name: 'puma', price: 1000000, image: 'assets/images/shoes.jpg'}
  ]

  constructor(private blogService: BlogService) {
    console.log("Initialize component");
    this.getBlogApi = new Subscription();
  }

  ngOnInit(): void {
    console.log('Initialized component');
    this.getBlogApi = this.blogService.getBlogs()
      .pipe(
        map(({data}) => {
          return data.map((item: any) => {
            return {
              ...item,
              name: item.title,
              price: Number(item.body),
              image: 'assets/images/shoes.jpg'
            };
          }).filter(product => product.price >= 400000);
        }),
      )
      .subscribe((res) => {
        this.products = res;
      });
  }

  ngOnDestroy(): void {
    if (this.getBlogApi) {
      this.getBlogApi.unsubscribe();
      console.log("Get blog Api unsubcrible");
    }
  }

  clickBtn(): void {
    this.clickMessage = "Hello World"
  }

  changeMessage(): void {
    this.clickMessage = "";
  }

  handleDelete(id: number): void {
    this.blogService.deleteBlog(id).subscribe(({data}: any) => {
      if (data == 1) {
        this.products = this.products.filter(item => item.id !== id);
      }
    })
  }
}
