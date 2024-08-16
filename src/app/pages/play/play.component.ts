import { Component } from '@angular/core';
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {AuthAlertComponent} from "../../components/auth-alert/auth-alert.component";

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    AuthAlertComponent
  ],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent {

  protected readonly faCircleInfo = faCircleInfo;
}
