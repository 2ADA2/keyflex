import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {TrainingComponent} from "./pages/training/training.component";
import {UserComponent} from "./pages/user/user.component";
import {AboutComponent} from "./pages/about/about.component";
import {PlayComponent} from "./pages/play/play.component";
import {TextTrainingComponent} from "./pages/trainingPages/text-training/text-training.component";
import {WordsTrainingComponent} from "./pages/trainingPages/words-training/words-training.component";
import {CustomComponent} from "./pages/trainingPages/custom/custom.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'training', component: TrainingComponent},
  {path: 'play', component: PlayComponent},
  {path: 'about', component: AboutComponent},
  {path: 'profile', component: UserComponent},

  {path: 'training/text/:type', component: TextTrainingComponent},
  {path: 'training/word/:type', component: WordsTrainingComponent},

  {path: 'training/custom', component: CustomComponent},
];
