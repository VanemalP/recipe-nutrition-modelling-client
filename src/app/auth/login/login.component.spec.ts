import { AuthService } from './../../core/services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/core/services/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  const fb: FormBuilder = new FormBuilder();

  const notificator = jasmine.createSpyObj('NotificatorService', ['success']);
  const auth = jasmine.createSpyObj('AuthService', ['login']);
  const router = jasmine.createSpyObj('Router', ['navigate']);

  const user = {username: 'Chef', password: 'Z', lastName: 'A'};

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: FormBuilder,
          useValue: fb
        },
        {
          provide: NotificatorService,
          useValue: notificator
        },
        {
          provide: AuthService,
          useValue: {...auth, user$: of(user)}
        },
        {
          provide: HttpClient,
          useValue: {},
        },
        {
          provide: StorageService,
          useValue: {}
        },
        {
          provide: JwtHelperService,
          useValue: {},
        },
      ]
    });
  });


  afterEach(() => {
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });

  it('should be defined', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeDefined();
  });

  it('should initialize login form', () => {
  fixture = TestBed.createComponent(LoginComponent);
  component = fixture.debugElement.componentInstance;
  component.loginForm = fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  expect(component.loginForm.value).toEqual({username: '', password: ''});
 });

  it('should logged a user with correct data', async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;

    await fixture.detectChanges();

    expect(component.loggedUser).toEqual(user);
    await fixture.destroy();
   });

  describe('login()', () => {
    it('auth.login() should be called once with user data', async () => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.debugElement.componentInstance;

      auth.login.calls.reset();
      auth.login.and.returnValue(of(user));

      component.login(user);

      await fixture.detectChanges();
      notificator.success.and.returnValue('Success');
      await fixture.detectChanges();
      router.navigate.and.returnValue(['/recipes']);

      expect(auth.login).toHaveBeenCalledWith(user);
      await fixture.destroy();
      expect(auth.login).toHaveBeenCalledTimes(1);
      await fixture.destroy();
     });
   });

});

