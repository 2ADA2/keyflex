import { Component } from '@angular/core';
import {DemoComponent} from "../../components/demo/demo.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    DemoComponent,
    RouterLink
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent {

}
