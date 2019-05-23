import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appService } from './../../services/mahaliServices/mahali.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var jQuery: any;
@Component({
    selector: 'app-useraccount',
    templateUrl: './useraccount.component.html',
    styleUrls: ['./useraccount.component.less']
})
export class UseraccountComponent implements OnInit {
    product;
    p: number = 1;
    noticationData = [];
    noData1;
    topOffers = [];
    constructor(
        private route: ActivatedRoute, public appService: appService, private formBuilder: FormBuilder, private router: Router) {
        this.page = this.route.snapshot.data[0]['page'];
        if (this.page === 'profile') {
            this.showProfile = true;
            this.getProfile();
        } else if (this.page === 'myproduct') {
            this.showMyProducts = true;
            this.showProfile = false;
        } else if (this.page === 'addProduct') {
            this.showAddProducts = true;
            this.showProfile = false;
            this.addProducts();
        }
        else if (this.page === 'orders') {
            this.showMyOrders = true;
            this.showProfile = false;
            this.getOrders();
        } else if (this.page === 'changePw') {
            this.showChangePassword = true;
            this.showProfile = false;
        } else if (this.page === 'deliveryaddr') {
            this.showDeliveryAddress = true;
            this.showProfile = false;
        } else if (this.page === 'notifications') {
            this.showNotifications = true;
            this.showProfile = false;
            this.notifications()
        } else if (this.page === 'wishlist') {
            this.showWishlist = true;
            this.showProfile = false;
            this.getWish();
        }
    }
    addressForm: FormGroup;
    resetForm: FormGroup;
    productForm: FormGroup
    submitted = false;
    editDel = false;
    stackCheck;
    noData;
    ngOnInit() {
        this.addressForm = this.formBuilder.group({
            full_name: ['', Validators.required],
            mobile_number: ['', Validators.required],
            house_no: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            landmark: ['', Validators.required],
            pin_code: ['', Validators.required],
        });
        this.resetForm = this.formBuilder.group({
            password: ['', [Validators.required]],
            new_password: ['', [Validators.required, Validators.minLength(6)]],
            retype_password: ['', [Validators.required, Validators.minLength(6)]],
            user_id: sessionStorage.userId
        });
        this.productForm = this.formBuilder.group({
            deal_price: ['', Validators.required],
            status: ['', Validators.required],
            discount: ['', Validators.required],
            vendor_id: sessionStorage.userId,
            product_id: this.productId
        });
        // this.editAddForm = this.formBuilder.group({
        //     full_name:['', Validators.required]
        // })
        this.getProfile();
        // this.dealOfDay();
        // this.getCloth();
        // this.getJewel();
        this.getWish();
        this.getEcomTopOffers();
    }

