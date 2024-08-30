import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {TrainingComponent} from "./pages/training/training.component";
import {UserComponent} from "./pages/user/user.component";
import {AboutComponent} from "./pages/about/about.component";
import {PlayComponent} from "./pages/play/play.component";
import {TextTrainingComponent} from "./pages/trainingPages/text-training/text-training.component";
import {WordsTrainingComponent} from "./pages/trainingPages/words-training/words-training.component";
import {CustomComponent} from "./pages/trainingPages/custom/custom.component";
import {LoginFormComponent} from "./pages/login-form/login-form.component";
import {RegisterFormComponent} from "./pages/register-form/register-form.component";
import {accessGuard} from "./api/access.guard";
import {blockRegRoutes} from "./api/blockRegRoutes";

export const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'training', component: TrainingComponent},
  {path: 'play', component: PlayComponent},
  {path: 'about', component: AboutComponent},
  {path: 'about/:option', component: AboutComponent},

  {path: 'training/text/:type', component: TextTrainingComponent},
  {path: 'training/word/:type', component: WordsTrainingComponent},

  {path: 'training/custom', component: CustomComponent},

  {
    path: "", children: [
      {path: 'profile', component: UserComponent},
    ],
    canActivate: [accessGuard]
  },
  {
    path: "", children: [
      {path: 'profile/:token', component: UserComponent},
    ],
    canActivate: [accessGuard]
  },

  {
    path: "", children: [
      {path: 'login', component: LoginFormComponent},
      {path: 'register', component: RegisterFormComponent},
    ],
    canActivate:[blockRegRoutes]
  },

  {path: '**', component: HomeComponent}
];
