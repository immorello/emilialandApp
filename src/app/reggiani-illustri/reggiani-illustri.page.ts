import { Component, OnInit } from '@angular/core';
import { FrontendService } from '../frontend.service';

@Component({
  selector: 'app-reggiani-illustri',
  templateUrl: './reggiani-illustri.page.html',
  styleUrls: ['./reggiani-illustri.page.scss'],
  standalone:false
})
export class ReggianiIllustriPage implements OnInit {

  constructor(private frontend:FrontendService) {}

  ngOnInit(): void {
    
  }
    
  onScroll(event: CustomEvent){
    this.frontend.setMessage(event);
    return
  }
}
