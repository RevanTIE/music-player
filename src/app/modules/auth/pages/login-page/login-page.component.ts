import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false
  formLogin: FormGroup = new FormGroup({});
  constructor(private authService: AuthService, private cookie: CookieService,
    private router: Router){

  }
  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required, 
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required, 
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }
  sendLogin(): void{
    const { email, password }= this.formLogin.value
    this.authService.sendCredentials(email,password)
    //TODO: 200< 400
    .subscribe(
    {
      next: (responseOk) => { //TODO: Al ingresar las credenciales correctas
          console.log("Sesión iniciada correcta", responseOk)
          const {data, tokenSession} = responseOk;
          this.cookie.set('token', JSON.stringify(tokenSession), 4, "/")
          this.router.navigate(['/', 'tracks'])
          console.log('Este es el token: ', this.cookie.get('token'));
      },
      error: (err) => {//TODO: >= 400
        this.errorSession = true
        console.log("Error al ingresar")
      }
    })
  }
}
