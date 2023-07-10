import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeService } from 'src/app/core/services/node.service';

@Component({
  selector: 'app-node-landing',
  templateUrl: './node-landing.component.html',
  styleUrls: ['./node-landing.component.scss']
})
export class NodeLandingComponent implements OnInit {

  date!: Observable<any>

  constructor( private nodeServ: NodeService) { }

  ngOnInit(): void {
    this.date = this.nodeServ.getDate()
  }

  send(){
    this.nodeServ.sendData()
  }

}
