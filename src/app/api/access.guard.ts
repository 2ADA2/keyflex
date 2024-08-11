import {inject} from "@angular/core";
import {Service} from "./service";
import {Router} from "@angular/router";

export const accessGuard = () => {
  const isLoggedIn:any = inject(Service).isAuth()

  if (isLoggedIn) {
    return true
  }


  return   inject(Router).createUrlTree(['/login'])
}
