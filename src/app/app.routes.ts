import { Routes } from '@angular/router';
import { BuilderComponent } from './pages/builder/builder.component';
import { AnswersComponent } from './pages/answers/answers.component';

export const routes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  {
    path: 'form',
    children: [
      { path: '', redirectTo: 'builder', pathMatch: 'full' },
      { path: 'builder', component: BuilderComponent },
      { path: 'answers', component: AnswersComponent },
    ],
  },
];
