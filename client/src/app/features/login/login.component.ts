import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  authSubscription!: Subscription;

  constructor(private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        alert('You are successfully registered! Please, login!')
      } else if (params['accessDenied']) {
        alert('Please sign in or sign up!')
      }
    })
  }

  ngOnDestroy(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe()
  }

  form = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  });

  get username() {
    return this.form.controls.username as FormControl
  }
  get password() {
    return this.form.controls.password as FormControl
  }

  onSubmit() {
    const user = {
      username: this.form.value.username as string,
      password: this.form.value.password as string
    }
    this.authSubscription = this.auth.login(user).subscribe(
      () => this.router.navigate(['/dashboard'])
    )
  }
}