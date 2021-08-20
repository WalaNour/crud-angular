import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-tshirts-men",
  templateUrl: "./tshirts-men.component.html",
  styleUrls: ["./tshirts-men.component.css"],
})
export class TshirtsMenComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  listOfItemse: any = JSON.parse(localStorage.getItem("basket")) || [];
  total: number = 0;
  products: any;
  ngOnInit(): void {
    for (let item of this.listOfItemse) {
      this.total = this.total + item.price;
    }
    this.http
      .get(`${environment.URL}/api/products`, {
        responseType: "json",
      })
      .subscribe((data) => {
        this.products = data;
        console.log(data);
      });
  }
  addTobasket(item) {
    this.total = this.total + item.price;
    var basket = JSON.parse(localStorage.getItem("basket")) || [];
    basket.push(item);
    localStorage.setItem("basket", JSON.stringify(basket));
    this.listOfItemse = JSON.parse(localStorage.getItem("basket"));
    Swal.fire("Good job!", "Item added!", "success");
  }
  confirmOrder(username, email, address, number) {
    var order = {
      username,
      email,
      address,
      number,
      order: localStorage.getItem("basket"),
      total: this.total,
    };

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Confirm?",
        text: "do you want to comfirm your order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.http
            .post(`${environment.URL}/api/orders`, order)
            .subscribe((data) => {
              localStorage.setItem("basket", JSON.stringify([]));
              this.listOfItemse = [];
              this.total = 0;
              document.getElementById("add").style.display = "none";
            });
          swalWithBootstrapButtons.fire(
            "we submited your order and you will recieve confermation email!",
            "",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  }

  cancelOrder() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("basket", JSON.stringify([]));
        this.listOfItemse = [];
        document.getElementById("add").style.display = "none";
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  moveTo(to) {
    this.router.navigateByUrl(to);
  }
}
