import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { ContactGridComponent } from './contact-grid/contact-grid.component';

@NgModule({
  declarations: [ContactComponent, ContactModalComponent, ContactGridComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatSlideToggleModule,
    ContactRoutingModule,
  ],
  exports: [ContactComponent],
})
export class ContactModule {}
