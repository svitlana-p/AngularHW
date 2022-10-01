import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() header!:string;
  @Input() buttonName!:string;
  @Input() email!: boolean;

  form!: FormGroup;
  aSub!: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.route.queryParams.subscribe((params: Params) => {
      if(params['registered']) {

      } else if (params['accessDenied']) {

      }
    })
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
          // this.form.enable()
        // }
      )
    }
    if(this.buttonName === 'Sign Up') {
      this.auth.register(this.form.value).subscribe(
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
