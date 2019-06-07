import { appService } from './../../services/mahaliServices/mahali.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ProductsData } from '../../services/productsdata';
import { ProductService } from '../../services/productservice';
// import { Lightbox } from 'angular2-lightbox';
import { Lightbox } from 'angular2-lightbox';
import swal from 'sweetalert';
declare var jQuery: any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
    skid;
    skId;
    allProductsData1 = [];
    allProductsData = [];
    noData;
    noData2;
    noData1;
    noData3;
    noData4;
    private skuArr: Array<any> = [];

    product: ProductsData = {
        name: "Utpal Kumar Das"
    };
    topOffers = [];
    ecomProds = [];
    ecomsku = [];
    ecomArr = [];
    ecomProdsDeals = [];
    recViewData = [];
    constructor(private router: Router, public productService: ProductService, private appService: appService, private _lightbox: Lightbox) { }
    ngOnInit() {
        // this.getWholeSellers();
        this.getBanners();
        // this.dealOfDay();
        // this.getJewel();
        // this.getCloth();
        this.getEcom();
        this.getEcomTopOffers();
        this.getEcomCats();
        this.getEcomDeals();
        this.getBanners();
        this.recentlyViwed();
    }
    showAllProducts = true;
    showVegetablesScreen = false;
    showFruitScreen = false;
    showTeaScreen = false;
    showBreadScreen = false;
    showJuiceScreen = false;

    showVegetables() {
        this.showVegetablesScreen = true;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = false;
        this.showBreadScreen = false;
        this.showJuiceScreen = false;
    }
    showFruits() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = true;
        this.showTeaScreen = false;
        this.showBreadScreen = false;
        this.showJuiceScreen = false;
    }
    showTea() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = true;
        this.showBreadScreen = false;
        this.showJuiceScreen = false;
    }
    showBread() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = false;
        this.showBreadScreen = true;
        this.showJuiceScreen = false;
    }
    showJuices() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = false;
        this.showBreadScreen = false;
        this.showJuiceScreen = true;
    }
    EcomCats = []
    category1;
    category2;
    getEcomCats() {
        this.appService.getEcomCats().subscribe(res => {
            this.EcomCats = res.json().categories;
            this.category1 = this.EcomCats[0].id;
            this.category2 = this.EcomCats[1].id;
            if (this.category2 != undefined) {
                this.category2 = this.EcomCats[1].id;
            }
            this.EcomCatProds();
            this.EcomCatProds1();
        })
    }
    EcomCatProds() {
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId
        }
        this.appService.productByCatId(this.category1, params).subscribe(res => {
            this.allProductsData = res.json().vendor_products;
            if (this.allProductsData != undefined) {
                for (var i = 0; i < this.allProductsData.length; i++) {
                    for (var j = 0; j < this.allProductsData[i].sku_row.length; j++) {
                        this.allProductsData[i].selling_price = this.allProductsData[i].updated_price - this.allProductsData[i].updated_discount;
                        this.allProductsData[i].actual_price = this.allProductsData[i].updated_price;
                        this.allProductsData[i].image = this.allProductsData[i].sku_row[0].sku_images[0].sku_image;
                        this.allProductsData[i].skid = this.allProductsData[i].sku_row[0].skid;
                        this.skid = this.allProductsData[i].sku_row[0].skid;
                    }

                }
                // this.noData2 = false;


            }
            if (res.json().status === 400) {
                // this.noData = true;
                // this.noData1 = false;
                // this.noData2 = false;
                // this.noData3 = false;
                // this.noData4 = false;
            }
        }, err => {

        })
    }
    EcomCatProds1() {
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId
        }
        this.appService.productByCatId(this.category2, params).subscribe(res => {
            this.allProductsData1 = res.json().vendor_products;
            if (this.allProductsData1 != undefined) {
                for (var i = 0; i < this.allProductsData1.length; i++) {
                    for (var j = 0; j < this.allProductsData1[i].sku_row.length; j++) {
                        this.allProductsData1[i].selling_price = this.allProductsData1[i].updated_price - this.allProductsData1[i].updated_discount;
                        this.allProductsData1[i].actual_price = this.allProductsData1[i].updated_price;
                        this.allProductsData1[i].image = this.allProductsData1[i].sku_row[0].sku_images[0].sku_image;
                        this.allProductsData1[i].skid = this.allProductsData1[i].sku_row[0].skid;
                        this.skid = this.allProductsData1[i].sku_row[0].skid;
                    }

                }
                // this.noData2 = false;
                // this.noData = false;
            }
            if (res.json().status === 400) {
                // this.noData2 = true;
                // this.noData = false;
            }
        }, err => {

        })
    }
    starList: boolean[] = [true, true, true, true, true];       // create a list which contains status of 5 stars
    rating: number;
    //Create a function which receives the value counting of stars click, 
    //and according to that value we do change the value of that star in list.
    setStar(data: any) {
        this.rating = data + 1;
        for (var i = 0; i <= 4; i++) {
            if (i <= data) {
                this.starList[i] = false;
            }
            else {
                this.starList[i] = true;
            }
        }
    }


    showProduxtDetails(prodId, venId1) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                prodId: prodId,
                venId1: venId1
            }
        }
        this.router.navigate(['/productdetails'], navigationExtras);

    }

    showStore() {
        this.router.navigate(['/store'], { queryParams: { order: 'popular' } });
    }
    getWholeSellers() {
        this.appService.getWholeSellers().subscribe(resp => {

        })
    }
    bannerData = [];
    offerBan = [];
    dummyBan = [];
    bannersTotalData = [];
    getBanners() {
        this.appService.getBrandCats().subscribe(res => {
            this.bannersTotalData = res.json().result;
            for (var i = 0; i < this.bannersTotalData.length; i++) {
                if (this.bannersTotalData[i].banner_position === 'Main Banners') {
                    this.bannerData = this.bannersTotalData[i].banner_details;
                } else if (this.bannersTotalData[i].banner_position === 'Feature brands') {
                    this.offerBan = this.bannersTotalData[i].banner_details;
                } else if (this.bannersTotalData[i].banner_position === "Dummy Banner") {
                    this.dummyBan = this.bannersTotalData[i].banner_details[0].website_banner;
                }
            }



            // if (res.json().result[6] !== undefined) {
            //     this.offerBan = res.json().result[6].banner_details;
            // }
            // if (res.json().result[7] !== undefined) {
            //     this.dummyBan = res.json().result[7].banner_details[0].website_banner;
            // }
            console.log(this.dummyBan);
        })
    }
    dealData = [];
    skuData = [];
    // skuArr = [];
    prodName;
    ImageLarge;
    topOfrs = [];
    topsku = [];
    topArr = [];
    enlargeImg;
    open(skid): void {
        for (var i = 0; i < this.ecomProds.length; i++) {
            for (var j = 0; j < this.ecomProds[i].sku_row.length; j++) {
                if (skid === this.ecomProds[i].sku_row[j].skid) {
                    this.enlargeImg = this.ecomProds[i].sku_row[j].sku_images[0].sku_image;
                    jQuery("#enlargeImg").modal("show");
                }
            }

        }
        for (var i = 0; i < this.topOffers.length; i++) {
            for (var j = 0; j < this.topOffers[i].sku_row.length; j++) {
                if (skid === this.topOffers[i].sku_row[j].skid) {
                    this.enlargeImg = this.topOffers[i].sku_row[j].sku_images[0].sku_image;
                    jQuery("#enlargeImg").modal("show");
                }
            }
        }
        for (var i = 0; i < this.allProductsData.length; i++) {
            for (var j = 0; j < this.allProductsData[i].sku_row.length; j++) {
                if (skid === this.allProductsData[i].sku_row[j].skid) {
                    this.enlargeImg = this.allProductsData[i].sku_row[j].sku_images[0].sku_image;
                    jQuery("#enlargeImg").modal("show");
                }
            }

        }
        for (var i = 0; i < this.allProductsData1.length; i++) {
            for (var j = 0; j < this.allProductsData1[i].sku_row.length; j++) {
                if (skid === this.allProductsData1[i].sku_row[j].skid) {
                    this.enlargeImg = this.allProductsData1[i].sku_row[j].sku_images[0].sku_image;
                    jQuery("#enlargeImg").modal("show");
                }
            }

        }
    }

    jewelData = [];
    jewelArr = [];
    jewlsku = [];
    getJewel() {
        this.appService.getJewel().subscribe(res => {
            this.jewelData = res.json().data;
            for (var i = 0; i < this.jewelData.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.jewelData[i].sku_row.length; j++) {
                    this.jewelData[i].sku_details[j].product_name = this.jewelData[i].product_name;
                    this.jewelData[i].sku_details[j].product_id = this.jewelData[i].product_id;
                    this.jewlsku = this.jewelData[i].sku_details[j];
                    this.jewelArr.push(this.jewlsku);
                }

            }
        })
    }
    jewellery(skid): void {
        for (var i = 0; i < this.jewelData.length; i++) {
            // this.prodName = this.dealData[i].product_name;
            for (var j = 0; j < this.jewelData[i].sku_details.length; j++) {
                if (skid === this.jewelData[i].sku_details[j].skid) {
                    this.enlargeImg = this.jewelData[i].sku_details[j].image;
                    jQuery("#enlargeImg").modal("show");
                }
            }

        }
    }

    clothData = [];
    clothsku = [];
    clothArr = [];
    getCloth() {
        this.appService.getCloth().subscribe(res => {
            this.clothData = res.json().data;
            for (var i = 0; i < this.clothData.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.clothData[i].sku_details.length; j++) {
                    this.clothData[i].sku_details[j].product_name = this.clothData[i].product_name;
                    this.clothData[i].sku_details[j].product_id = this.clothData[i].product_id;
                    this.clothsku = this.clothData[i].sku_details[j];
                    this.clothArr.push(this.clothsku);
                }

            }
        })
    }
    clothes(skid) {
        for (var i = 0; i < this.clothData.length; i++) {
            // this.prodName = this.dealData[i].product_name;
            for (var j = 0; j < this.clothData[i].sku_details.length; j++) {
                if (skid === this.clothData[i].sku_details[j].skid) {
                    this.enlargeImg = this.clothData[i].sku_details[j].image;
                    jQuery("#enlargeImg").modal("show");
                }
            }

        }

    }
    seeAll(catName, Id, action) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                catName: catName,
                catId: Id,
                action: action
            }
        }
        this.router.navigate(['/products'], navigationExtras);
    }
    getEcom() {
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId
        }
        this.appService.getAllEcomProds(params).subscribe(res => {
            this.ecomProds = res.json().vendor_products;
            if (this.ecomProds != undefined) {
                for (var i = 0; i < this.ecomProds.length; i++) {
                    for (var j = 0; j < this.ecomProds[i].sku_row.length; j++) {
                        this.ecomProds[i].selling_price = this.ecomProds[i].updated_price - this.ecomProds[i].updated_discount;
                        this.ecomProds[i].actual_price = this.ecomProds[i].updated_price;
                        this.ecomProds[i].image = this.ecomProds[i].sku_row[0].sku_images[0].sku_image;
                        this.ecomProds[i].skid = this.ecomProds[i].sku_row[0].skid;
                        this.skid = this.ecomProds[i].sku_row[0].skid;
                    }

                }
                // this.noData2 = false;
                // this.noData = false;
            }
        })
    }
    // recently(skid) {
    //     for (var i = 0; i < this.ecomProds.length; i++) {
    //         // this.prodName = this.dealData[i].product_name;
    //         for (var j = 0; j < this.ecomProds[i].sku_details.length; j++) {
    //             if (skid === this.ecomProds[i].sku_details[j].skid) {
    //                 this.enlargeImg = this.ecomProds[i].sku_details[j].image;
    //                 jQuery("#enlargeImg").modal("show");
    //             }
    //         }

    //     }

    // }

    cartDetails = [];
    cartCount;
    addtoCart(Id, skId, price, venId, vProdID, udisc) {
        // if (sessionStorage.userId === undefined) {
        //     swal('Please Login', '', 'warning');
        //     return;
        // }
        var inData = {
            "products": [{
                product_id: Id,
                sku_id: skId
            }],
            "user_id": JSON.parse(sessionStorage.getItem('userId')),
            "item_type": "ecommerce",
            "price": price,
            "vendorid_as_owner": venId,
            "vendor_product_id": vProdID,
            "updated_discount": udisc
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
    checkProdQuty(prodId, skuId, price, venId, vProdID, udisc) {
        this.appService.checkQuty(prodId, skuId, 0, venId, vProdID).subscribe(res => {
            if (res.json().status === 200) {
                this.addtoCart(prodId, skuId, price, venId, vProdID, udisc);
            } else {
                swal(res.json().message, "", "error");
                // this.NoStockMsg = res.json().data;
            }
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
    addtoWish(Id, skId) {
        // if (sessionStorage.userId === undefined) {
        //     swal("Please Login", "", "warning");
        // } else {
        var inData = {
            "user_id": (sessionStorage.userId),
            "product_id": Id,
            "sku_id": skId,
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
        }, err => {

        })
        // }

    }
    getWish() {
        this.appService.getWish().subscribe(res => {
            console.log(res.json());
        }, err => {

        })
    }
    getEcomDeals() {
        // this.ecomArr = [];
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId
        }
        this.appService.getEcomDeals(params).subscribe(res => {
            this.ecomProdsDeals = res.json().vendor_products;
            if (this.ecomProdsDeals != undefined) {
                for (var i = 0; i < this.ecomProdsDeals.length; i++) {
                    for (var j = 0; j < this.ecomProdsDeals[i].sku_row.length; j++) {
                        this.ecomProdsDeals[i].selling_price = this.ecomProdsDeals[i].updated_price - this.ecomProdsDeals[i].updated_discount;
                        this.ecomProdsDeals[i].actual_price = this.ecomProdsDeals[i].updated_price;
                        this.ecomProdsDeals[i].image = this.ecomProdsDeals[i].sku_row[0].sku_images[0].sku_image;
                        this.ecomProdsDeals[i].skid = this.ecomProdsDeals[i].sku_row[0].skid;
                        this.skid = this.ecomProdsDeals[i].sku_row[0].skid;
                    }
                }
                this.noData = false;
                this.noData1 = false;
                this.noData2 = false;
                this.noData3 = false;
                this.noData4 = false;
            } else {
                this.noData = true;
                this.noData1 = false;
                this.noData2 = false;
                this.noData3 = false;
                this.noData4 = false;

            }

        })
    }
    getEcomTopOffers() {
        // this.ecomArr = [];
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId

        }
        this.appService.getEcomTopOffers(params).subscribe(res => {
            this.topOffers = res.json().vendor_products;
            if (this.topOffers != undefined) {
                for (var i = 0; i < this.topOffers.length; i++) {
                    for (var j = 0; j < this.topOffers[i].sku_row.length; j++) {
                        this.topOffers[i].selling_price = this.topOffers[i].updated_price - this.topOffers[i].updated_discount;
                        this.topOffers[i].actual_price = this.topOffers[i].updated_price;
                        this.topOffers[i].image = this.topOffers[i].sku_row[0].sku_images[0].sku_image;
                        this.topOffers[i].skid = this.topOffers[i].sku_row[0].skid;
                        this.skid = this.topOffers[i].sku_row[0].skid;
                    }
                }
                this.noData = false;
                this.noData1 = false;
                this.noData2 = false;
                this.noData3 = false;
                this.noData4 = false;
            }
            else {
                this.noData = false;
                this.noData1 = true;
                this.noData2 = false;
                this.noData3 = false;
                this.noData4 = false;
            }

        })
    }

    recentlyViwed() {
        // this.ecomArr = [];
        // let params = {
        //     // "country": sessionStorage.country,
        //     // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
        //     // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
        //     "user_id": sessionStorage.userId

        // }
        if (sessionStorage.userId != undefined) {
            this.appService.recentlyViwed().subscribe(res => {
                this.recViewData = res.json().vendor_products;
                if (this.recViewData != undefined) {
                    for (var i = 0; i < this.recViewData.length; i++) {
                        for (var j = 0; j < this.recViewData[i].sku_row.length; j++) {
                            this.recViewData[i].selling_price = this.recViewData[i].updated_price - this.recViewData[i].updated_discount;
                            this.recViewData[i].actual_price = this.recViewData[i].updated_price;
                            this.recViewData[i].image = this.recViewData[i].sku_row[0].sku_images[0].sku_image;
                            this.recViewData[i].skid = this.recViewData[i].sku_row[0].skid;
                            this.skid = this.recViewData[i].sku_row[0].skid;
                        }
                    }
                    this.noData = false;
                    this.noData1 = false;
                    this.noData2 = false;
                    this.noData3 = false;
                    this.noData4 = false;
                }
                else {
                    this.noData = false;
                    this.noData1 = false;
                    this.noData2 = true;
                    this.noData3 = false;
                    this.noData4 = false;
                }

            })
        }
    }


    getBanProds(imgId) {
        this.router.navigate(['/products'], { queryParams: { imgId: imgId, action: 'banner' } });
    }
}
