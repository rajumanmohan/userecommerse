import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsData } from '../../services/productsdata';
import { ProductService } from '../../services/productservice';
import { appService } from './../../services/mahaliServices/mahali.service';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';

@Component({
    selector: 'app-productdetails',
    templateUrl: './productdetails.component.html',
    styleUrls: ['./productdetails.component.less'],
    providers: [NgbRatingConfig]

})

export class ProductdetailsComponent implements OnInit {
    product: ProductsData;
    constructor(private route: ActivatedRoute, public productService: ProductService, private appService: appService, private router: Router, config: NgbRatingConfig) {
        config.max = 5;
        // config.readonly = true;
        this.route.queryParams.subscribe(params => {
            this.prodId = params.prodId;
            this.venId1 = params.venId1;
        });
    }


    item = {
        quantity: 1
    }
    discountPer;
    sub;
    prodId;
    image;
    size;
    skuData = [];
    selling_price;
    specification;
    filter_color;
    rate;
    review;
    rateData;
    venId1;
    stackCheck;
    wish_list;
    last_name;
    first_name;
    othershops;
    prodId1;
    ngOnInit() {
        // this.getRates1();
        this.product = this.productService.product;
        this.sub = this.route
            .data
            .subscribe(v => console.log(v));
        this.getProductById();
    }

    starList: boolean[] = [true, true, true, true, true];       // create a list which contains status of 5 stars
    rating: number;
    //Create a function which receives the value counting of stars click, 
    //and according to that value we do change the value of that star in list.
    // setStar(data: any) {
    //     this.rating = data + 1;
    //     for (var i = 0; i <= 4; i++) {
    //         if (i <= data) {
    //             this.starList[i] = false;
    //         }
    //         else {
    //             this.starList[i] = true;
    //         }
    //     }
    // }
    prodData = [];
    prodsData = [];
    currentRate;
    skid;
    prodName;
    description;
    offer_price;
    actual_price;
    product_image;
    prodImages = [];
    productData = [];
    product_id: any;
    category_name;
    sub_name: any;
    vendor_product_id;
    discount;
    venId;
    getProductById() {
        this.skuData = [];
        // this.getRates1();
        this.appService.getProductById(this.prodId, this.venId1).subscribe(res => {
            this.productData = res.json().vendor_products;
            // this.prodsData = res.json().products.sku_details;
            for (var i = 0; i < this.productData.length; i++) {
                this.prodId = this.productData[0].product_id;
                this.prodId1 = this.productData[0].product_id;
                this.prodName = this.productData[0].product_name;
                this.category_name = this.productData[0].category_name;
                this.sub_name = this.productData[0].sub_category_name;
                this.vendor_product_id = this.productData[0].vendor_product_id;
                this.venId = this.productData[0].vendor_id;
                this.discount = this.productData[0].discount;
                this.actual_price = this.productData[0].price;
                this.wish_list = this.productData[0].wish_list;
                this.first_name = this.productData[0].first_name;
                this.last_name = this.productData[0].last_name;
                this.othershops = this.productData[0].othershops;
                this.selling_price = this.productData[0].price - (this.productData[0].discount);
                for (var j = 0; j < this.productData[i].sku_row.length; j++) {
                    this.offer_price = this.productData[i].sku_row[0].offer_price;
                    this.product_image = this.productData[i].sku_row[0].sku_images[0].sku_image;
                    this.skid = this.productData[i].sku_row[0].skid;
                    this.discountPer = this.productData[i].sku_row[0].Discount_percentage;
                    this.image = this.productData[i].sku_row[0].sku_images[0].sku_image;
                    this.size = this.productData[i].sku_row[0].size;
                    this.description = this.productData[i].sku_row[0].description;
                    this.specification = this.productData[i].sku_row[0].specification;
                    this.filter_color = this.productData[i].sku_row[0].filter_color;
                    this.skuData.push(this.productData[i].sku_row[j]);
                    for (var k = 0; k < this.productData[i].sku_row[j].sku_images.length; k++) {
                        this.prodImages.push(this.productData[i].sku_row[j].sku_images[k]);
                        console.log(this.prodImages);
                    }
                }
            }
            this.appService.getRates(this.prodId1).subscribe(res => {
                this.rateData = res.json().ratingandreview;
                for (var i = 0; i < this.rateData; i++) {
                    this.currentRate = this.rateData[i].rating;
                }
            })
            this.appService.checkQuty(this.prodId, this.skid, 0, this.venId1, this.vendor_product_id).subscribe(res => {
                if (res.json().status === 200) {
                    this.stackCheck = "In Stock";
                } else {
                    this.stackCheck = "Out of Stock";
                    // this.NoStockMsg = res.json().data;
                }
            })
        }, err => {

        })
    }


