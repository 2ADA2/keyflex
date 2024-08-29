import {Component, EventEmitter, inject, Output} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCircle, faMoon} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    FaIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public href: string = "";
  @Output() setTheme: EventEmitter<void> = new EventEmitter();
  isDark : boolean = localStorage.getItem("theme") === "dark"


  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.href = e.url
        window.scrollTo(0, 0)
      }
    })
  }

  setIsDark(){
    this.isDark = !this.isDark
    localStorage.setItem("theme", this.isDark ? "dark" : "light")
    this.setTheme.emit()
  }

  protected readonly faCircle = faCircle;
  protected readonly faMoon = faMoon;
}
