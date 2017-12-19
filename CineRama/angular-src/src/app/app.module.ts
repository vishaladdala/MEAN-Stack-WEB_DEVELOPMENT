import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';/* bring in the router module */

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
//import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { DisplayComponent } from './components/display/display.component';
import { AddmovieComponent } from './components/addmovie/addmovie.component';
import { FooterComponent } from './components/footer/footer.component';



//import { FlashMessagesModule } from 'angular2-flash-messages/module';// from stackoverflow

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'favourites', component: FavouritesComponent, canActivate:[AuthGuard]},
  {path:'display', component: DisplayComponent, canActivate:[AuthGuard]},
  {path:'addmovie', component: AddmovieComponent, canActivate:[AuthGuard]},
  {path:'footer', component: FooterComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    FavouritesComponent,
    DisplayComponent,
    AddmovieComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule//.forRoot() //check change - passed
  ],
  providers: [ValidateService, AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
