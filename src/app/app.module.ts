import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule, HttpClient } from '@angular/common/http';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { AgmCoreModule } from '@agm/core';
import { EmbedVideo } from 'ngx-embed-video';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
const config: InputFileConfig = {
  fileAccept: '*'
};

import { OverlayContainer } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';

import { PagesComponent } from './modules/pages.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { CookieService } from 'ngx-cookie-service';

import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateCacheModule, TranslateCacheSettings, TranslateCacheService } from 'ngx-translate-cache';

import { CustomOverlayContainer } from './utils/custom-overlay-container';

import { UserMenuComponent } from './shared/user-menu/user-menu.component';
import { AuthButtonsComponent } from './modules/auth/auth-buttons/auth-buttons.component';
import { LanguagesComponent } from './shared/languages/languages.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { HorizontalMenuComponent } from './shared/horizontal-menu/horizontal-menu.component';
import { VerticalMenuComponent } from './shared/vertical-menu/vertical-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    UserMenuComponent,
    AuthButtonsComponent,
    LanguagesComponent,
    ToolbarComponent,
    HorizontalMenuComponent,
    VerticalMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDLf9Ywk47zipEtorDewwMmB3JtuXdzYL4',
      libraries: ['places']
    }),
    EmbedVideo.forRoot(),
    NgProgressModule,
    NgProgressHttpModule,
    InputFileModule.forRoot(config),
    AppRoutingModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    SharedModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: translateCacheFactory,
        deps: [TranslateService, TranslateCacheSettings]
      },
      cacheMechanism: 'Cookie'
    })
  ],
  providers: [
    AppSettings, CookieService,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    translate: TranslateService,
    translateCacheService: TranslateCacheService
  ) {
    translateCacheService.init();
    translate.addLangs(['en', 'fr']);
    const browserLang = translateCacheService.getCachedLanguage();
    translate.use(browserLang);
  }
 }

export function translateCacheFactory(
    translateService: TranslateService,
    translateCacheSettings: TranslateCacheSettings
  ) {
    return new TranslateCacheService(translateService, translateCacheSettings);
  }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
