import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faChartLine, faCoffee, faDumbbell, faPeopleGroup, faTrophy} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgClass,
    FaIconComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public text :string = "Платформа для тренировки быстрой печати"
  public printed :string = ""
  public key: string = ""
  public interval : any = null


  public text2 :string = "Быстрая печать на клавиатуре обладает многочисленными преимуществами, которые существенно влияют на эффективность и продуктивность. Во-первых, она позволяет значительно экономить время. Способность быстро набирать текст ускоряет выполнение повседневных задач, таких как написание писем, отчетов и других документов. Во-вторых, быстрая печать повышает продуктивность. Меньше времени затрачивается на набор текста, что освобождает больше времени для других важных дел. В условиях многозадачности это особенно полезно. Третье преимущество – снижение уровня стресса. Когда набор текста не требует значительных усилий и внимания, уменьшается утомляемость и улучшается концентрация на содержании, а не на процессе ввода. Быстрая печать также способствует улучшению качества работы. Меньше ошибок допускается при наборе текста, что снижает необходимость в редактировании и коррекции. Кроме того, этот навык полезен в условиях удаленной работы и онлайн-общения, где оперативное реагирование на сообщения и запросы становится критически важным. Наконец, овладение техникой быстрой печати может повысить карьерные возможности, так как это ценится в различных профессиональных областях, включая журналистику, административную работу и информационные технологии."
  public printed2 :string = ""
  public key2 :string = ""
  public interval2 : any = null
  public intervalEnd2 : boolean = false

  ngOnInit(){
    this.interval = setInterval(() => {
      this.printed = this.printed + this.text[this.printed.length];
      this.key = this.key + this.printed.at(-1)

      setTimeout(() => {
        this.key = this.key.slice(1, this.printed.length)
      },300)

      if(this.printed.length === this.text.length){
        clearInterval(this.interval);
        return
      }

    }, 100)

    this.interval2 = setInterval(() => {
      this.printed2 = this.printed2 + this.text2[this.printed2.length];

      this.key2 = this.key2.slice(1, this.printed2.length)
      this.key2 = this.key2 + this.printed2.at(-1)

      if(this.printed2.length === this.text2.length){
        clearInterval(this.interval2);
        this.intervalEnd2 = true
        setTimeout(() => {
          this.key2 = ""
        },50)
        return
      }

    }, 100)
  }

  ngOnDestroy(){
    clearInterval(this.interval);
    clearInterval(this.interval2);
  }

  stopPrinting(){
    clearInterval(this.interval2);
    this.intervalEnd2 = true
  }

  protected readonly faDumbbell = faDumbbell;
  protected readonly faPeopleGroup = faPeopleGroup;
  protected readonly faTrophy = faTrophy;
  protected readonly faChartLine = faChartLine;
}
