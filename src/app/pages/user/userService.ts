import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../environments/environment";

export interface UserInfo {
  name: string,
  keyboard: string,
  touchTyping: boolean,
  profession: string,
  location: string,
  date: string,
  other: string,
  achievements: any[]
}

@Injectable({
  providedIn: "root",
})


export class UserService {
  http = inject(HttpClient)
  baseApiUrl: string = environment.apiUrl + "/api/";
  cookieService = inject(CookieService);

  getUserInfo() {
    return this.http.get<UserInfo>(
      this.baseApiUrl + "profiles/get_info",
      {
        headers: {
          'Authorization': `Bearer ${this.cookieService.get("token")}`,
          "ngrok-skip-browser-warning": "69420"
        }
      }
    )
  }

  setUserInfo(payload: {
    keyboard: string,
    touchTyping: boolean,
    profession: string,
    location: string,
    other: string
  }) {
    return this.http.patch(
      this.baseApiUrl + "profiles/update",
      payload,
      {
        headers: {
          'Authorization': `Bearer ${this.cookieService.get("token")}`,
          "ngrok-skip-browser-warning": "69420"
        }
      }
    )
  }

  getStats() {
    return this.http.get<any>(
      this.baseApiUrl + "stats/get_modes_stats_data",
      {
        headers: {
          'Authorization': `Bearer ${this.cookieService.get("token")}`,
          "ngrok-skip-browser-warning": "69420"
        }
      }
    )
  }

  getLastest(){
    return this.http.get<any>(
      this.baseApiUrl + "stats/get_last_sessions_stats",
      {
        headers: {
          'Authorization': `Bearer ${this.cookieService.get("token")}`,
          "ngrok-skip-browser-warning": "69420"
        }
      }
    )
  }

  activate(){
    return this.http.get<any>(
      this.baseApiUrl + "profiles/get_info",
      {
        headers: {
          'Authorization': `Bearer ${this.cookieService.get("token")}`,
          "ngrok-skip-browser-warning": "69420"
        }
      }
    )
  }
}
