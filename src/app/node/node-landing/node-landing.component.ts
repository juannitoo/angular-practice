import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { NodeService } from 'src/app/core/services/node.service';

@Component({
  selector: 'app-node-landing',
  templateUrl: './node-landing.component.html',
  styleUrls: ['./node-landing.component.scss']
})
export class NodeLandingComponent implements OnDestroy {

  private suppressSubscription!: Subscription

  constructor( private nodeServ: NodeService,
                private router: Router,
                private authService: AuthService,
                ) { }

  ngOnDestroy(): void {
    if (this.suppressSubscription) this.suppressSubscription.unsubscribe()
  }

  send(){
    this.nodeServ.sendData()
  }

  onLogOut(){
    this.authService.logout()
    this.router.navigateByUrl('/')
  }

  onDeleteAccount(){
    this.suppressSubscription = this.authService.deleteAccount().subscribe({
      next : (response) => {
        console.log(response),
        this.router.navigateByUrl('/')
      },
      error : (err) => {console.log(err)}
    })
  }

}
