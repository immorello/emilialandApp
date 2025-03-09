import { Component, OnInit } from '@angular/core';
import { FrontendService } from '../frontend.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.page.html',
  styleUrls: ['./recipies.page.scss'],
  standalone: false
})
export class RecipiesPage implements OnInit {

  constructor(private frontend: FrontendService) { }

  onScroll(event: CustomEvent) {
    this.frontend.setMessage(event);
    return
  }

  ngOnInit() {
  }

}
