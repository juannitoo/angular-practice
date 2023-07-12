import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { NodeService } from 'src/app/core/services/node.service';

@Component({
  selector: 'app-node-landing',
  templateUrl: './node-landing.component.html',
  styleUrls: ['./node-landing.component.scss']
})
export class NodeLandingComponent implements OnInit {

  date!: Observable<any>

  constructor( private nodeServ: NodeService,
                private router: Router,
                private authService: AuthService) { }

  ngOnInit(): void {
    this.date = this.nodeServ.getDate()
  }

  send(){
    this.nodeServ.sendData()
  }

  onLogOut(){
    this.authService.logout()
    this.router.navigateByUrl('/')
  }

}
