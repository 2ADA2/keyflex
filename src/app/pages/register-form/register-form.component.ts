import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Service} from "../../api/service";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCross, faX} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    FaIconComponent
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  service : Service = inject(Service)
  router : Router = inject(Router)
  error : string | null = null
  form: FormGroup= new FormGroup({
    login: new FormControl(""),
    password: new FormControl(""),
    password_repeat: new FormControl(""),
    email: new FormControl(""),
  })

  clear(){
    this.error = null
  }

  onSubmit(){
    this.error = null

    setTimeout(() => {

      if(this.form.value.login.length < 3){
        this.error = "неверно указан логин (3+ значений)"
      } else if(!this.form.value.email.includes("@") || !this.form.value.email.includes(".com") || this.form.value.email[0] === ("@")) {
        this.error = "неверно указан email"
      } else if(this.form.value.password.length < 6) {
        this.error = "усложните пароль ( от 6 значений)"
      }else if(this.form.value.password !== this.form.value.password_repeat) {
        this.error = "Пароли не совпадают"
      }

      if(!this.error){
        //@ts-ignore
        this.service.register({name:this.form.value.login, password:this.form.value.password, email:this.form.value.email})
          .subscribe(() => {
            this.router.navigate(['/login'])
          })
      }

    }, 1)
  }

  protected readonly faGoogle = faGoogle;
  protected readonly faCross = faCross;
  protected readonly faX = faX;
}
