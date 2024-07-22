import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {KeyboardTrainingComponent} from "../../../components/keyboard-training/keyboard-training.component";
import {faCircleInfo, faX} from "@fortawesome/free-solid-svg-icons";
import {generate} from "../../../functions/generate";
import {KeyboardComponent} from "../../../components/keyboard/keyboard.component";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-custom-text',
  standalone: true,
  imports: [
    KeyboardComponent,
    KeyboardTrainingComponent,
    FormsModule,
    NgClass,
    FaIconComponent,
  ],
  templateUrl: './custom-text.component.html',
  styleUrl: './custom-text.component.scss'
})
export class CustomTextComponent {
  @ViewChild("inputText", {static: true}) inputText!: ElementRef;

  public key: string[] = [];
  public text: string[] = ["привет", "Арсен"];
  public value: string = "";
  public words: string[] = ["da", "ad"];

  public symbols: number = 0;
  public symbolsPerMin: number = 0;
  public wrongW: number = 0;
  public rightW: number = 0;
  public kombo: number = 0;
  public bestKombo: number = 0;

  public time: number = 60;
  public interval: any = 0;
  public isStart: boolean = false;
  public isEnd: boolean = false;

  public isModal = false;

  ngOnInit() {
    this.text = generate(this.words, 300)
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      this.key = [...this.key, e.code];

      setTimeout(() => {
        this.key = this.key.slice(1, this.key.length)
      }, 200)
    })
  }

  ngOnDestroy() {
    this.key = []
    window.removeEventListener("keydown", (e: KeyboardEvent) => {
    })

    clearInterval(this.interval)
  }

  handleInput() {
    const word = this.text[0]
    if (word === this.value) {
      this.rightW = this.rightW + 1
      this.symbols = this.symbols + word.length
      this.kombo = this.kombo + 1
      if (this.bestKombo < this.kombo) {
        this.bestKombo = this.kombo
      }
    } else {
      this.kombo = 0
      this.wrongW = this.wrongW + 1
      for (let i = 0; i < Math.min(this.value.length, word.length); i++) {
        if (word[0] !== this.value[0]) {
          this.symbols = this.symbols - 1
        }
        if (word[i] === this.value[i]) {
          this.symbols += 1
          continue
        }
        break
      }
    }

    this.symbols += 1
    this.value = ""
    if (this.text.length < 10) {
      this.text = [...this.text, ...generate(this.words, 100)]
    }
    this.text = this.text.slice(1, this.text.length)

  }

  setValue(e: Event): void {
    if (this.isEnd) return

    if (!this.isStart) {
      this.start()
    }

    const target: HTMLInputElement = e.target as HTMLInputElement

    if (target.value[0] === " ") {
      target.value = target.value.slice(1);
      return;
    }

    if (target.value.split("").at(-1) === " ") {
      this.handleInput()
      return;
    }
    this.value = target.value
  }

  intervalCalc() {
    this.time = this.time - 1

    if (!this.time) {
      this.isEnd = true;
      this.isModal = true;
      this.inputText.nativeElement.blur()
      clearInterval(this.interval)
      this.value = "конец"
    }

    this.symbolsPerMin = this.symbols / (60 - this.time) * 60;


  }

  start() {
    this.isStart = true
    this.interval = setInterval(() => {
      this.intervalCalc()
      console.log(typeof (this.interval))
    }, 1000)
  }

  setIsModal() {
    this.isModal = false;
  }

  restart() {
    this.text = generate(this.words, 300)
    this.time = 60
    this.symbols = 0
    this.isStart = false
    this.isEnd = false
    this.symbolsPerMin = 0
    this.value = this.value.slice(0, 0)
    this.wrongW = 0
    this.rightW = 0
    this.kombo = 0
    this.bestKombo = 0
    this.isModal = false
    clearInterval(this.interval)
  }

  protected readonly Math = Math;
  protected readonly faCircleInfo = faCircleInfo;

  protected readonly faX = faX;
}