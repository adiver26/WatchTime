import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AlertModule } from 'ngx-alerts';
import { environment } from '../environments/environment';


// Import HttpClientModule from @angular/common/http
import { HttpClientModule } from '@angular/common/http';

// Angular Material 2
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material';

// Self Made
import { TruncatePipe } from './truncate/truncate.module';

// User Components
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RecommenderComponent,SafePipe } from './components/recommender/recommender.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { SeedDataComponent } from './components/seed-data/seed-data.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  { path: '', component: UserComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'recom', component: RecommenderComponent },
  { path: 'show/movie/:id', component: MovieDetailComponent },
  { path: 'show/tv/:id', component: MovieDetailComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'newuser', component: SeedDataComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'settings', component: SettingsComponent},
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TruncatePipe,
    HeaderComponent,
    SignUpComponent,
    LogInComponent,
    MovieDetailComponent,
    PageNotFoundComponent,
    AboutUsComponent,
    RecommenderComponent,
    SafePipe,
    DiscoverComponent,
    SeedDataComponent,
    SettingsComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
      /*,{ enableTracing: true } // <-- debugging purposes only */
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000}),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


