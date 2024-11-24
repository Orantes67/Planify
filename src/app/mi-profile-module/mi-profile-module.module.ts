import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiProfilePageComponent } from './mi-profile-page/mi-profile-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MiProfilePageComponent],
  imports: [FormsModule, CommonModule],
})
export class MiProfileModuleModule {}
