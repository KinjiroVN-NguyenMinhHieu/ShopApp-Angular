import { Component } from '@angular/core';
import { BlogService } from '../../services/BlogService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { BlogItem } from '../shared/types/productitem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule, NgIf
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  product = new FormGroup ({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  })

  constructor(private blogService: BlogService, private router: Router) {
  }

  get name() {
    return this.product.get('name');
  }

  get price() {
    return this.product.get('price');
  }

  handleAddCart() {
    if (this.name?.hasError('required') || this.price?.hasError('required') ) return;
    const blogItem: BlogItem = {
      id: Math.random(),
      title: String(this.name?.value),
      body: String(this.price?.value),
      author: 'mario'
    }
    this.blogService.postBlog(blogItem).subscribe(({data}: any) => {
      if(data.id) {
        this.router.navigate(['/']); // điều hướng về trang chủ
      }
    })
  }
}
