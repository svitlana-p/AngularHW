import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() header!:string;
  @Input() buttonName!:string;
  @Input() emailRequired!: boolean;

  form!: FormGroup;
  aSub!: Subscription;

  

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
    });
    this.route.queryParams.subscribe((params: Params) => {
      if(params['registered']) {
        alert('You are successfully registered! Please, login!')
      } else if (params['accessDenied']) {
        alert('Please sign in or sign up!')
      }
    })
  }
  get username() {
    return this.form.controls.username as FormControl
  }
  get email() {
    return this.form.controls.email as FormControl
  }
  get password() {
    return this.form.controls.password as FormControl
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }    
  }
 

  onSubmit() {
    // this.form.disable()
    if(this.buttonName === 'Log In') {
    this.aSub = this.auth.login(this.form.value).subscribe(
        () => this.router.navigate(['/dashboard']),
        // error=>{
        //   console.warn(error)
         
        //   this.form.enable()
        // }
      )
    }
    if(this.buttonName === 'Sign Up') {
      this.aSub = this.auth.register(this.form.value).subscribe(
        () => { 
          this.router.navigate(['/login'], {
            queryParams: {
              registered: true
            }
          })
        },
        // error=>{
        //   console.warn(error)
        //   this.form.enable()
        // }
      )
    }
  }

}
