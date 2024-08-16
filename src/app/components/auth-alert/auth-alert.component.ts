import {Component, inject} from '@angular/core';
import {Service} from "../../api/service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-auth-alert',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './auth-alert.component.html',
  styleUrl: './auth-alert.component.scss'
})
export class AuthAlertComponent {
  public isAuth : boolean = false;
  public service : Service = inject(Service);

  constructor() {
    this.isAuth = this.service.isAuth();
  }
}
