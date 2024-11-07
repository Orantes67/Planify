import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { CredentialsModule } from './credentials/credentials-module.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FamilyModule } from './family/family-module.module';
import { NavBarComponent } from "./header/nav-bar/nav-bar.component";
import { PerfilComponent } from "./header/perfil/perfil.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';






@NgModule({
  declarations: [
    AppComponent
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CredentialsModule,
    FamilyModule,
    NavBarComponent,
    PerfilComponent,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
    
],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
