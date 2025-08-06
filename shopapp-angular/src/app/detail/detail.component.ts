import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductItem } from '../shared/types/productitem';
import { BlogService } from '../../services/BlogService';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  id = '';
  productItem: ProductItem = {
    id: 0,
    image: '',
    price: 0,
    name: '',
  };

  constructor(private route: ActivatedRoute, private blogService: BlogService) {
    this.id = String(route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
      this.blogService.getDetailBlog(Number(this.id)).subscribe(({data}: any) => {
        this.productItem.id = data.id;
        this.productItem.image = "assets/images/shoes.jpg";
        this.productItem.name = data.title;
        this.productItem.price = data.body;
      })
  }
}
