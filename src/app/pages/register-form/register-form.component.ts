import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Service} from "../../api/service";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

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
  form= new FormGroup({
    login: new FormControl(null),
    password: new FormControl(null),
    password_repeat: new FormControl(null),
    email: new FormControl(null),
  })

  onSubmit(){
    if(this.form.value.password === this.form.value.password_repeat && this.form.valid){
      //@ts-ignore
      this.service.register({name:this.form.value.login, password:this.form.value.password, email:this.form.value.email})
        .subscribe(() => {
          this.router.navigate(['/login'])
        })
    }
  }

    protected readonly faGoogle = faGoogle;
}
