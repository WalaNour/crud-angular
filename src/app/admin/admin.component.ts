import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  products: any;
  crud: any = false;
  orders: any = false;
  dataOrders: any;
  oneOrder: any;
  list: any;
  ngOnInit(): void {
    this.http
      .get(`${environment.URL}/api/products`, {
        responseType: "json",
      })
      .subscribe((data) => {
        this.products = data;
        console.log(data);
      });
    this.http
      .get(`${environment.URL}/api/orders`, {
        responseType: "json",
      })
      .subscribe((data) => {
        this.dataOrders = data;
        console.log(data);
      });
  }
  toggle(option) {
    if (option) {
      this.crud = true;
      this.orders = false;
    } else {
      this.orders = true;
      this.crud = false;
    }
  }
  add(name, desription, image, price, number) {
    var product = { name, desription, image, price, number };
    this.http
      .post(`${environment.URL}/api/products`, product, {
        responseType: "json",
      })
      .subscribe((data) => {
        alert("done");
        this.ngOnInit();
        this.crud = true;
      });
  }
  update(name, desription, image, price, number, id) {
    var product = { name, desription, image, price, number };
    this.http
      .put(`${environment.URL}/api/products/${id}`, product, {
        responseType: "json",
      })
      .subscribe((data) => {
        alert("done");
        this.ngOnInit();
        this.crud = true;
      });
  }
  delete(id) {
    this.http
      .delete(`${environment.URL}/api/products/${id}`, {
        responseType: "json",
      })
      .subscribe((data) => {
        alert("done");
        this.ngOnInit();
        this.crud = true;
      });
  }
  deleteOrder(id) {
    this.http
      .delete(`${environment.URL}/api/orders/${id}`, {
        responseType: "json",
      })
      .subscribe((data) => {
        alert("done");
        this.ngOnInit();
        this.orders = true;
      });
  }
  fullOrder(order) {
    console.log(JSON.parse(order.order));
    this.oneOrder = order;
    this.list = JSON.parse(order.order);
    document.getElementById("newsletter").style.display = "block";
  }
}
