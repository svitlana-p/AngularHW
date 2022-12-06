import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() header!: string;
  @Input() buttonName!: string;
  @Input() emailRequired!: boolean;

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
  form = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  });

  get username() {
    return this.form.controls.username as FormControl
  }
  get email() {
    return this.form.controls.email as FormControl
  }
  get password() {
    return this.form.controls.password as FormControl
  }

  onSubmit() {
    if (this.buttonName === 'Log In') {
      const user = {
        username: this.form.value.username as string,
        password: this.form.value.password as string
      }
      this.authSubscription = this.auth.login(user).subscribe(
        () => this.router.navigate(['/dashboard'])
      )
    }
    if (this.buttonName === 'Sign Up') {
      const user = {
        username: this.form.value.username as string,
        email: this.form.value.email as string,
        password: this.form.value.password as string
      }
      this.authSubscription = this.auth.register(user).subscribe(
        () => {
          this.router.navigate(['/login'], {
            queryParams: {
              registered: true
            }
          })
        }
      )
    }
  }

  ngOnDestroy(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe()
  }

}
