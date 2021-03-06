import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthService } from '../providers/auth-service';
import { SplitPane } from '../providers/split-pane';
import { Common } from '../providers/common';
import { HttpModule } from "@angular/http";
import { Welcome } from '../pages/welcome/welcome';
import { Login } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MomentModule } from 'angular2-moment';
import { LinkyModule } from 'angular-linky';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    Welcome,
    Login,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,HttpModule,MomentModule,LinkyModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Welcome,
    Login,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,AuthService,SplitPane,Common,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	LocationTrackerProvider,
    BackgroundGeolocation,
    Geolocation
  ]
})
export class AppModule {}
