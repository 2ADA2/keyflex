import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Service} from "../../api/service";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
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
    this.service.login({name:"ada22", password:"ada22"})
      .subscribe(() => {
        this.router.navigate(['/profile'])
      })
  }
}
