import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ItemsComponent } from '../../components/items/items.component';
import { PromocodesComponent } from '../../components/promocodes/promocodes.component';
import { appService } from './../../services/mahaliServices/mahali.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderPipe } from 'ngx-order-pipe';
import swal from 'sweetalert';
declare var jQuery: any;
@Component({
    selector: 'app-mycart',
    templateUrl: './mycart.component.html',
    styleUrls: ['./mycart.component.less']
})
export class MycartComponent implements OnInit {
    addressForm: FormGroup;
    submitted = false;
    showCartItems = true;
    showDeliveryAddress = false;
    showAddresses = true;
    showPaymentMethode = false;
    showDeliveryType = false;
    addresses = false;
    payment_option;
    addId;
    skid;
    stackCheck;
    constructor(public dialog: MatDialog, public appService: appService, private router: Router, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.addressForm = this.formBuilder.group({
            full_name: ['', Validators.required],
            mobile_number: ['', Validators.required],
            house_no: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            landmark: ['', Validators.required],
            pin_code: ['', Validators.required],
            // address_type: this.type
        });
        this.getCart();
        this.getAdd();
        this.paymentOptions();
    }
    get f() { return this.addressForm.controls; }

    saveAddress() {
        this.addressForm.value.address_type = this.type;
        this.submitted = true;
        if (this.addressForm.invalid) {
            return;
        }
        this.appService.addaddress(this.addressForm.value).subscribe(res => {
            console.log(this.addressForm.value);
            this.getAdd();
            this.showAddresses = true;
            this.addresses = false;

        })
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }
    // saveAddress() {
    //     this.showAddresses = true;
    //     this.addresses = false;
    //     var inData = {
    //         "full_name": this.addData.full_name,
    //         "mobile_number": this.addData.mobile_number,
    //         "house_no": this.addData.house_no,
    //         "city": this.addData.city,
    //         "state": this.addData.state,
    //         "landmark": this.addData.landmark,
    //         "pin_code": this.addData.pin_code,
    //         "address_type": this.type,

    //     }
    //     this.appService.addaddress(inData).subscribe(res => {
    //         this.getAdd();
    //         this.showAddresses = true;
    //         this.addresses = false;

    //     })

    // }

    showCart() {
        this.showCartItems = !this.showCartItems;
        this.showDeliveryAddress = false;
        this.showPaymentMethode = false;
    }

    //show addrss
    showAddress() {
        this.showCartItems = false;
        this.showDeliveryAddress = !this.showDeliveryAddress;
        this.showPaymentMethode = false;
        this.addresses = false;
        this.showAddresses = true;
        this.showDeliveryType = false;
        window.scrollTo(0, 0);
    }
    //add address
    //add address
    addAddress() {
        this.addresses = true;
        this.showAddresses = false;
    }
    addData = {
        full_name: "",
        mobile_number: "",
        house_no: "",
        city: "",
        state: "",
        landmark: "",
        pin_code: "",
        address_type: "",
        vendor_id: 44
    }
    type;
    Type(value) {
        this.type = value || 'Home';
    }
    //save address


    billing;
    cartData = [];
    getCart() {
        var inData = sessionStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            this.cartData = res.json().cart_details;
            this.cartData.sort(function (a, b) {
                var keyA = new Date(a.added_on),
                    keyB = new Date(b.added_on)
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            for (var i = 0; i < this.cartData.length; i++) {
                this.cartData[i].prodName = this.cartData[i].products.product_name;
                for (var j = 0; j < this.cartData[i].products.sku_details.length; j++) {
                    this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
                    this.cartData[i].products.skid = this.cartData[i].products.sku_details[0].skid;
                    this.cartData[i].products.selling_price = this.cartData[i].price;
                    this.cartData[i].products.actual_price = parseInt(this.cartData[i].price) + parseInt(this.cartData[i].updated_discount);
                    this.cartData[i].products.img = this.cartData[i].products.sku_details[j].sku_images[0].sku_image;
                    this.cartData[i].filter_color = this.cartData[i].products.sku_details[0].filter_color;
                }
            }
            this.cartCount = res.json().count;
            this.billing = res.json().selling_Price_bill;
        }, err => {

        })
    }
    // if(){

    // }
    checkout() {
        if (this.cartData.length == 0) {
            swal("Your cart is empty", "", "warning");
            this.showCartItems = false;
            this.showDeliveryAddress = false;
        } else {
            this.showCartItems = false;
            this.showDeliveryAddress = true;
        }
    }
    cartDetails = [];
    cartCount;
    // addtoCart(Id, skId) {
    //     var inData = {
    //         "products": [{
    //             product_id: Id,
    //             sku_id: skId
    //         }],
    //         "vendor_id": JSON.parse(sessionStorage.getItem('userId')),
    //         "item_type": "ecommerce"
    //     }
    //     this.appService.addtoCart(inData).subscribe(res => {
    //         if (res.json().status === 400) {
    //             swal(res.json().message, "", "error");
    //         } else {
    //             this.getCart();
    //             this.cartDetails = res.json().selling_price_total;
    //             this.cartCount = res.json().count;
    //             swal(res.json().message, "", "success");
    //         }

