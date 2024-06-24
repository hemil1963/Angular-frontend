import { Component, OnInit } from '@angular/core';
import { Cart, Order } from '../../models/dataTypes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartConfirmationDialogComponent } from '../cart-confirm/cart-confirm.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  public cart: Cart[] | undefined
  public totalPrice: number | undefined
  public addressForm : FormGroup
  constructor(private fb: FormBuilder, private shopService: ShopService, private router: Router,public dialog: MatDialog) { 
    this.addressForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[6789][0-9]{9}$')],],
      paymentMethod: ['cash']
    })
  }


  ngOnInit(): void {
    this.shopService.getCart().subscribe((res) => {
      this.cart = res.cart.products
      let price = 0
      res.cart.products.forEach((item: any) => {
        if (item.quantity && item.price) {
          price += (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + price / 10 + 100
    })
  }

  submitOrder() {
    // let addressDetails = this.addressForm.value as Order
    // if(this.totalPrice){
    //   let orderData:Order = { ...addressDetails, cartTotal: this.totalPrice}

    // }
    if (this.addressForm.valid) {
      const formData = this.addressForm.value;
      console.log(formData);
      const dialogRef = this.dialog.open(CartConfirmationDialogComponent, {
        data: { cartItems: this.cart }
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) { 
          this.cart?.forEach((item) => {
            this.shopService.removeItemFromCart(item.productId).subscribe((res) => {
              // console.log(res);
              this.shopService.getCartCount()
            })
          })
          this.router.navigate(['/']);
        }
      });
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
}
