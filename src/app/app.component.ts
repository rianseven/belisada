import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Globals } from '@belisada/core/services';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ChatService } from './core/services/globals/chat.service';
import { MessagingService } from './shared/messaging.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <div class="loading" *ngIf="globals.isLoading === true"></div>
    <div class="chat-wrapper" *ngIf="globals.showChat === true">
      <app-chat></app-chat>
    <div>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  message;

  constructor(
    public globals: Globals,
    titleService: Title,
    router: Router,
    activatedRoute: ActivatedRoute,
    _chatService: ChatService,
    private messagingService: MessagingService
  ) {
    globals.socket = _chatService.connectSocket();
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        const title = this.getTitle(router.routerState, router.routerState.root).join('-');
        console.log('title', title);
        titleService.setTitle(title);
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
