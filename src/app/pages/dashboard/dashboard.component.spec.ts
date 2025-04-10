import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    mockUserService = jasmine.createSpyObj('UserService', ['getUserData']);

    TestBed.configureTestingModule({
      declarations: [],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call UserService.getUserData on component initialization', () => {
    const userMock: User = {
      id: 1,
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jan.kowalski@gmail.com',
      username: 'Jan Kowalski',
    };
    mockUserService.getUserData.and.returnValue(of(userMock));

    fixture.detectChanges();

    expect(mockUserService.getUserData).toHaveBeenCalled();
    component.user$.subscribe((user) => {
      console.log(user);
      expect(user).toEqual(userMock);
    });
  });

  it('should handle empty or null user data', () => {
    mockUserService.getUserData.and.returnValue(of());

    fixture.detectChanges();

    component.user$.subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('should handle errors from UserService.getUserData', () => {
    const errorMessage = 'Failed to load user data';
    mockUserService.getUserData.and.throwError(errorMessage);

    fixture.detectChanges();

    component.user$.subscribe({
      next: () => fail('should have failed with error'),
      error: (err) => expect(err.message).toContain(errorMessage),
    });
  });
});
