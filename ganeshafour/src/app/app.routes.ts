import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { Error404Component } from './error404/error404.component';

export const routes: Routes = [
    { path: 'game', component: GameComponent },
    { path: '', redirectTo: '/game', pathMatch: 'full' }, // Exemple de redirection par défaut
    { path: '**', component: Error404Component  } // Gérer les routes inconnues
];
