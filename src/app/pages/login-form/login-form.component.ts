import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Service} from "../../api/service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faGear, faX} from "@fortawesome/free-solid-svg-icons";
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
  service: Service = inject(Service)
  router: Router = inject(Router)
  error: string | null = null
  form: FormGroup = new FormGroup({
    login: new FormControl(""),
    password: new FormControl(""),
  })

  clear(){
    this.error = null
  }

  onSubmit() {
    this.error = null

    setTimeout(() => {

      if (this.form.value.login.length < 3) {
        this.error = "некорректный логин"
      } else if (this.form.value.password.length < 6) {
        this.error = "некорректный пароль"
      }

      if (!this.error) {
        //@ts-ignore
        this.service.login({username: this.form.value.login, password: this.form.value.password})
          .subscribe(() => {
            this.router.navigate(['/profile'])
          })
      }
    })
  }

  googleLogin(e: any) {
    e.preventDefault()
  }

  protected readonly faGoogle = faGoogle;
  protected readonly faX = faX;
}
