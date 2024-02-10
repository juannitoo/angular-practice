import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { NodeUser } from 'src/app/core/interfaces/node-user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { NodeService } from 'src/app/core/services/node.service';

@Component({
  selector: 'app-node-landing',
  templateUrl: './node-landing.component.html',
  styleUrls: ['./node-landing.component.scss']
})
export class NodeLandingComponent implements OnInit, OnDestroy {

  users$! : Observable<NodeUser[]> 
  email$! : Observable<NodeUser | null> | null

  private deleteSubscription!: Subscription

  constructor( private nodeServ: NodeService,
                private router: Router,
                private authService: AuthService,
                ) { }

  ngOnInit(): void {
    this.users$ = this.nodeServ.getUsers()
    this.email$ = this.nodeServ.getUser()
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription) this.deleteSubscription.unsubscribe()
  }

  onLogOut(){
    const userId = this.authService.getUserId()
    if (userId) {
      this.authService.logout(userId)
      this.router.navigateByUrl('/')
    } else {
      console.error("onLogout: pas de userId")
    }
  }

  onDeleteAccount(){
    this.deleteSubscription = this.nodeServ.deleteAccount().subscribe({
      next : (response) => { this.router.navigateByUrl('/') },
      error : (err) => {console.log(err)}
    })
  }

}
