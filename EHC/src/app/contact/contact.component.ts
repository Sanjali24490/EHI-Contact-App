import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Contact } from './contact-grid/contact-grid.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  public isOpenContactModal = false;
  public contactDetails: Contact | undefined;
  constructor(private cRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  public onModalEvent() {
    this.isOpenContactModal = !this.isOpenContactModal;
    this.cRef.detectChanges();
  }

  public onEditContact(contact: any) {
    this.contactDetails = contact;
    this.onModalEvent();
  }
}
