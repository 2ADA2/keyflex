import {inject} from "@angular/core";
import {Service} from "./service";
import {Router} from "@angular/router";

export const blockRegRoutes = () => {
  const isLoggedIn:any = inject(Service).isAuth()

  if (isLoggedIn) {
    return inject(Router).createUrlTree(['/profile'])
  }

  return true
}
