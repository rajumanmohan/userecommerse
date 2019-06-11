import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/productservice';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute } from '@angular/router';
declare var jQuery: any;
@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
    product;
    type;
    noRecords: boolean;
    image;
    skid;
    noData1;
    noData;
    selectedBrnd;
    a;
    action;
    Brands = [];
    selectedBrnd1;
    brand;
    catId1;
    imgId;
    wholeProd;
    serProd;
    recViewData = [];
    billing;
    // noRec: boolean;
    constructor(private router: Router, public productService: ProductService, private appService: appService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            if (params.action === "search") {
                this.product = params.product;
                this.search(this.product);
                this.seeAll = false;
                this.searchProd = true;
            } else if (params.action === "deals") {
                this.type = params.action;
                this.getEcomDeals();
                this.action = "deals";
                this.seeAll = true;
                this.searchProd = false;
            } else if (params.action === "topOffers") {
                this.type = params.action;
                this.action = "topOffers";
                this.getEcomTopOffers();
                this.seeAll = true;
                this.searchProd = false;
            } else if (params.action === "recemmnd") {
                this.type = params.action;
                this.action = "recemmnd";
                this.getEcom();
                this.seeAll = true;
                this.searchProd = false;
            }
            else if (params.action === "recent") {
                this.type = params.action;
                this.action = "recent";
                this.recentlyViwed();
                this.seeAll = true;
                this.searchProd = false;
            } else if (params.action === 'category') {
                this.action = params.action;
                this.catId = params.catId;
                this.catId1 = params.catId;
                this.catName = params.catName;
                this.seeAll = true;
                this.searchProd = false;
                this.getCatProducts('', '');
            } else if (params.action === 'subCategory') {
                this.action = params.action;
                this.subId = params.subId;
                this.catName1 = params.catName;
                this.subCatName = params.subCat;
                this.seeAll = true;
                this.searchProd = false;
                this.getSubProducts('', '');
            } else {
                this.imgId = params.imgId
                this.wholeProd = false;
                this.searchProd = true;
                this.getBanProducts1();
            }

        })
    }
    catId;
    catName;
    subCatName;
    priceArr = [{
        'price': "Less than 100",
        'value': "0,100"
    },
    {
        'price': "Less than 200",
        'value': "0,200"
    },
    {
        'price': "Less than 300",
        'value': "0,300"
    },
    {
        'price': "Less than 400",
        'value': "0,400"
    },
    {
        'price': "Above 400",
        'value': "401,100000"
    },
    ];
    ngOnInit() {
        this.getCategories();
        this.getBrands();
    }
    showCategories = false;

    collapse() {
        this.showCategories = !this.showCategories;

    }
    showProduxtDetails(prodId, venId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId, venId1: venId } });
    }
    category = [];
    subCatData = [];
    subId;
    serProducts: any;
    seeAll = false;
    searchProd = false;
    //   search(product) {
    //     this.searchProd = true;
    //     this.appService.searchProducts(product).subscribe(res => {
    //       this.serProducts = res.json().data;
    //     }, err => {

    //     })
    //   }
    search(product) {
        this.catName1 = this.subCatName1 = '';
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId
        }
        this.appService.searchProducts(product, params).subscribe(res => {
            this.prodData = res.json().vendor_products;
            if (this.prodData != undefined) {
                for (var i = 0; i < this.prodData.length; i++) {
                    for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                        this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                        this.prodData[i].actual_price = this.prodData[i].updated_price;
                        this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                        this.skid = this.prodData[i].sku_row[0].skid;
                    }
                }
                this.noData = false;
                this.noData1 = false;
                // this.noData2 = false;
                this.product = '' || null;
            }
            if (res.json().status === 400) {
                this.noData1 = true;
            }

        }, err => {

        })
    }
    dealData = [];
    topOfrs = [];
    skuData = [];
    skuArr = [];
    topsku = [];
    topArr = [];
    ecomProds = [];
    ecomsku = [];
    ecomArr = [];
    jewelData = [];
    jewelArr = [];
    jewlsku = [];
    cartDetails = [];
    cartCount;
    dealOfDay() {
        this.appService.dealOfDay().subscribe(res => {
            this.dealData = res.json().data.deals_of_the_day;
            this.topOfrs = res.json().data.top_offers;
            if (this.type === "deals") {
                for (var i = 0; i < this.dealData.length; i++) {
                    // this.prodName = this.dealData[i].product_name;
                    for (var j = 0; j < this.dealData[i].sku_details.length; j++) {
                        this.dealData[i].sku_details[j].product_name = this.dealData[i].product_name;
                        this.skuData = this.dealData[i].sku_details[j];
                        this.skuArr.push(this.skuData);
                    }

                }
            } else if (this.type === "typeProd") {
                for (var i = 0; i < this.topOfrs.length; i++) {
                    // this.prodName = this.dealData[i].product_name;
                    for (var j = 0; j < this.topOfrs[i].sku_details.length; j++) {
                        this.topOfrs[i].sku_details[j].product_name = this.topOfrs[i].product_name;
                        this.topsku = this.dealData[i].sku_details[j];
                        this.skuArr.push(this.topsku);
                    }

                }
            }
        })
    }

    addtoCart(Id, skId, price, venId, vProdID, udisc) {
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
            this.billing = res.json().selling_Price_bill;
        }, err => {

        })
    }

    getJewel() {
        this.appService.getJewel().subscribe(res => {
            this.jewelData = res.json().data;
            for (var i = 0; i < this.jewelData.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.jewelData[i].sku_details.length; j++) {
                    this.jewelData[i].sku_details[j].product_name = this.jewelData[i].product_name;
                    this.jewlsku = this.jewelData[i].sku_details[j];
                    this.skuArr.push(this.jewlsku);
                }

            }
        })
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
                    this.clothsku = this.clothData[i].sku_details[j];
                    this.skuArr.push(this.topsku);
                }

            }
        })
    }

    getEcom() {
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId

        }
        this.appService.ecomProducts(params).subscribe(res => {
            this.prodData = res.json().vendor_products;
            if (this.prodData != undefined) {
                for (var i = 0; i < this.prodData.length; i++) {
                    for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                        this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                        this.prodData[i].actual_price = this.prodData[i].updated_price;
                        this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                        this.skid = this.prodData[i].sku_row[0].skid;
                    }
                }
            }

        })
    }
    selectedCat;
    subCategory = [];
    showsubCat(index, id) {
        this.subCategory = [];
        this.selectedCat = index;
        this.showCategories = true;

        for (var i = 0; i < this.subCatData.length; i++) {
            if (id === this.subCatData[i].category_id) {
                this.subCategory.push(this.subCatData[i]);
            }
        }
    }

    closesubSubCat() {
        this.showCategories = false;
        // this.showSubCategories = false;
    }

    getCategories() {
        this.subCatData = [];
        this.appService.getCategories().subscribe(resp => {
            this.category = resp.json().categories;
            // this.showSubCat(this.subId);
            for (var i = 0; i < this.category.length; i++) {
                for (var j = 0; j < this.category[i].subcategory.length; j++) {
                    this.subCatData.push(this.category[i].subcategory[j]);
                    console.log(this.subCatData);
                }
            }
        })
    }

    // getSubProducts() {
    //     this.skuArr = [];
    //     this.appService.productBySubCatId(this.subId).subscribe(res => {
    //         this.prodData = res.json().products;
    //         this.skuData = [];
    //         for (var i = 0; i < this.prodData.length; i++) {
    //             for (var j = 0; j < this.prodData[i].sku_details.length; j++) {
    //                 this.prodData[i].sku_details[j].product_name = this.prodData[i].product_name;
    //                 this.skuArr.push(this.prodData[i].sku_details[j]);
    //             }
    //         }
    //         if (res.json().message === "No records Found") {
    //             this.noData = true;
    //         }
    //     }, err => {

    //     })
    // }
    catName1;
    getCatProducts(id, catName) {
        this.skuArr = [];
        this.catId = (id === '') ? this.catId : id;
        this.catName1 = (catName === '') ? this.catName : catName;
        this.action = "category";
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId

        }
        this.appService.productByCatId(this.catId, params).subscribe(res => {
            this.prodData = res.json().vendor_products;
            if (this.prodData != undefined) {
                for (var i = 0; i < this.prodData.length; i++) {
                    for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                        this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                        this.prodData[i].actual_price = this.prodData[i].updated_price;
                        this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                        this.skid = this.prodData[i].sku_row[0].skid;
                    }

                }
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().message === "No records Found") {
                this.noData = true;
            }


        }, err => {

        })
        this.subCatName1 = '';
        this.appService.getBrands(this.catId || 'null').subscribe(res => {
            this.Brands = res.json().brands;
        })
    }
    prodData = [];
    subCatName1;
    getSubProducts(subid, subName) {
        this.skuArr = [];
        this.subId = (subid === '') ? this.subId : subid;
        this.subCatName1 = (subName === '') ? this.subCatName : subName;
        // this.catName1 = (catName === '') ? this.catName : catName;
        this.action = "subCategory";
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId

        }
        this.appService.productBySubCatId(this.subId, params).subscribe(res => {
            this.prodData = res.json().vendor_products;
            // this.catId1 = this.catId === undefined ? this.prodData[0].category_id != undefined ? this.prodData[0].category_id : "" : this.catId;
            if (this.prodData != undefined) {
                this.catId1 = this.catId == undefined ? this.prodData[0].category_id != undefined ? this.prodData[0].category_id : "" : this.catId;
                for (var i = 0; i < this.prodData.length; i++) {
                    for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                        this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                        this.prodData[i].actual_price = this.prodData[i].updated_price;
                        this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                        this.skid = this.prodData[i].sku_row[0].skid;
                    }

                }
                this.noData = false;
                this.noData1 = false;
            } else {
                this.noData = true;
            }
            this.appService.getBrands(this.catId1 || 'null').subscribe(res => {
                this.Brands = res.json().brands;
            })
        }, err => {
            // this.subCatName1 = '';
        })
    }
    // changeSize(Id) {
    //     this.skid = Id;
    //     for (var i = 0; i < this.prodData.length; i++) {
    //         for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
    //             if (parseInt(Id) === this.prodData[i].sku_row[j].skid) {
    //                 this.prodData[i].selling_price = this.prodData[i].sku_row[j].selling_price;
    //                 this.prodData[i].actual_price = this.prodData[i].updated_price;
    //                 this.prodData[i].skid = this.prodData[i].sku_row[i].skid;
    //                 for (var k = 0; k < this.prodData[i].sku_row[j].sku_images.length; k++) {
    //                     this.prodData[i].image = this.prodData[i].sku_row[j].sku_images[0].sku_image;
    //                 }
    //             }

    //         }

    //     }
    // }
    enlargeImg;
    openNew(skid) {
        for (var i = 0; i < this.prodData.length; i++) {
            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                if (skid === this.prodData[i].sku_row[j].skid) {
                    this.enlargeImg = this.prodData[i].sku_row[j].sku_images[0].sku_image;
                    jQuery("#enlargeImg").modal("show");
                }
            }
        }
        // for (var i = 0; i < this.serProducts.length; i++) {
        //     for (var j = 0; j < this.serProducts[i].sku_details.length; j++) {
        //         if (skid === this.serProducts[i].sku_details[j].skid) {
        //             this.enlargeImg = this.serProducts[i].sku_details[j].image;
        //             jQuery("#enlargeImg").modal("show");
        //         }
        //     }
        // }

    }

    addtoWish(Id, skId) {
        var inData = {
            "user_id": JSON.parse(sessionStorage.userId),
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
    }
    getWish() {
        this.appService.getWish().subscribe(res => {
            console.log(res.json());
        }, err => {

        })
    }
    selectBrand(price, value) {
        this.selectedBrnd = price;
        this.a = value.split(',');
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "min": this.a[0],
            "max": this.a[1],
            "user_id": sessionStorage.userId


        }
        if (this.action === 'category') {
            this.appService.filterCats(this.catId, params).subscribe(res => {
                this.prodData = res.json().vendor_products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                            this.prodData[i].actual_price = this.prodData[i].updated_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message == "No records Found") {
                    this.noData = true;
                }
            })
        } else if (this.action === 'subCategory') {
            this.appService.filtersubCats(this.subId, params).subscribe(res => {
                this.prodData = res.json().vendor_products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                            this.prodData[i].actual_price = this.prodData[i].updated_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        }
        else if (this.action === 'deals') {
            this.appService.filterDeals(params).subscribe(res => {
                this.prodData = res.json().vendor_products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                            this.prodData[i].actual_price = this.prodData[i].updated_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message === 'No records Found') {
                    this.noData = true;
                }
            })
        } else if (this.action === 'topOffers') {
            this.appService.fiterTopOffr(params).subscribe(res => {
                this.prodData = res.json().vendor_products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                            this.prodData[i].actual_price = this.prodData[i].updated_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        } else {
            this.appService.fiterRecProds(params).subscribe(res => {
                this.prodData = res.json().vendor_products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                            this.prodData[i].actual_price = this.prodData[i].updated_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message === "No records Found") {
                    this.noData = true;
                }
            })
        }

    }
    ChangeHL(HLtype) {
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId
        }
        if (HLtype === "0") {
            if (this.action === 'category') {
                this.appService.filterCatHtoL(this.catId, params).subscribe(res => {
                    this.prodData = res.json().vendor_products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                                this.prodData[i].actual_price = this.prodData[i].updated_price;
                                this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                                this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                                this.skid = this.prodData[i].sku_row[0].skid;
                            }

                        }
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            } else if (this.action === 'subCategory') {
                this.appService.filterCatHtoL(this.subId, params).subscribe(res => {
                    this.prodData = res.json().vendor_products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                                this.prodData[i].actual_price = this.prodData[i].updated_price;
                                this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                                this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                                this.skid = this.prodData[i].sku_row[0].skid;
                            }

                        }
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            }
            else if (this.action = "Deals") {
                this.appService.filterDealsHtoL(params).subscribe(res => {
                    this.prodData = res.json().vendor_products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                                this.prodData[i].actual_price = this.prodData[i].updated_price;
                                this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                                this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                                this.skid = this.prodData[i].sku_row[0].skid;
                            }

                        }
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            }
            else if (this.action = "topOffers") {
                this.appService.filterTopHtoL(params).subscribe(res => {
                    this.prodData = res.json().vendor_products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                                this.prodData[i].actual_price = this.prodData[i].updated_price;
                                this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                                this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                                this.skid = this.prodData[i].sku_row[0].skid;
                            }

                        }
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            } else {
                this.appService.filterProdsHtoL(params).subscribe(res => {
                    this.prodData = res.json().vendor_products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                                this.prodData[i].actual_price = this.prodData[i].updated_price;
                                this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                                this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                                this.skid = this.prodData[i].sku_row[0].skid;
                            }

                        }
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            }
        } else if (HLtype === "1") {
            if (this.action === 'category') {
                this.appService.filterCatLtoH(this.catId, params).subscribe(res => {
                    this.prodData = res.json().vendor_products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                                this.prodData[i].actual_price = this.prodData[i].updated_price;
                                this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                                this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                                this.skid = this.prodData[i].sku_row[0].skid;
                            }

                        }
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            } else if (this.action === 'subCategory') {
                this.appService.filterSubCatLtoH(this.subId, params).subscribe(res => {
                    this.prodData = res.json().vendor_products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                                this.prodData[i].actual_price = this.prodData[i].updated_price;
                                this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                                this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                                this.skid = this.prodData[i].sku_row[0].skid;
                            }

                        }
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            } else if (this.action = "Deals") {
                this.appService.filterDealsLtoH(params).subscribe(res => {
                    this.prodData = res.json().vendor_products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                                this.prodData[i].actual_price = this.prodData[i].updated_price;
                                this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                                this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                                this.skid = this.prodData[i].sku_row[0].skid;
                            }

                        }
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            }
            else if (this.action = "topOffers") {
                this.appService.filterTopLtoH(params).subscribe(res => {
                    this.prodData = res.json().vendor_products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                                this.prodData[i].actual_price = this.prodData[i].updated_price;
                                this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                                this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                                this.skid = this.prodData[i].sku_row[0].skid;
                            }

                        }
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            } else {
                this.appService.filterProdsLtoH(params).subscribe(res => {
                    this.prodData = res.json().vendor_products;
                    if (this.prodData != undefined) {
                        for (var i = 0; i < this.prodData.length; i++) {
                            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                                this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                                this.prodData[i].actual_price = this.prodData[i].updated_price;
                                this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                                this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                                this.skid = this.prodData[i].sku_row[0].skid;
                            }

                        }
                        this.noData = false;
                        this.noData1 = false;
                    }
                    if (res.json().status === 400) {
                        this.noData = true;
                    }
                })
            }
            //  else {
            //     this.appService.filterWholeLtoH(this.wholeId, params).subscribe(res => {
            //         this.prodData = res.json().products;
            //         if (this.prodData != undefined) {
            //             for (var i = 0; i < this.prodData.length; i++) {
            //                 for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
            //                     this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
            //                     this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
            //                     this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
            //                     this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
            //                     this.skid = this.prodData[i].sku_row[0].skid;
            //                 }

            //             }
            //             this.noData = false;
            //             this.noData1 = false;
            //         }
            //         if (res.json().status === 400) {
            //             this.noData = true;
            //         }
            //     })
            // }
        } else {
            this.appService.productByCatId(this.catId1, params).subscribe(res => {
                this.prodData = res.json().vendor_products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                            this.prodData[i].actual_price = this.prodData[i].updated_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message === "No records Found") {
                    this.noData = true;
                }


            }, err => {

            })
        }
    }
    getBrands() {
        this.appService.getBrands(this.catId1 || 'null').subscribe(res => {
            this.Brands = res.json().brands;
        })
    }
    selectBrand1(brand) {
        this.selectedBrnd1 = brand;
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "brand": brand,
            "user_id": sessionStorage.userId

        }
        if (this.action === 'category') {
            this.appService.filterByBrandCat(this.catId, params).subscribe(res => {
                this.prodData = res.json().vendor_products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                            this.prodData[i].actual_price = this.prodData[i].updated_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().message == "No records Found") {
                    this.noData = true;
                }
            })
        } else if (this.action === "deals") {
            alert(this.action)
            this.appService.filterByBrandDeals(params).subscribe(res => {
                this.prodData = res.json().vendor_products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                            this.prodData[i].actual_price = this.prodData[i].updated_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        } else if (this.action === "topOffers") {
            this.appService.filterByBrandTop(params).subscribe(res => {
                this.prodData = res.json().vendor_products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                            this.prodData[i].actual_price = this.prodData[i].updated_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        } else if (this.action === "recent") {
            this.appService.filterByBrandRec(params).subscribe(res => {
                this.prodData = res.json().vendor_products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                            this.prodData[i].actual_price = this.prodData[i].updated_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        } else {
            this.appService.filterByBrandSubCat(this.subId, params).subscribe(res => {
                this.prodData = res.json().vendor_products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                            this.prodData[i].actual_price = this.prodData[i].updated_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        }
        this.brand = '';
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
            this.prodData = res.json().vendor_products;
            if (this.prodData != undefined) {
                for (var i = 0; i < this.prodData.length; i++) {
                    for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                        this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                        this.prodData[i].actual_price = this.prodData[i].updated_price;
                        this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                        this.skid = this.prodData[i].sku_row[0].skid;
                    }
                }
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().status === 400) {
                this.noData = true;
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
            this.prodData = res.json().vendor_products;
            if (this.prodData != undefined) {
                for (var i = 0; i < this.prodData.length; i++) {
                    for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                        this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                        this.prodData[i].actual_price = this.prodData[i].updated_price;
                        this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                        this.skid = this.prodData[i].sku_row[0].skid;
                    }
                }
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().status === 400) {
                this.noData = true;
            }

        })
    }
    getBanProducts1() {
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "user_id": sessionStorage.userId
        }
        this.appService.getBannerProds(this.imgId, params).subscribe(res => {
            this.prodData = res.json().vendor_products;
            if (this.prodData != undefined) {
                for (var i = 0; i < this.prodData.length; i++) {
                    for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                        this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                        this.prodData[i].actual_price = this.prodData[i].updated_price;
                        this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                        this.skid = this.prodData[i].sku_row[0].skid;
                    }

                }
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().message == "No records Found") {
                this.noData = true;
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
        this.appService.recentlyViwed().subscribe(res => {
            this.prodData = res.json().vendor_products;
            if (this.prodData != undefined) {
                for (var i = 0; i < this.prodData.length; i++) {
                    for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                        this.prodData[i].selling_price = this.prodData[i].updated_price - this.prodData[i].updated_discount;
                        this.prodData[i].actual_price = this.prodData[i].updated_price;
                        this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                        this.skid = this.prodData[i].sku_row[0].skid;
                    }
                }
                this.noData = false;
                this.noData1 = false;
                // this.noData2 = false;
                // this.noData3 = false;
                // this.noData4 = false;
            }
            else {
                this.noData = true;
                this.noData1 = false;
                // this.noData2 = false;
                // this.noData3 = false;
                // this.noData4 = false;
            }

        })
    }

}
