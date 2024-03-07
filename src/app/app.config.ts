import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideClientHydration(),
  importProvidersFrom(provideFirebaseApp(() => initializeApp(
    {
      "projectId": "zona-admon", "appId": "1:1051108258363:web:d07d9e6dbe4081b456221e",
      "databaseURL": "https://zona-admon-default-rtdb.firebaseio.com",
      "storageBucket": "zona-admon.appspot.com",
      "apiKey": "AIzaSyDjlfdspuTPyk8Vj8bWInLQwUBq1grKO7M",
      "authDomain": "zona-admon.firebaseapp.com",
      "messagingSenderId": "1051108258363",
      "measurementId": "G-XB9ECK2Z9S"
    }))),
  importProvidersFrom(provideAuth(() => getAuth())),
  importProvidersFrom(provideFirestore(() => getFirestore()))]
};
