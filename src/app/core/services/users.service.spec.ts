import { User } from './../../common/models/user';
import { ActivityData } from './../../common/models/activity-data';
import { Activity } from './../../common/models/activity';
import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { of } from 'rxjs';

describe('UsersService', () => {
  const http = jasmine.createSpyObj('HttpClient', ['get', 'delete']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: HttpClient,
        useValue: http,
      }
    ]
  }));

  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });

  it('getUser should call http.get', () => {
    http.get.calls.reset();
    http.get.and.returnValue(of(''));
    const service: UsersService = TestBed.get(UsersService);

    service.getUser('username').subscribe(
      () => {
        expect(http.get).toHaveBeenCalledTimes(1);
      },
    );
  });

  it('getUser should return the user', () => {
    const date = new Date();
    const user: User =  {
      id: 'id',
      username: 'username',
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      joined: date,
      following: ['username1'],
      followers: [],
      role: 'admin',
      banStatus: {
        isBanned: false,
        description: null,
        expDate: null,
        id: 'id',
        user: 'user',
      },
    };

    http.get.and.returnValue(of(user));
    const service: UsersService = TestBed.get(UsersService);

    service.getUser('userId').subscribe(
      (res) => {
        expect(res).toEqual(user);
      },
    );
  });
});
