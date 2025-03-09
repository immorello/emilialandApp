import { Component, OnInit } from '@angular/core';
import { FrontendService } from '../frontend.service';
@Component({
  selector: 'app-storie-reggiane',
  templateUrl: './storie-reggiane.page.html',
  styleUrls: ['./storie-reggiane.page.scss'],
  standalone:false
})
export class StorieReggianePage implements OnInit {

  constructor(private frontend: FrontendService) { }

  onScroll(event: CustomEvent) {
    this.frontend.setMessage(event);
    return
  }

  ngOnInit() {
  }

}
