import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public router: Router) { }
  page;
  ngOnInit() {
  }

  moveUp() {
    window.scrollTo(0, 0);
  }
  myaccount() {
    if (sessionStorage.token === undefined) {
      swal('Please Login', '', 'warning');
      return;
    } else {
      this.router.navigate(['/myaccount'])
    }
  }
  footerPages(link) {
    this.page = "/" + "" + link;
    if (sessionStorage.userId === undefined) {
      swal("Please Login", "", "warning");
    } else {
      this.router.navigate([this.page]);
    }
  }
}
