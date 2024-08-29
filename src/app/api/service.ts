import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../environments/environment";
import {tap} from "rxjs";
import {TokenResponce} from "./authInterfaces";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root",
})

export class Service {
  http: HttpClient = inject(HttpClient);
  baseApiUrl: string = environment.apiUrl + "/api/auth/";
  statsApiUrl: string = environment.apiUrl + "/api/stats/";
  token: string | null = null;
  cookieService = inject(CookieService);
  router = inject(Router);

  isAuth(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get("token")
    }
    return !!this.token;
  }

  login(payload: { username: string, password: string }) {
    const formData: FormData = new FormData()
    formData.append("username", payload.username)
    formData.append("password", payload.password);

    return this.http.post<TokenResponce>(
      this.baseApiUrl + "jwt/login",
      formData
    ).pipe(
      tap(val => {
        this.token = val.access_token
        this.cookieService.set("token", this.token)
      })
    )
  }

  register(payload: { name: string, password: string, email: string }) {
    return this.http.post<TokenResponce>(
      this.baseApiUrl + "register",
      {
        username: payload.name,
        password: payload.password,
        email: payload.email
      }
    )
  }

  logout() {
    this.router.navigate(["/login"])
    this.http.post(
      this.baseApiUrl + "jwt/logout",
      {},
      {headers: {'Authorization': `Bearer ${this.token}`}}
    ).subscribe()
    this.cookieService.delete("token");
    this.token = null
  }

  saveStats(payload: { symbols: number, accuracy: number, type: string }) {
    return this.http.post(
      this.statsApiUrl + "add_stats", {
        symbols_per_minute: payload.symbols,
        accuracy_percentage: payload.accuracy,
        mode_type: payload.type + "_mode",
      },
      {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          "ngrok-skip-browser-warning": "69420"
        }
      }
    )
  }
}
