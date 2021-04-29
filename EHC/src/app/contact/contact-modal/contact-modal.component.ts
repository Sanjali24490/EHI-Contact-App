import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../contact-grid/contact-grid.component';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactModalComponent implements OnInit {
  @Input() set contact(contact: Contact | undefined) {
    this.contactDetails = contact;
    if (this.contactDetails) {
      this.contactForm.setValue({
        FName: this.contactDetails.FName,
        LName: this.contactDetails.LName,
        Email: this.contactDetails.Email,
        Mobile: this.contactDetails.Mobile,
        Status: this.contactDetails.Status,
      });
    }
  }
  get contact() {
    return this.contactDetails;
  }
  @Output()
  public onModalEvent = new EventEmitter<any>();
  private contactDetails: any;
  public contactForm = new FormGroup({
    FName: new FormControl('', Validators.compose([Validators.required])),
    LName: new FormControl('', Validators.compose([Validators.required])),
    Email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    Mobile: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]{10}$'),
      ])
    ),
    Status: new FormControl(false),
  });

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {}

  public onSave() {
    if (this.contactDetails) {
      this.contactService.updateContact(
        this.contactForm.value,
        this.contactDetails.index
      );
    } else {
      this.contactService.addContact(this.contactForm.value);
    }
    this.resetForm();
    this.onModalEvent.emit('Save');
  }
  public onCancel() {
    this.resetForm();
    this.onModalEvent.emit('Cancel');
  }
  private resetForm() {
    this.contactDetails = null;
    this.contactForm.reset();
  }
}
