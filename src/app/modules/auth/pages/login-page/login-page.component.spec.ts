import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPageComponent } from './login-page.component';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [LoginPageComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TODO: Tu primer enunciado el cual debe de asegurar lo siguiente:
  //TODO: Debe de asegurarse que el formulario sea inválido cuando ingrese datos erroneos.

  //TODO: Patron AAA

  it('Deberia de retornar "invalido" el formulario', () => {
    //TODO: Arrange
    const mockCredentials = {
      email: '0x0x0x0x0x0x',
      password: '1111111111111111111111111111111'
    }
    const emailForm: any = component.formLogin.get('email')
    const passwordForm : any = component.formLogin.get('password')

    //TODO: Act
    emailForm?.setValue(mockCredentials.email)
    passwordForm?.setValue(mockCredentials.password)

    //TODO: Assert

    expect(component.formLogin.invalid).toBeTrue()
  });

  it('Deberia de retornar "valido" el formulario', () => {
    //TODO: Arrange
    const mockCredentials = {
      email: 'test@test.com',
      password: '12345678'
    }
    const emailForm: any = component.formLogin.get('email')
    const passwordForm : any = component.formLogin.get('password')

    //TODO: Act
    emailForm?.setValue(mockCredentials.email)
    passwordForm?.setValue(mockCredentials.password)

    //TODO: Assert

    expect(component.formLogin.invalid).toBeFalse()
  });
  it('El boton deberia de terner la palabra "Iniciar sesión"', ()=>{
      const elementRef = fixture.debugElement.query(By.css('.form-action button'))
      const getInnerText = elementRef.nativeElement.innerText

      expect(getInnerText).toEqual('Iniciar sesión')

  })
});
