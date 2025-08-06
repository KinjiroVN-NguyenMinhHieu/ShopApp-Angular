import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'detail/:id', component: DetailComponent },
    // { path: 'create', component: CreateComponent },

    { 
        path: 'detail/:id', 
        loadComponent: () => {
            return import('./detail/detail.component').then((c) => c.DetailComponent);
        }
    },

    { 
        path: 'create', 
        loadComponent: () => {
            return import('./create/create.component').then((c) => c.CreateComponent);
        }
    }
];
