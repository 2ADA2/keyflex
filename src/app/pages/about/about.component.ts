import {Component, inject} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCircleInfo, faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {NgClass} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  public route: ActivatedRoute = inject(ActivatedRoute);
  public option: number = Number(this.route.snapshot.params['option']) || 0

  setOption(num: number) {
    this.option = num;
  }

  protected readonly faCircleInfo = faCircleInfo;
  protected readonly faExclamationCircle = faExclamationCircle;
    protected readonly Math = Math;
}
