import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { UsersListComponent } from "./users-list.component";

describe('jsonPlaceHolder Users-list component', () => {

    let usersList: Observable<User[]>
  
    beforeEach(() => { 
      TestBed.configureTestingModule({
        declarations:[UsersListComponent],
        providers: []
      });
    })

    it('should be true', ()  => {
        expect(true).toEqual(true)
    })
  
})