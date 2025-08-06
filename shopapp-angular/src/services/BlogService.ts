import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseData } from "../app/shared/types/responseData";
import { BlogItem, ProductItem } from "../app/shared/types/productitem";

@Injectable({providedIn: 'root'})
export class BlogService {
    constructor(private http: HttpClient) {};

    getBlogs(): Observable<ResponseData<ProductItem[]>> {
       return this.http.get<any>("https://ninedev-api.vercel.app/blogs");
    }

    getDetailBlog(id: number): Observable<ResponseData<ProductItem>> {
        return this.http.get<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
    }

    postBlog(blogItem: BlogItem): Observable<ResponseData<ProductItem>> {
        return this.http.post<any>(`https://ninedev-api.vercel.app/blogs`, blogItem);
    }

    deleteBlog(id: number): Observable<ResponseData<ProductItem>> {
        return this.http.delete<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
    }
}