    page;
    showNotifications = false;
    showOrderDetails = false;
    showMyOrders = false;
    showChangePassword = false;
    showWishlist = false;
    showAddAddress = false;
    showDeliveryAddress = false;
    editUserProfile = false;
    showProfile = true;
    showAccountDetails = false;
    editAccount = false;
    showAddProducts = false;
    showAddProducts5 = false;
    showOfferZone = false;
    showMyProducts = false;
    showRequestAdmin = false;
    showEditAddress = false;
    showManageUserOrders = false;
    profile() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = true;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getProfile();
    }

    editProfile() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = true;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }

    deliveryAddress() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = true;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getAdd();
    }
    addAddress() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = true;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }

    wishList() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = true;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        // this.getWish();
    }

    changePassword() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = true;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }

    myOrder() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = true;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getOrders();
    }

    notifications() {
        this.showNotifications = true;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.appService.getNotifications1().subscribe(res => {
            this.noticationData = res.json().data;
            this.noData1 = false;
            this.noData = false;
            if (res.json().status == 400) {
                this.noData1 = true;
            }
        })
    }

    showOrderDetailsEcom(ordId) {
        this.showNotifications = false;
        this.showOrderDetails = true;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.ordDetails(ordId);
    }
    accountDetails() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        // this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        // this.showOfferZone = false;
        // this.showAddProducts = false;
        // this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = true;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showOfferZone = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.getAccDet();
    }
    editAccountDetails() {
        this.showNotifications = false;
        // this.showOrderDetails = true;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = true;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }
    cancelAdd() {
        this.showDeliveryAddress = true;
        this.showAddAddress = false;
        this.showEditAddress = false;
    }
    addProducts() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        // this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        // this.showOfferZone = false;
        // this.showAddProducts = true;
        // this.showAddProducts5 = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = true;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getCategories();
    }
    showAddProducts2(Id) {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        // this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        // this.showOfferZone = false;
        this.showAddProducts = false;
        // this.showAddProducts5 = true;
        // this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts5 = true;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getProducts(Id);
    }
    offerZone() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        // this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = true;
        this.showAddProducts = false;
        // this.showAddProducts5 = false;
        // this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showMyProducts = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.showChangePassword = false;
    }
    myProducts() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = true;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        // this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }
    requestAdmin() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        // this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = true;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }
    showEditAdd(addId) {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress = true;
        this.editAdd(addId);
    }
    showBukedOrderDetails(ordId) {
        this.showNotifications = false;
        this.showOrderDetails = true;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.ordDetails(ordId);
    }
    email;
    profileData; count;
    ordId;
    ordData = [];
    orderDet = [];
    ordAdd = [];
    ordDetails(ordId) {
        this.ordId = ordId;
        this.appService.orderById(ordId).subscribe(resp => {
            this.ordData = resp.json().Order.products;
            for (var i = 0; i < this.ordData.length; i++) {
                this.ordData[i].size = this.ordData[i].sku_row[0].size;
                this.ordData[i].selling_price = this.ordData[i].updated_price;
                this.ordData[i].quantity = this.ordData[i].updated_quantity;
                this.ordData[i].color = this.ordData[i].sku_row[0].filter_color;
                this.ordData[i].product_image = this.ordData[i].sku_row[0].sku_images[0].sku_image;
                this.ordData[i].status = this.ordData[i].order_status;

            }
            this.orderDet = resp.json().Order.details[0];
            this.count = resp.json().Order.total_selling_price;
            this.ordAdd = resp.json().Order.delivery_address[0];

        })
    }
    getProfile() {
        this.email = (sessionStorage.email);
        this.appService.loginDetailsbyEmail(this.email).subscribe(response => {
            this.profileData = response.json().data[0];
            sessionStorage.removeItem('userName');
            sessionStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
        })
    }
    updateProfile() {
        var inDate = {
            first_name: this.profileData.first_name,
            last_name: this.profileData.last_name,
            email: this.profileData.email,
            mobile_number: this.profileData.mobile_number,
            area: this.profileData.area,
            city: this.profileData.city
        }
        this.appService.updateProfile(inDate).subscribe(response => {
            console.log(response.json());
            swal(response.json().message, "", "success");
            this.ngOnInit();
            this.getProfile();
            this.cancel();
        })
    }
    cancel() {
        this.showProfile = true;
        this.editUserProfile = false;

    }
    get f1() { return this.addressForm.controls; }

    saveAddress() {

        this.submitted = true;
        // stop here if form is invalid
        if (this.addressForm.invalid) {
            return;
        }
        this.appService.addaddress(this.addressForm.value).subscribe(res => {
            this.addressForm.reset();
            swal(res.json().message, "", "success");
            this.showDeliveryAddress = true;
            this.showAddAddress = false;
            this.getAdd();
            //   this.addressForm.reset();
            // this.showAddresses = true;
            //     this.addresses = false;

        })
    }

    return;
    getAddData = [];
    getAdd() {
        this.appService.getAddress().subscribe(res => {
            this.getAddData = res.json().delivery_address;
        })
    }
    delAdd(delId) {
        this.appService.delAddress(delId).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getAdd();
        })
    }
    get f() { return this.resetForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetForm.invalid) {
            return;
        } else if (this.resetForm.value.retype_password != this.resetForm.value.new_password) {
            swal("Passwords doesn't matched", "", "warning");
            return;
        }
        this.appService.changePwd(this.resetForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                this.router.navigate(['/'])
            } else {
                swal(resp.json().message, "", "error");
            }

        }, err => {
            swal(err.json().message, "", "error");
        })


    }
    cancelChange() {
        this.showChangePassword = false;
        this.showProfile = true;
    }
    seleOpt;
    addId;
    seleAddOptn(index, addId) {
        this.seleOpt = index;
        this.editDel = true;
        this.addId = addId;
    }
    accDet: any;
    getAccDet() {
        this.appService.getAccDetails().subscribe(res => {
            this.accDet = res.json().data[0];
        }, err => {

        })
    }
    saveDetails() {
        var inData = {
            account_holder_name: this.accDet.account_holder_name,
            account_number: this.accDet.account_number,
            bank_area: this.accDet.bank_area,
            bank_branch: this.accDet.bank_branch,
            bank_city: this.accDet.bank_city,
            bank_name: this.accDet.bank_name,
            ifsc_code: this.accDet.ifsc_code
        }
        this.appService.updateAcc(inData).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getAccDet();
        }, err => {

        })
    }
    cancelDetails() {
        this.showAccountDetails = true;
        this.editAccount = false;
    }
    category = [];
    getCategories() {
        this.appService.getCategories().subscribe(resp => {
            this.category = resp.json().categories;
        })
    }
    prodId;
    reqProds = [];
    orders = [];
    getOrders() {
        this.appService.getPlaceOrder().subscribe(res => {
            this.orders = res.json().Orders;
            this.noData = false;
            if (res.json().status === 400) {
                this.noData = true;
            }
        }, err => {

        })
    }
    getProducts(Id) {
        this.prodId = Id;
        this.appService.reqOrder(Id).subscribe(resp => {
            this.reqProds = resp.json().Order;

        })
    }
    get f2() { return this.productForm.controls; }
    productId;
    save(prodId) {
        this.productId = prodId;
        this.submitted = true;
        // stop here if form is invalid
        if (this.productForm.invalid) {
            return;
        }
        this.appService.update(this.productForm.value).subscribe(resp => {
            swal("Your order under process for Approvel", "", "success");

        })

    }
    editAddData = {
        full_name: '',
        mobile_number: '',
        house_no: '',
        landmark: '',
        city: '',
        state: '',
        pin_code: '',

    };
    // get f3() { return this.editAddForm.controls; }
    editAdd(addId) {
        this.appService.update(addId).subscribe(resp => {
            this.editAddData = resp.json().delivery_address[0];
        }, err => {

        })
    }
    UpdateAdd(addId) {
        var indata = {
            "full_name": this.editAddData.full_name,
            "mobile_number": this.editAddData.mobile_number,
            "house_no": this.editAddData.house_no,
            "city": this.editAddData.city,
            "state": this.editAddData.state,
            "landmark": this.editAddData.landmark,
            "pin_code": this.editAddData.pin_code,
            "address_type": this.type
        }
        this.appService.updateAddData(indata, addId).subscribe(resp => {
            console.log(resp.json());
            this.getAdd();
        }, err => {

        })
    }
    fromDt;
    toDt;
    type;
    Type(value) {
        this.type = value;
    }
    filterVendor() {
        var inData = {
            "from_date": this.fromDt,
            "to_date": this.toDt
        }
        this.appService.filterVendor(inData).subscribe(resp => {
            this.orders = resp.json().products;

        }, err => {

        })
    }
    wishData = [];
    wishListData = [];
    wishArr = [];
    getWish() {
        this.appService.getWish().subscribe(res => {
            if (res.json().message === "Success") {
                this.wishData = res.json().wishlist;
                for (var i = 0; i < this.wishData.length; i++) {
                    // this.wishData[i].sku_details.wishlist_id = this.wishData[i].products.wishlist_id;
                    this.wishData[i].product_name = this.wishData[i].products.product_name;
                    this.wishData[i].product_id = this.wishData[i].products.product_id;
                    for (var j = 0; j < this.wishData[i].products.sku_details.length; j++) {
                        this.wishData[i].selling_price = this.wishData[i].products.sku_details[j].selling_price;
                        this.wishData[i].size = this.wishData[i].products.sku_details[j].size;
                        this.wishData[i].skid = this.wishData[i].products.sku_details[j].skid;
                        this.wishData[i].product_image = this.wishData[i].products.sku_details[j].sku_images[0].sku_image;
                        this.wishData[i].filter_color = this.wishData[i].products.sku_details[j].filter_color;
                        this.wishData[i].vendorid_as_owner = this.wishData[i].products.vendorid_as_owner;
                        this.wishData[i].vendor_product_id = this.wishData[i].products.vendor_product_id;
                        this.wishData[i].updated_discount = this.wishData[i].products.updated_discount;
                    }
                }
            }

        }, err => {

        })
    }
    delWish(wishId) {
        this.appService.delWishList(wishId).subscribe(res => {
            if (res.json().message === "Success") {
                this.getWish();
                swal(res.json().message, "", "success");
            }

        })
    }
    cartDetails = [];
    cartCount;
    checkProdQuty(prodId, skuId, price, venId, vProdID, udisc) {
        this.appService.checkQuty(prodId, skuId, 0, venId, vProdID).subscribe(res => {
            if (res.json().status === 200) {
                this.stackCheck = "In Stock";
                this.addtoCart(prodId, skuId, price, venId, vProdID, udisc);
            } else {
                this.stackCheck = "Out of Stock";
                swal(res.json().message, "", "error");
                // this.NoStockMsg = res.json().data;
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
                this.getEcomTopOffers();
            }
        }, err => {

        })
        // }

    }
    getCart() {
        var inData = sessionStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            this.cartDetails = res.json().cart_details;
            this.cartCount = res.json().count;
            // this.appService.checkQuty(this.prodId, skuId, 0, this.venId1, this.vendor_product_id).subscribe(res => {
            //     if (res.json().status === 200) {
            //         this.stackCheck = "In Stock";
            //     } else {
            //         this.stackCheck = "Out of Stock";
            //         // this.NoStockMsg = res.json().data;
            //     }
            // })
        }, err => {

        })
    }
    dealData = [];
    skuData = [];
    skuArr = [];
    prodName;
    topOfrs = [];
    topsku = [];
    topArr = [];
    dealOfDay() {
        this.skuArr = [];
        this.appService.dealOfDay().subscribe(res => {
            this.dealData = res.json().data.deals_of_the_day;
            this.topOfrs = res.json().data.top_offers;
            for (var i = 0; i < this.dealData.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.dealData[i].sku_details.length; j++) {
                    this.dealData[i].sku_details[j].product_name = this.dealData[i].product_name;
                    this.dealData[i].sku_details[j].product_id = this.dealData[i].product_id;
                    this.skuData = this.dealData[i].sku_details[j];
                    this.skuArr.push(this.skuData);
                }
            }

        })
    }
    clothData = [];
    clothsku = [];
    clothArr = [];
    getCloth() {
        this.clothArr = [];
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
    jewelData = [];
    jewelArr = [];
    jewlsku = [];
    getJewel() {
        this.jewelArr = [];
        this.appService.getJewel().subscribe(res => {
            this.jewelData = res.json().data;
            for (var i = 0; i < this.jewelData.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.jewelData[i].sku_details.length; j++) {
                    this.jewelData[i].sku_details[j].product_name = this.jewelData[i].product_name;
                    this.jewelData[i].sku_details[j].product_id = this.jewelData[i].product_id;
                    this.jewlsku = this.jewelData[i].sku_details[j];
                    this.jewelArr.push(this.jewlsku);
                }

            }
        })
    }
    showProduxtDetails(prodId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
    }
    enlargeImg;
    open(skid): void {
        for (var i = 0; i < this.dealData.length; i++) {
            // this.prodName = this.dealData[i].product_name;
            for (var j = 0; j < this.dealData[i].sku_details.length; j++) {
                if (skid === this.dealData[i].sku_details[j].skid) {
                    this.enlargeImg = this.dealData[i].sku_details[j].image;
                    jQuery("#enlargeImg").modal("show");
                }
            }
        }
        for (var i = 0; i < this.clothData.length; i++) {
            // this.prodName = this.dealData[i].product_name;
            for (var j = 0; j < this.clothData[i].sku_details.length; j++) {
                if (skid === this.clothData[i].sku_details[j].skid) {
                    this.enlargeImg = this.clothData[i].sku_details[j].image;
                    jQuery("#enlargeImg").modal("show");
                }
            }

        }
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
                        // this.skid = this.topOffers[i].sku_row[0].skid;
                    }
                }
                this.noData = false;
                this.noData1 = false;
                // this.noData2 = false;
                // this.noData3 = false;
                // this.noData4 = false;
            }
            else {
                this.noData = false;
                this.noData1 = true;
                // this.noData2 = false;
                // this.noData3 = false;
                // this.noData4 = false;
            }

        })
    }
}
