import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-keyboard-training',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './keyboard-training.component.html',
  styleUrl: './keyboard-training.component.scss'
})
export class KeyboardTrainingComponent {
  @Input() key : string[] | string = []
}
