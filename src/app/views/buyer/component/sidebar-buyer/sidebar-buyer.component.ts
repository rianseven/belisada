import { UpgradeService } from './../../../../core/service/upgrade/upgrade.service';
import { Upgrade } from './../../../../core/model/upgrade';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../core/model/category';
import { Category2 } from '../../../../core/model/category2';
import { CategoryService } from '../../../../core/service/category/category.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../../core/service/token/token.service';
import { ProfileService } from '../../../../core/service/profile/profile.service';
import swal from 'sweetalert2';
import { ShareService } from '../../../../core/service/shared.service';
import { FlagService } from '../../../../core/service/flag.service';


@Component({
  selector: 'app-sidebar-buyer',
  templateUrl: './sidebar-buyer.component.html',
  styleUrls: ['./sidebar-buyer.component.scss'],
})
export class SidebarBuyerComponent implements OnInit {

  updateImg: Boolean = false;

  c1: Category[];
  c2: Category2[];
  imgTop: any;
  navigationObjects: any[] = [];
  editProfile: any;

  buyerName: string;
  buyerEmail: string;
  buyerImage: string;
  lang: any;

  message: string;

  fm: any = {};
  userImgAvatar: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private profileService: ProfileService,
    private tokenService: TokenService,
    private upgradeService: UpgradeService,
    private shareService: ShareService,
    private flagService: FlagService
  ) { }

  ngOnInit() {
    this.lang = localStorage.getItem('languange');
    this.getProfileBuyer();
    this.getNavigationCategory();
    this.uploadPhoto();
    this.fillForms();
  }

  fillForms() {
    const luser = JSON.parse(localStorage.getItem('user'));
    this.profileService.getProfileBuyer(luser.token).subscribe(data => {

      // console.log('ini data: ', data);

      this.fm = {
        name : data.name,
        address: data.address,
        postal: data.postal,
        npwp : data.npwp,
        phone : data.phone,
        idcard: data.idcard,
        villageId: data.villageId,
      }

      this.userImgAvatar = data.imageAvatar ?'data:image/png;base64,' + data.imageAvatar : '/assets/img/kristy.png';
      const sharedData = {
        image: this.userImgAvatar,
        name: this.fm.name,
        email: this.fm.email
      };
    });
  }

  setCanvas(e, newIMG) {
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.target;
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.fm[newIMG] = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');

    this.profileService.updatebuyerProfile(this.fm).subscribe(data => {

      if (data.status === '1') {
        swal(
          'Success',
          'Upload Photo berhasil',
          'success'
        )
      }else {
        swal(
          'Opps!',
          data.message,
          'error'
        );
      }

    });

    this.flagService.changeMessage('upload-photo');
  }

  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;

    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }


  uploadPhoto() {
    this.flagService.currentMessage.subscribe(respon => {
      this.message = respon;
      if (this.message === 'upload-photo') {
        this.getProfileBuyer();
      }
    });
  }

  getCategoryOne(cb) {
    this.categoryService.CategoryOne().subscribe(data => {
      this.c1 = data;
      cb();
    });
  }

  getCategoryTwo(categoryOneId, cb) {
    this.categoryService.CategoryTwo(categoryOneId).subscribe(data => {
      this.c2 = data;
      cb();
    });
  }

  getNavigationCategory() {
    this.getCategoryOne(() => {
      this.c1.forEach((item, index) => {
        this.navigationObjects.push(item);
        this.getCategoryTwo(item.mProductCategoryId, () => {
          this.navigationObjects[index]['c2'] = this.c2;
        });

      });
    });
  }

  editProfileBuyer() {
    this.router.navigate(['/buyer/profile-buyer']);
  }

  getProfileBuyer() {
    this.profileService.getProfileBuyer(this.tokenService.getToken()).subscribe(data => {
      this.buyerName = data.name;
      this.buyerEmail = data.email;
      // this.buyerImage = 'data:image/png;base64,' + data.imageAvatar;
    });
  }


  goSeller() {
    this.router.navigateByUrl('/buyer');
    const user = JSON.parse(localStorage.user);
    if (user.role === 3 || user.role === 2) {
      this.router.navigateByUrl('/seller/dashboard');
    } else {

      swal({
        title: 'Warning',
        text: 'Anda belum menjadi Seller. Apakah Anda ingin mendaftar sebagai Seller?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1d7d0a',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Daftar Sebagai Seller'
      }).then((result) => {
        if (result.value) {
            this.router.navigateByUrl('/buyer/seller-propose');
        } else {
            return false;
        }
      });

   }

  }

  goDashboard() {
    this.router.navigateByUrl('/buyer/dashboard');
  }

  goWishlist() {
    this.router.navigateByUrl('/buyer/wishlist-buyer');
  }

  goInbox() {
    this.router.navigateByUrl('/buyer/inbox-buyer');
  }

  goBilling() {
    this.router.navigateByUrl('/buyer/billingAddress');
  }

  goShipping() {
    this.router.navigateByUrl('/buyer/shippingAddress');
  }

  goTransaction() {
    this.router.navigateByUrl('/buyer/transaction-buyer');
  }

  goChangePassword() {
    this.router.navigateByUrl('/buyer/change-password');
  }
  // goSeller() {

  //   const user = JSON.parse(localStorage.user);
  //   this.router.navigateByUrl('/buyer/dashboard');

  //   if (user.role === 3 || user.role === 2) {
  //     this.router.navigateByUrl('/seller/dashboard');
  //   } else {

  //     swal({
  //       title: 'Warning',
  //       text: 'Anda belum menjadi Seller. Apakah Anda ingin mendaftar sebagai Seller?',
  //       type: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#1d7d0a',
  //       cancelButtonColor: '#d33',
  //       cancelButtonText: 'Tidak',
  //       confirmButtonText: 'Daftar Sebagai Seller'
  //     }).then((result) => {
  //       if (result.value) {
  //         const data = {
  //           userType: '1'
  //         };
  //         this.upgradeService.upToSeller(data).subscribe(response => {
  //           this.router.navigateByUrl('/seller/dashboard');
  //         });

  //        // this.router.navigateByUrl('/register');
  //       } else {
  //           return false;
  //       }
  //     });

  //   }

  // }

}
