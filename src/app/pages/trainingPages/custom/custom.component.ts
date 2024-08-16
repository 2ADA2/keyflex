import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {KeyboardTrainingComponent} from "../../../components/keyboard-training/keyboard-training.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {generate} from "../../../functions/generate";
import {KeyboardComponent} from "../../../components/keyboard/keyboard.component";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {faCircleInfo, faGear, faX} from "@fortawesome/free-solid-svg-icons";
import {CheckboxComponent} from "../../../components/checkbox/checkbox.component";
import {AuthAlertComponent} from "../../../components/auth-alert/auth-alert.component";
import {Service} from "../../../api/service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [
    KeyboardComponent,
    KeyboardTrainingComponent,
    FormsModule,
    NgClass,
    FaIconComponent,
    RouterLink,
    CheckboxComponent,
    AuthAlertComponent,
  ],
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.scss'
})
export class CustomComponent {
  @ViewChild("inputText", {static: true}) inputText!: ElementRef;
  @ViewChild("inputSettings", {static: true}) inputSettings!: ElementRef;
  public service = inject(Service)

  public type: string = "custom";
  public key: string[] = [];
  public text: string[] = ["привет", "Арсен"];
  public value: string = "";
  public words: string[] = []
  public isSymbols: boolean = false
  public isSettings: boolean = false;
  public settingsValue: string = localStorage.getItem("settingsValue") || "привет это твой тренажёр";

  public symbols: number = 0;
  public symbolsPerMin: number = 0;
  public wrongW: number = 0;
  public rightW: number = 0;
  public kombo: number = 0;
  public bestKombo: number = 0;

  public time: number = 60;
  public interval: number = 0;
  public isStart: boolean = false;
  public isEnd: boolean = false;
  public isRandom: boolean = (localStorage.getItem("random") === "true") ? true : false;

  public isModal = false;

  ngOnInit() {
    this.words = this.settingsValue.split(" ")
    if (this.words[0] === "") this.words = ['укажите хотя бы одно слово']
    if (this.text.length < 10) {
      this.isRandom ?
        this.text = generate(this.words, 300, this.isSymbols) :
        this.text = this.words
    }

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
    if (this.words.length === 0 || this.words[0] === "") {
      return
    }
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
      this.isRandom ?
        this.text = [...this.text, ...generate(this.words, 100, this.isSymbols)] :
        this.text = [...this.text, ...this.words]
    }
    this.text = this.text.slice(1, this.text.length)

  }

  setValue(e: Event): void {
    if (this.isEnd) return
    if (this.isSettings) return

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
      this.service.saveStats({
        symbols: this.symbols,
        accuracy: Number((this.rightW / (this.rightW + this.wrongW) * 100).toFixed(2)) || 0,
        type: this.type
      })
    }

    this.symbolsPerMin = this.symbols / (60 - this.time) * 60;
  }

  start() {
    if (this.isSettings) return
    if (this.words.length === 0 || this.words[0] === "") {
      this.text = ["укажите хотя бы одно слово!"]
      return
    }
    this.isStart = true
    this.interval = setInterval(() => {
      this.intervalCalc()
    }, 1000)
  }

  setIsModal() {
    this.isModal = false;
  }

  restart() {
    if (this.isRandom) {
      this.text = generate(this.words, 300, this.isSymbols)
    } else {
      this.text = this.words
    }
    this.time = 60
    this.symbols = 0
    this.isStart = false
    this.isEnd = false
    this.symbolsPerMin = 0
    this.value = ""
    this.inputText.nativeElement.value = ""
    this.wrongW = 0
    this.rightW = 0
    this.kombo = 0
    this.bestKombo = 0
    this.isModal = false
    clearInterval(this.interval)
  }

  setSettings() {
    let value: string = this.inputSettings.nativeElement.value
    if (value) {
      this.words = value.split(" ").map(e => e.split(`\n`)).flat(2).filter(e => e !== "")
      this.settingsValue = this.words.join(" ")
      this.inputSettings.nativeElement.value = this.settingsValue
    } else {
      this.words = ["укажите хотя бы одно слово"]
    }

    this.isSettings = !this.isSettings
    if (this.isSettings) {
      this.restart()
      this.text = ["вы в настройках"]
      return
    }
    this.restart()
  }

  handleSettings() {
    let value: string = this.inputSettings.nativeElement.value
    if (value.at(-1) === `\n`) {
      this.setSettings()
    }

    this.settingsValue = value
    localStorage.setItem("settingsValue", value)
  }

  setRandom() {
    this.isRandom = !this.isRandom
    localStorage.setItem("random", JSON.stringify(this.isRandom))
  }

  protected readonly Math = Math;
  protected readonly faX = faX;
  protected readonly faCircleInfo = faCircleInfo;
  protected readonly faGear = faGear;
}

