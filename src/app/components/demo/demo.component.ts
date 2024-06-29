import {Component, Input} from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {
  @ Input() public text: string = ""
  public printed: string = ""
  public interval : number = 0

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.printed = this.printed + this.text[0]
      this.text = this.text.slice(1, this.text.length)
      if(!this.text.length){
        clearInterval(this.interval)
      }
    }, 100)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }
}
