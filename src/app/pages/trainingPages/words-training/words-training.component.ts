import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {KeyboardComponent} from "../../../components/keyboard/keyboard.component";
import {KeyboardTrainingComponent} from "../../../components/keyboard-training/keyboard-training.component";

@Component({
  selector: 'app-words-training',
  standalone: true,
  imports: [
    KeyboardComponent,
    KeyboardTrainingComponent
  ],
  templateUrl: './words-training.component.html',
  styleUrl: './words-training.component.scss'
})
export class WordsTrainingComponent {
  public route: ActivatedRoute = inject(ActivatedRoute)
  public type: string = "standart"
  public key: string[] = []

  constructor() {
    this.type = this.route.snapshot.params['type'];
  }

  ngOnInit() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      this.key = [...this.key, e.code];
      setTimeout(() => {
        this.key = this.key.slice(1, this.key.length)
      },200)
    })
  }

  ngOnDestroy() {
    this.key = []
  }
}
