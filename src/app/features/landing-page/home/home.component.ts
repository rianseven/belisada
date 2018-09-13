import { TestingServicesService } from './../../../core/services/testService/testing-services.service';
import { ModelsComponent } from './../../../shared/components/models/models.component';
import swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { UserData, Home } from '@belisada/core/models';
import { StoreService, UserService, HomeSService } from '@belisada/core/services';
import { LocalStorageEnum } from '@belisada/core/enum';
import { Province, City, District, Village } from '@belisada/core/models/store/address';
import { CheckStoreRequest } from '@belisada/core/models/store/store.model';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    imageUrls = [
      'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg',
      'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg' ,
      'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg'
    ];

      @Input() sideBar: ModelsComponent;
      @Input() visible: boolean;
      @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  public validationOnpopUpCreateStore: FormGroup;
  provinces: Province[];
  nameOwner: FormControl;
  serverMessage: String;
  fm: any = {};
  cities: City[];
  curentPostal: any;
  districts: District[];
  userData: UserData = new UserData();
  villages: Village[];
  isLogin: Boolean = false;
  nameChecking: Boolean = false;
  storeName: FormControl;
  pending_submit: Boolean = false;
  timer: any;
  ip: string;
  country: string;
  storeUrl: FormControl;
  regForm: boolean;
  regSuccess: boolean;

  productNew: Home[] = [];
  productPop: Home[] = [];
  productImageUrl;
  productStoreUrl;
  imageDummy;
  imageDmy;
  imageHeader;
  imageHeaderNya;
  lnght;
  imageUrlArray;
  showDialog;
  dataForPopUp;


  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private userS: UserService,
    private router: Router,
    private homeS: HomeSService,
    private _messageService: TestingServicesService,
  ) {
    this.productImageUrl = environment.thumborUrl + 'unsafe/fit-in/180x180/center/filters:fill(fff)/';
    this.productStoreUrl = environment.thumborUrl + 'unsafe/fit-in/30x30/center/';
    this.imageHeader = environment.thumborUrl + 'unsafe/fit-in/180x180/center/filters:fill(fff)/';
    this.imageDmy = environment.thumborUrl + 'unsafe/fit-in/150x150/center/filters:fill(fff)/';
    this.imageHeaderNya = 'http://cdn.belisada.id/imageproductbrand/7bb882a8-3c31-40bd-8356-4974a4ce0595.png';
    this.imageDummy = 'https://cdn.belisada.id/imageproductbrand/2ad61795-9903-4efe-a8a8-ffbdfe705d0c.jpeg';
    this._messageService.listen().subscribe((m: any) => {
      console.log(m);
      this.onFilterClick(m);
  });
  }

  ngOnInit() {
    this.flagStatus();
    this.regForm = true;
    this.bukaPopUp();
    this.formData();
    this.userData = this.userS.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    if (this.userData) {
      this.isLogin = true;
    }
    this.getDataForNew();
    this.getDataForPop();
  }

  private bukaPopUp() {
    this.dataForPopUp = sessionStorage.getItem('boolean');
    this.showDialog = this.showDialog = !this.showDialog;
  }

  private formData() {
    this.storeName = new FormControl(null, Validators.required);
    this.storeUrl = new FormControl(null, Validators.required);
    this.validationOnpopUpCreateStore = this.fb.group({
      nameOwner: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      storeUrl: this.storeUrl,
      //   address: new FormControl(null, Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7)
      ]),
    });
  }

  alertOnInit() {
    alert('aaa');
  }
  gotoHome() {
    this.router.navigate(['/']);

  }
  goToStoreNol() {
    sessionStorage.setItem('boolean', 'true');
    this.showDialog = false;
    const data = sessionStorage.getItem('boolean');
    window.open(environment.baseUrlSeller + '/auth/sign-in', '_blank');
  }
  onFilterClick(event) {
    this.showDialog = false;
        sessionStorage.setItem('boolean', 'true');
    const data = sessionStorage.getItem('boolean');
    console.log('Fire onFilterClick: ', event);
  }
  functionOnStore() {
      console.log('asdasdsadasd');
  }



  getDataForNew() {
  this.homeS.getHomeNew().subscribe(res => {
    this.productNew = res;
    this.lnght = res.length;
    });
  }

  getDataForPop() {
    this.homeS.getHomePopular().subscribe(res => {
      this.productPop = res;
    });
  }


  flagStatus() {
  this.regForm = false;
  this.regSuccess = false;
  }

  testingform(form: NgForm) {
    console.log(form);
  }
  onChanges() {
    this.storeName.valueChanges.subscribe(val => {
      clearTimeout(this.timer);
      if (val.length > 0) {
        this.timer = setTimeout(() => {
          this.nameChecking = true;
          this.checkStoreName();
        }, 500);
      }
    });

  //   this.validationOnpopUpCreateStore.get('province').valueChanges.subscribe(val => {
  //       this.getCity(val);
  //   });
  //   this.validationOnpopUpCreateStore.get('city').valueChanges.subscribe(val => {
  //       this.getDistrict(val);
  //   });

  //   this.validationOnpopUpCreateStore.get('district').valueChanges.subscribe(val => {
  //       this.getVillage(val);
  //   });
  //   this.validationOnpopUpCreateStore.get('district').valueChanges.subscribe(val => {});
  }
  getProvince() {
    // Country ID harcoded to Indonesia
    this.storeService.getProvince('209').subscribe(data => {
      this.provinces = data;
    });
  }
  goStore(url) {
    this.router.navigate(['/' + url]);
  }


  public encodeUrl(name) {
    return name.replace(new RegExp('/', 'g'), ' ');
  }

  goToDetail(id, name) {
    const r = this.encodeUrl(name);
    console.log(r);
    // if (r === ' ') {
    //   this.router.navigate(['/product/product-detail/' + id + '/' + 'yourItem']);
    // } else {
      this.router.navigate(['/product/product-detail/' + id + '/' + r]);
    // }

    window.scrollTo(0, 0);
  }

  getCity(id) {
    this.storeService.getCity(id).subscribe(data => {
      this.cities = data;
      console.log('data city', data);
    });
  }
  getDistrict(id) {
    this.storeService.getDistrict(id).subscribe(data => {
      this.districts = data;
      console.log('data district', data);
    });
  }

  getVillage(id) {
    this.storeService.getVillage(id).subscribe(data => {
      this.villages = data;
      const model = this.validationOnpopUpCreateStore.value;
      const a = this.validationOnpopUpCreateStore.value.villageId = id.district;
      console.log('data vilages', data);
    });
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  checkStoreName() {
    const check_data: CheckStoreRequest = new CheckStoreRequest;
    check_data.name = this.storeName.value;
    this.storeService.isExist(check_data).subscribe(rsl => {
      if (rsl.status !== 1) {
        this.storeName.setErrors({
          'server': true
        });
        this.serverMessage = rsl.message;
      }
      this.nameChecking = false;
      if (this.pending_submit) {
        this.onSent();
        this.pending_submit = false;
      }
    }, err => {
      this.nameChecking = false;
      this.storeName.setErrors({
        'server': true
      });
    //   this.serverMessage = 'opps, please try again';
    });
  }
  isFieldValid(field: string) {
    return !this.validationOnpopUpCreateStore.get(field).valid && this.validationOnpopUpCreateStore.get(field).touched;
  }
  onSent() {
    if (this.validationOnpopUpCreateStore.valid) {
      const model = this.validationOnpopUpCreateStore.value;

      this.userS.createFormGuest(model).subscribe(rsl => {
        if (rsl.status === 1) {
          //   swal(rsl.message);
          // swal('Pembuatan Toko Berhasil');
          // swal
          this.flagStatus();
          this.regSuccess = true;
        } else {
          swal(rsl.message);
        }
      });
    } else {
    //   swal('ops maaf ada kesalahan');
      this.validateAllFormFields(this.validationOnpopUpCreateStore);
    }
  }

  setVilage(villageId) {
    const postalId: string = this.villages.find(x => x.villageId === villageId).postal;
    this.validationOnpopUpCreateStore.patchValue({
      postal: postalId
    });
  }
  /*
  validasi jika tidak ingin menggunakan huruf only angka
  */
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onNameKeydown(event: any) {
  const pattern = /[a-zA-Z 0-9\+\- ]+/;

  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode !== 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
  this.validationOnpopUpCreateStore.get('name').valueChanges.subscribe(val => {
    val = val.replace(/\s+/g, '_').toLowerCase();
    this.validationOnpopUpCreateStore.patchValue({
    storeUrl: val
    });
  });
  }


  ngOnDestroy() {
    sessionStorage.setItem('boolean', 'false');
    console.log('asdsadsad');
   }


}
