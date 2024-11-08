import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CredentialsModule } from './credentials/credentials-module.module';
import { FamilyModule } from './family/family-module.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CredentialsModule,
    FamilyModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
