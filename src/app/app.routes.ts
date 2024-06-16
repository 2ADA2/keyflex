import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {TrainingComponent} from "./pages/training/training.component";
import {UserComponent} from "./pages/user/user.component";
import {AboutComponent} from "./pages/about/about.component";
import {PlayComponent} from "./pages/play/play.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'training', component: TrainingComponent},
  {path: 'play', component: PlayComponent},
  {path: 'about', component: AboutComponent},
  {path: 'profile', component: UserComponent}
];
