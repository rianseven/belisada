import { Component, OnInit } from '@angular/core';
import { ReviewService } from '@belisada/core/services/review/review.service';
import { ReviewBuyer } from '../../../core/models/review/review.model';
import { Router, ActivatedRoute, Params, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss']
})
export class ReviewProductComponent implements OnInit {

  reviewBuyer: ReviewBuyer  = new ReviewBuyer();

  currentPage: number;
  lastPage: number;
  pages: any = [];

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadData();
    console.log('gaban ini');
  }

  loadData() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];

      const queryParams = {
        itemperpage: 10,
        page: this.currentPage,
        status: 'review'
      };

      this.reviewService.getReviewBuyer(queryParams).subscribe(response => {

        console.log('apa', response);
        this.reviewBuyer = response;
          this.lastPage = this.reviewBuyer.totalPages;
          for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
            if (r > 0 && r <= this.reviewBuyer.totalPages) {
              this.pages.push(r);
            }
          }
      });

    });
  }

  detail(id, name) {
    this.router.navigate(['/product/product-detail/' + id + '/' + name]);
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.reviewBuyer.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/buyer/diskusi-review', { queryParams: {page: page, status: 'review' }, queryParamsHandling: 'merge' }]) ;
    window.scrollTo(0, 0);
  }

}
