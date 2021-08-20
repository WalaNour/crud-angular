import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private ps: ProductService) {}
  products: any = [];
  ngOnInit(): void {
    this.ps.aatini().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }
  insert(data) {
    this.ps.ched(data).subscribe((data) => {
      alert('done');
      this.ngOnInit();
    });
  }
  update(id, data) {
    this.ps.badel(id, data).subscribe((data) => {
      alert('done');
      this.ngOnInit();
    });
  }
  delete(id) {
    this.ps.fasa5(id).subscribe((data) => {
      alert('done');
      this.ngOnInit();
    });
  }
}
