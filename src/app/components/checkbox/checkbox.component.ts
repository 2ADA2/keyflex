import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input("checked") checked: boolean = false
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter()

  handleClick(){
    this.checkedChange.emit(!this.checked)
    this.checked = !this.checked
  }
}