    changeSize(Id) {
        this.skid = Id;
        for (var i = 0; i < this.prodsData.length; i++) {
            for (var j = 0; j < this.prodsData[i].sku_row.length; j++) {
                if (parseInt(Id) === this.prodsData[i].sku_row[j].skid) {
                    this.selling_price = this.prodsData[i].sku_row[j].selling_price;
                    this.actual_price = this.prodsData[i].sku_row[j].actual_price;
                    this.skid = this.prodsData[i].sku_row[j].skid;
                    this.description = this.prodsData[i].sku_row[j].description;
                    this.specification = this.productData[i].sku_row[j].specification;
                    this.filter_color = this.productData[i].sku_row[0].filter_color;
                    for (var k = 0; k < this.prodsData[i].sku_row[j].sku_images.length; k++) {
                        this.product_image = this.prodsData[i].sku_row[j].sku_images[0].sku_image;
                    }
                }

            }

        }
    }
    cartDetails = [];
    cartCount;
    addtoCart(skId) {
        var inData = {
            "products": [{
                product_id: this.prodId,
                sku_id: this.skid
            }],
            "user_id": (sessionStorage.getItem('userId')),
            "item_type": "ecommerce",
            "price": this.selling_price,
            "vendor_product_id": this.vendor_product_id,
            "updated_discount": this.discount,
            "vendorid_as_owner": this.venId,
        }
        this.appService.addtoCart(inData).subscribe(res => {
            if (res.json().status === 400) {
                swal(res.json().message, "", "error");
            } else {
                this.getCart();
                this.cartDetails = res.json().selling_price_total;
                this.cartCount = res.json().count;
                swal(res.json().message, "", "success");
            }

        }, err => {

        })
    }
    checkProdQuty(prodId) {
        this.appService.checkQuty(prodId, this.skid, 0, this.venId1, this.vendor_product_id).subscribe(res => {
            if (res.json().status === 200) {
                this.addtoCart(prodId);
            } else {
                swal(res.json().message, "", "error");
                // this.NoStockMsg = res.json().data;
            }
        })
    }
    checkProdQuty1(prodId) {
        this.appService.checkQuty(prodId, this.skid, 0, this.venId1, this.vendor_product_id).subscribe(res => {
            if (res.json().status === 200) {
                this.addtoCart(prodId);
                this.router.navigate(['/mycart']);
            } else {
                swal(res.json().message, "", "error");
                // this.NoStockMsg = res.json().data;
            }
        })
    }
    itemIncrease(cartId) {
        for (var i = 0; i < this.cartDetails.length; i++) {
            if (this.cartDetails[i].cart_id === cartId) {
                this.cartDetails[i].quantity = this.cartDetails[i].quantity + 1;
                this.modifyCart(this.cartDetails[i].quantity, cartId);
                // this.getCart();
                return;
            }
        }
    }

    itemDecrease(cartId) {
        for (var i = 0; i < this.cartDetails.length; i++) {
            if (this.cartDetails[i].cart_id === cartId) {
                if (this.cartDetails[i].quantity === 1) {
                    // this.delCart(cartId);
                    return;
                } else {
                    this.cartDetails[i].quantity = this.cartDetails[i].quantity - 1;
                    this.modifyCart(this.cartDetails[i].quantity, cartId);
                }
                // this.getCart();
                return;
            }
        }

    }

    //modify cart

    modifyCart(quantity, cartId) {
        var params = {
            "quantity": quantity
        }

        this.appService.modifyCart(params, cartId).subscribe(resp => {
            if (resp.json().status === 200) {
                // swal(resp.json().message, "", "success");
                // jQuery("#signupmodal").modal("hide");
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
    getCart() {
        var inData = sessionStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            this.cartDetails = res.json().cart_details;
            this.cartCount = res.json().count;
        }, err => {

        })
    }

    showProduxtDetails(prodId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
    }
    showBigImage(image) {
        this.product_image = image;
    }
    addtoWish() {
        var inData = {
            "user_id": (sessionStorage.userId),
            "product_id": this.prodId,
            "sku_id": this.skid,
            "item_type": "ecommerce"
        }
        this.appService.addToWish(inData).subscribe(res => {
            if (sessionStorage.userId === undefined) {
                swal("Please Login", "", "error");
            } else if (res.json().status === 400) {
                swal(res.json().message, "", "error");
            } else {
                console.log(res.json());
                swal(res.json().message, "", "success");
                this.getWish();
            }
            // this.getWish();
        }, err => {

        })
    }
    getWish() {
        this.appService.getWish().subscribe(res => {
            console.log(res.json());
        }, err => {

        })
    }
    // changeRate(rate) {
    //     this.rate = rate
    // }
    RateReview() {
        var todayDate = new Date();
        var nDate = todayDate.getDate() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getFullYear();
        let params = {
            "product_id": this.prodId,
            "rating": this.rate,
            "review": this.review,
            "user_id": sessionStorage.userId,
            "date": nDate
        }
        this.appService.insertRate(params).subscribe(res => {
            if (res.json().status === 200) {
                swal(res.json().message, "", "success");
                this.getProductById();
                // this.getRates1();
            }
        })
        this.review = '';
    }
    rates = [];
    // getRates1() {
    //     alert(this.prodId1)
    //     this.appService.getRates(this.prodId1).subscribe(res => {
    //         this.rateData = res.json().ratingandreview;
    //         for (var i = 0; i < this.rateData; i++) {
    //             this.currentRate = this.rateData[i].rating;
    //         }
    //     })
    // }
}
