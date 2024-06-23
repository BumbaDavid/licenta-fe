import {Input, Component, Output, EventEmitter, OnInit} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrationData} from "../models/models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginTab: boolean = true;
  error: string | null | undefined;
  loginError: string | null | undefined;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  registerForm: FormGroup;

  @Output() submitEM = new EventEmitter();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email])
    }, {validators: this.passwordMatchValidator})
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loginTab = params['register'] !== 'true';
    })
  }


  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { passwordMismatch: true};
  }

  changeTab() {
    this.loginTab = !this.loginTab;
  }

  login() {
    this.loginError = null;
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          if (response.status === 202) {
            const { api_key, username, account_type } = response.body.data;
            localStorage.setItem('api_key', api_key)
            localStorage.setItem('username', username)
            localStorage.setItem('account_type', account_type)

            this.router.navigate(['/homepage']).then(() =>
              console.log('navigation to route successful'))
          }
        },
        error: (error) => {
          this.loginError = "*Username or password incorrect";
          console.log(this.loginError)
        }
      });
    }
  }
 submitRegister() {
   if (this.registerForm.valid) {
     const {username, password, userType, firstName, lastName, email} = this.registerForm.value;
     let dataToSend: RegistrationData = {username, password, account_type: userType, email};
     if(userType === 'user') {
       dataToSend = {...dataToSend, first_name: firstName, last_name: lastName}
     }
     this.authService.register(dataToSend).subscribe({
       next: api_key => {
         localStorage.setItem('api_key', api_key)
         localStorage.setItem('username', username)
       },
       error: error => console.error("error during registration : ", error)
     })
   } else {
     this.error = 'Please fill out the form correctly';
   }
 }
}
