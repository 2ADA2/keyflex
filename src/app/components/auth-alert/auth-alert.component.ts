import {Component, inject} from '@angular/core';
import {Service} from "../../api/service";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-auth-alert',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './auth-alert.component.html',
  styleUrl: './auth-alert.component.scss'
})
export class AuthAlertComponent {
  public isAuth : boolean = false;
  public service : Service = inject(Service);

  constructor() {
    this.isAuth = this.service.isAuth();
    console.log(this.isAuth)
  }
}
