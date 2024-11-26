import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CredentialsModule } from './credentials/credentials-module.module';
import { FamilyModule } from './family/family-module.module';
import { ReminderModule } from './reminder/reminder.module';
import { NavigationModule } from './navigation/navigation.module';
import { ActivitiesModule } from './activities/activities.module';
import { MiProfileModuleModule } from './mi-profile-module/mi-profile-module.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MiProfileModuleModule,
    CredentialsModule,
    FamilyModule,
    ReminderModule,
    NavigationModule,
    ActivitiesModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
