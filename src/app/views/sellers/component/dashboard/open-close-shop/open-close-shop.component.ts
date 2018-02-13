import { StoreService } from './../../../../../core/service/store/store.service';
import { Component, OnInit } from '@angular/core';
import { FlagService } from '../../../../../core/service/flag.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-open-close-shop',
  templateUrl: './open-close-shop.component.html',
  styleUrls: ['./open-close-shop.component.scss']
})
export class OpenCloseShopComponent implements OnInit {
  createComForm: FormGroup;
  dateStart: FormControl;
  dateEnd: FormControl;
  isOffDay: FormControl;
  mBpartnerStoreId: FormControl;
  dayOffNote: FormControl;
  modal: boolean;
  storeId: number;
  isOff: string;
  stores: any[] = [];

  isClose: any;

  constructor(
    private storeService: StoreService,
    private flagService: FlagService
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.getAllStore();
  }

  getAllStore() {
    this.storeService.getAll().subscribe(response => {
      this.stores = response;
      this.isOff = 'Y';

      this.isOffDay.setValue('Y');
      this.mBpartnerStoreId.setValue(response[0].mBpartnerStoreId);

      this.storeId = response[0].mBpartnerStoreId;
      this.storeService.cekOpenClose(this.storeId).subscribe(respon => {
        this.isClose = respon.status;
      });

    });
  }

  createFormControls() {
    this.dateStart = new FormControl('');
    this.dateEnd = new FormControl('');
    this.isOffDay = new FormControl('');
    this.mBpartnerStoreId = new FormControl('');
    this.dayOffNote = new FormControl('');
  }

  createForm() {
    this.createComForm = new FormGroup({
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      isOffDay: this.isOffDay,
      mBpartnerStoreId: this.mBpartnerStoreId,
      dayOffNote: this.dayOffNote,
    });
  }

  onSubmit() {
    const model = this.createComForm.value;
    const data = {
      dateStart: this.formateDate(model.dateStart),
      dateEnd: this.formateDate(model.dateEnd),
      isOffDay: model.isOffDay,
      mBpartnerStoreId: model.mBpartnerStoreId,
      dayOffNote: model.dayOffNote,
    };

    if (model.dateStart === '' || model.dateEnd === '') {
      swal(
        'Gagal',
        'Anda belum mengisi tanggal tutup',
        'error'
      );
      this.flagService.changeMessage('close-popup');
    } else {

      this.storeService.openClose(data).subscribe(response => {
        if (response.status === '1') {
          swal(
            'Sukses',
            'Toko berhasil ditutup',
            'success'
          );
        }else {
          swal(
            'Opps!',
            response.message,
            'error'
          );
        }
        this.flagService.changeMessage('close-popup');
      });

    }

  }

  openShop() {
    this.flagService.changeMessage('close-popup');
    swal({
      title: 'Toko Dibuka',
      text: 'Anda yakin toko akan dibuka.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Iya'
    }).then((result) => {
      if (result.value) {

        this.storeService.getAll().subscribe(response => {

          const data = {
            dateStart: '',
            dateEnd: '',
            isOffDay: 'N',
            mBpartnerStoreId: response[0].mBpartnerStoreId,
            dayOffNote: '',
          };

          this.storeService.openClose(data).subscribe(respon => {
            if (respon.status === '1') {
              swal(
                'Sukses',
                'Toko berhasil dibuka',
                'success'
              );

              this.flagService.changeMessage('close-popup');

            }else {
              swal(
                'Opps!',
                respon.message,
                'error'
              );
            }
          });
        });
      }
    });
  }

  formateDate(date: string) {
    const tempArrDate = date.split('-');
    console.log('tempArrDate: ', tempArrDate);

    return tempArrDate[2] + '-' + tempArrDate[1] + '-' + tempArrDate[0];
  }
}



