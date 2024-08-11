import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Service} from "../../api/service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FaIconComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  service : Service = inject(Service)
  router : Router = inject(Router)

  form= new FormGroup({
    login: new FormControl(null),
    password: new FormControl(null),
  })

  onSubmit(){
    //@ts-ignore
    this.service.login({username:this.form.value.login, password:this.form.value.password})
      .subscribe(() => {
        this.router.navigate(['/profile'])
      })
  }

  googleLogin(e:any){
    e.preventDefault()
  }

  protected readonly faGoogle = faGoogle;
}
