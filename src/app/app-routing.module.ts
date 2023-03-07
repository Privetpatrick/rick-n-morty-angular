import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterPageComponent } from './components/character-page/character-page.component';
import { CharactersComponent } from './components/characters/characters.component';

const routes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  {
    path: 'characters',
    component: CharactersComponent,
  },
  {
    path: 'characters/:id',
    component: CharacterPageComponent,
  },
  { path: '**', redirectTo: '/characters', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
