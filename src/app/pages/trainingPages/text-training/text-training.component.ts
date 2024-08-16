import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {KeyboardComponent} from "../../../components/keyboard/keyboard.component";
import {KeyboardTrainingComponent} from "../../../components/keyboard-training/keyboard-training.component";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCircleInfo, faCross, faX} from "@fortawesome/free-solid-svg-icons";
import {generateText} from "../../../functions/generateText";
import {AuthAlertComponent} from "../../../components/auth-alert/auth-alert.component";
import {Service} from "../../../api/service";

@Component({
  selector: 'app-text-training',
  standalone: true,
    imports: [
        KeyboardComponent,
        KeyboardTrainingComponent,
        FormsModule,
        NgClass,
        FaIconComponent,
        RouterLink,
        AuthAlertComponent,
    ],
  templateUrl: './text-training.component.html',
  styleUrl: './text-training.component.scss'
})

export class TextTrainingComponent {
  @ViewChild("inputText", { static: true }) inputText!: ElementRef;
  public service = inject(Service)

  public key: string[] = [];
  public text: string[] = ["загрузка..."];
  public value: string = "";

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

  public isModal = false;

  async ngOnInit() {
    generateText().then((res : string[]) => this.text = res)

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
    if(word === this.value){
      this.rightW = this.rightW + 1
      this.symbols = this.symbols + word.length
      this.kombo = this.kombo + 1
      if(this.bestKombo < this.kombo) {
        this.bestKombo = this.kombo
      }
    } else{
      this.kombo = 0
      this.wrongW = this.wrongW + 1
      for (let i = 0; i < Math.min(this.value.length, word.length); i++) {
        if(word[0] !== this.value[0]) {
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
    if(this.text.length < 10){
      generateText().then((res : string[]) => this.text = res)
    }
    this.text = this.text.slice(1, this.text.length)

  }

  setValue(e: Event): void {
    if(this.isEnd) return

    if(!this.isStart){
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

  intervalCalc(){
    this.time = this.time - 1

    if(!this.time){
      this.isEnd = true;
      this.isModal = true;
      this.inputText.nativeElement.blur()
      clearInterval(this.interval)
      this.value = "конец"
      this.service.saveStats({
        symbols: this.symbols,
        accuracy: Number((this.rightW / (this.rightW + this.wrongW) * 100).toFixed(2)) || 0,
        type: "text"
      })
    }

    this.symbolsPerMin = this.symbols/(60 - this.time)*60;


  }

  start(){
    this.isStart = true
    this.interval = setInterval(() => {
      this.intervalCalc()
    }, 1000)
  }

  setIsModal(){
    this.isModal = false;
  }

  restart(){
    generateText().then((res : string[]) => this.text = res)
    this.time = 60
    this.symbols = 0
    this.isStart = false
    this.isEnd = false
    this.symbolsPerMin = 0
    this.value = this.value.slice(0,0)
    this.wrongW = 0
    this.rightW = 0
    this.kombo = 0
    this.bestKombo = 0
    this.isModal = false
    clearInterval(this.interval)
  }
  protected readonly Math = Math;
  protected readonly faCross = faCross;
  protected readonly faX = faX;
    protected readonly faCircleInfo = faCircleInfo;
}