    //     }, err => {

    //     })
    // }
    getAddData = [];
    getAdd() {
        this.appService.getAddress().subscribe(res => {
            this.getAddData = res.json().delivery_address;
        }, err => {

        })
    };
    delCart(cartId) {
        var inData = cartId;
        this.appService.delCart(inData).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getCart();
        }, err => {
        })
    }
    //showPayment
    showPayment() {
        this.showPaymentMethode = !this.showPaymentMethode;
        this.showCartItems = false;
        this.showAddresses = false;
        this.showDeliveryAddress = false;
        window.scrollTo(0, 0);

    }
    // show shipment type
    shipmentType(addId) {
        this.addresses = false;
        this.showAddresses = false;
        // this.showDeliveryType = true;
        this.showPaymentMethode = true;
        this.addId = addId;
        this.showDeliveryAddress = false;
        this.selectAdd(this.addId);
    }
    selectAdd(id) {
        this.appService.setDelAdd(this.addId).subscribe(res => {
            swal("Address selected successfully", "", "success");
            this.getAdd();
        })
    }
    //items popup
    showItems() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(ItemsComponent, dialogConfig);

    }
    showPromos() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(PromocodesComponent, dialogConfig);
    }
    seleOpt;
    payId;
    selePayOptn(index, Id) {
        this.seleOpt = index;
        this.payId = Id;
    }
    ordData = [];
    orderPlace() {
        if (sessionStorage.userId === undefined) {
            swal('Please Login', '', 'warning');
            return;
        }
        var inData = {
            "delivery_address_id": this.addId,
            "billing_amount": this.billing,
            "payment_type": this.payId,
            "user_id": sessionStorage.getItem('userId'),
            "item_type": "ecommerce",
            "Delivery_charge": 0,
            "Coupon_Discount": 0,
            "Final_amount": this.billing
        }
        this.appService.palceOrder(inData).subscribe(res => {
            if (res.json().message === "Success") {
                this.ordData = res.json().Order[0].order_id;
                swal(res.json().message, "", "success");
                this.router.navigate(['/Orderplaced'], { queryParams: { orderId: this.ordData } });
            } else {
                swal("Please Login", "", "warning");
            }
        }, err => {
        })
    }
    payOptions = [];
    paymentOptions() {
        this.appService.paymentType().subscribe(res => {
            this.payOptions = res.json().options;
        }, err => {

        })
    }

    itemIncrease(cartId) {
        for (var i = 0; i < this.cartData.length; i++) {
            if (this.cartData[i].cart_id === cartId) {
                this.cartData[i].quantity = this.cartData[i].quantity + 1;
                this.modifyCart(this.cartData[i].quantity, cartId);
                // this.getCart();
                return;
            }
        }
    }

    itemDecrease(cartId, prodId, skuId, qunt, venId, venprodId) {
        for (var i = 0; i < this.cartData.length; i++) {
            if (this.cartData[i].cart_id === cartId) {
                if (this.cartData[i].quantity === 1) {
                    this.delCart(cartId);
                    return;
                } else {
                    this.cartData[i].quantity = this.cartData[i].quantity - 1;
                    this.modifyCart(this.cartData[i].quantity, cartId);
                    this.appService.checkQuty(prodId, skuId, qunt, venId, venprodId).subscribe(res => {
                        if (res.json().status === 200) {
                            this.stackCheck = "In Stock";
                        } else {
                            this.stackCheck = "Out of Stock";
                            // swal(res.json().message, "", "error");
                        }
                    })
                    // this.checkProdQuty(cartId, prodId, skuId, qunt, venId, venprodId)
                }
                // this.getCart();
                return;
            }
        }

    }
    checkProdQuty(cartId, prodId, skuId, qunt, venId, venprodId) {
        this.appService.checkQuty(prodId, skuId, qunt, venId, venprodId).subscribe(res => {
            if (res.json().status === 200) {
                this.stackCheck = "In Stock";
                this.itemIncrease(cartId);
            } else {
                this.stackCheck = "Out of Stock";
                swal(res.json().message, "", "error");
            }
        })
    }
    //modify cart

    modifyCart(quantity, cartId) {
        var params = {
            "quantity": quantity
        }

        this.appService.modifyCart(params, cartId).subscribe(resp => {
            if (resp.json().status === 200) {
                // swal(resp.json().message, "", "success");
                jQuery("#signupmodal").modal("hide");
                this.getCart();
                // this.showRegistration = false;
                // sessionStorage.setItem('userId', (resp.json().reg_id));
                // this.myAccount = true
                // this.showOpacity = false;
                // this.onCloseCancel();
                // this.router.navigate(['/address']);
            }
        }, err => {

        })
    }
}
