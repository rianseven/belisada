import { TestingServicesService } from './../../../core/services/testService/testing-services.service';
import { ShareMessageService } from './../../../core/services/share-message/share-message.service';
import { Component, OnInit, Input, Output, OnChanges, EventEmitter, HostBinding, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ModelsComponent implements OnInit {
  // @HostBinding('class.is-open')
  @Input() myFunction: Function;
  @Input() closable = true;
  @Input() visible: boolean;
  @Input() minwidth: number;
  @Input() maxwidth: number;
  @Input() height?: number;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor (private _messageService: TestingServicesService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
  }

  close() {
    if (isPlatformBrowser(this.platformId)) {
      this.visible = false;
      this.visibleChange.emit(this.visible);
      sessionStorage.setItem('boolean', 'false');
      const data = sessionStorage.getItem('boolean');
      this._messageService.filter('Register click');
    }
  }

}
