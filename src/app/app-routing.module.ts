import { WelcomeComponent } from './layout/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'students',
    loadChildren: () => import('./layout/features/features.module').then(m => m.FeaturesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
