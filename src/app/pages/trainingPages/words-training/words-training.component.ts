import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {KeyboardComponent} from "../../../components/keyboard/keyboard.component";
import {KeyboardTrainingComponent} from "../../../components/keyboard-training/keyboard-training.component";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-words-training',
  standalone: true,
  imports: [
    KeyboardComponent,
    KeyboardTrainingComponent,
    FormsModule,
    NgClass
  ],
  templateUrl: './words-training.component.html',
  styleUrl: './words-training.component.scss'
})

export class WordsTrainingComponent {
  public route: ActivatedRoute = inject(ActivatedRoute)
  public type: string = "standart"
  public key: string[] = []
  public text: string[] = ["около", "особенный", "прямоугольник", "фиолетовый"]
  public symbols : number = 0
  public value : string = ""

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
    window.removeEventListener("keydown", (e: KeyboardEvent) => {})
  }

  handleInput(){
    const word = this.text[0]
    for(let i = 0; i < Math.min(this.value.length, word.length); i++){
      if(word[i] === this.value[i]) {
        this.symbols += 1
        continue
      }
      break
    }
    this.symbols += 1
    this.text = this.text.slice(1, this.text.length)
    this.value = ""
  }

  setValue (e: Event): void {
    if(!this.text.length) return

    const target : HTMLInputElement = e.target as HTMLInputElement

    if(target.value[0] === " "){
      target.value = target.value.slice(1);
      return;
    }

    if(target.value.split("").at(-1) === " "){
      this.handleInput()
      return;
    }
    this.value = target.value

  }

  protected readonly Math = Math;
}
