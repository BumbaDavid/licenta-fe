import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
  constructor(private authService: AuthService, private router: Router) {
  }
  submit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authService.login(username, password).subscribe(
        apiKey => {
          localStorage.setItem('api_key', apiKey);
          this.router.navigate(['/homepage']).then(() => {
            console.log('navigation to route successful');
          });

        });
    }
  }
}
