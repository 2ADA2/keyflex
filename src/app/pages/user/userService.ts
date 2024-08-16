import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../environments/environment";

export interface UserInfo {
  name: string,
  keyboard:string,
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

  getUserInfo (){
    return this.http.get<UserInfo>(
      this.baseApiUrl + "getUserInfo",
      {headers:{access_token:this.cookieService.get("token")}}
    )
  }

  setUserInfo(payload: {keyboard:string, touchTyping:boolean, profession:string, location:string, other:string}) {
    return this.http.post(
      this.baseApiUrl + "setUserInfo",
      payload,
      {headers:{access_token:this.cookieService.get("token")}}
    )
  }
}
