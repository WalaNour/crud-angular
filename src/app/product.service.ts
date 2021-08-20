import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  aatini() {
    return this.http.get('http://localhost:3000/api/products');
  }
  ched(data) {
    return this.http.post('http://localhost:3000/api/products', data);
  }
  badel(id, data) {
    return this.http.put('http://localhost:3000/api/products/' + id, data);
  }
  fasa5(id) {
    return this.http.delete('http://localhost:3000/api/products/' + id);
  }
}
