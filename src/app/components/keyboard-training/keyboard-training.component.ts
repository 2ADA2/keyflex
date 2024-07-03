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
  public isCapsOn : boolean = false

  ngOnInit (): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => this.checkCaps(e))
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', (e:KeyboardEvent) => this.checkCaps(e))
  }

  checkCaps(e:KeyboardEvent){
    this.isCapsOn = e.getModifierState("CapsLock")
  }
}
