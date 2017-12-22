import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../../servers/service/search/search.service';
import { CategoryService } from '../../../../servers/service/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})

export class AddProductsComponent implements OnInit {
  editid: any;
  condition: string;
  selectProd: object;
  selectedBrands: string;
  selectedCategory: string;
  selectedSubCategory: string;
  selectedSubCategories: string;
  results = [];
  category = [];
  subcategory = [];
  subcategories? = [];
  brands = [];
  categorySelect: Boolean = false;
  keys: string;
  description: string;
  price: number;
  weight: number;
  imageurl: string;
  editMode: Boolean = true;
  toggle: Boolean = false;

  constructor(private searchService: SearchService, private categoryService: CategoryService,
  private route: ActivatedRoute) {
    this.route.params.subscribe( id => {
      this.editid = id;
    });
  }


  ngOnInit() {
    this.getCategory();
    this.getBrands();
    this.condition = 'baru';
    if (this.editid.id === 'add' ) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  getCategory() {
    this.categoryService.CategoryOne().subscribe(data => {
      this.category = data;
    });
  }

  toggleBrands() {

    this.toggle = true;
  }

  blurs() {
    this.toggle = false;
  }

  selectCategory(id: number) {
    this.categoryService.CategoryTwo(id).subscribe(data => {
      this.subcategory = data;
    });
  }

  selectSubCategory(id: number) {
    this.categoryService.CategoryThree(id).subscribe(data => {
     // console.log(data);
      this.subcategories = data;
    });
  }

  selectSubCategories(id: number) {
    console.log(id);
  }

  search(event) {
    const key = event.target.value;
    this.searchService.search(key).subscribe(data => {
      this.results = data;
    });
  }

  productSelected(hasil: any) {
    console.log(hasil);
    this.selectedBrands = hasil.name;
    this.results = [];
    this.selectedCategory = hasil.category;
    this.price = hasil.pricelist;
    this.description = hasil.description;
    this.imageurl = hasil.imageurl;
    this.weight = hasil.weight;
    this.toggle = false;
  }

  selectCondition() {
  }

  blur(hasil) {
    this.results = [];
    this.category = [];
  }

  getBrands() {
    this.categoryService.BrandCategory().subscribe(data => {
      this.brands = data;
    });
  }

}
