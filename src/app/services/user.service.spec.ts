import { UserService } from './user.service';
import { TestBed } from '@angular/core/testing';
import { User } from '../interfaces/user.interface';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    id: 1,
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@gmail.com',
    username: 'Jan Kowalski',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data from API', () => {
    service.getUserData().subscribe((userData: User) => {
      expect(userData).toEqual(mockUser);
    });

    const req = httpMock.expectOne('user-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});
