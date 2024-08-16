import { Component } from '@angular/core';
import {DemoComponent} from "../../components/demo/demo.component";
import {RouterLink} from "@angular/router";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {AuthAlertComponent} from "../../components/auth-alert/auth-alert.component";

@Component({
  selector: 'app-training',
  standalone: true,
    imports: [
        DemoComponent,
        RouterLink,
        FaIconComponent,
        AuthAlertComponent
    ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent {

    protected readonly faCircleInfo = faCircleInfo;
}
