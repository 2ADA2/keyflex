import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../environments/environment";
import {tap} from "rxjs";
import {TokenResponce} from "./authInterfaces";

@Injectable({
  providedIn: "root",
})

export class Service {
  http: HttpClient = inject(HttpClient);
  baseApiUrl: string = environment.apiUrl+"/api/auth/";
  token: string | null = null;
  cookieService = inject(CookieService);

  isAuth(): boolean {
    if(!this.token){
      this.token = this.cookieService.get("token")
    }
    return !!this.token;
  }

  login(payload: { name: string, password: string }) {
    const formData: FormData = new FormData()
    console.log(this.baseApiUrl)
    formData.append("name", payload.name)
    formData.append("password", payload.password);

    return this.http.post<TokenResponce>(
      this.baseApiUrl+"jwt/login",
      formData
    ).pipe(
      tap(val => {
        console.log(1)
        this.token = val.token
        this.cookieService.set("token", this.token)
      })
    )
  }

  register(payload: { name: string, password: string }){
    const formData: FormData = new FormData()

    formData.append("name", payload.name)
    formData.append("password", payload.password);

    return this.http.post<TokenResponce>(
      this.baseApiUrl+"register",
      formData
    ).pipe(
      tap(val => {
        this.token = val.token
        this.cookieService.set("token", this.token)
      })
    )
  }

}
