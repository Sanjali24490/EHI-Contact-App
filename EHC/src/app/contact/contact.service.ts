import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Contact } from './contact-grid/contact-grid.component';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public contactChangeEmitter = new Subject<any>();
  private data: Contact[] = [];
  constructor() {}

  public addContact(contact: Contact) {
    this.data.push(contact);
    this.contactChangeEmitter.next(this.data);
    this.emitContactChange();
  }
  public updateContact(contact: Contact, index: number) {
    this.data[index] = { ...this.data[index], ...contact };
    this.emitContactChange();
  }

  public deleteContact(index: number) {
    this.data.splice(index, 1);
    this.emitContactChange();
  }
  private emitContactChange() {
    this.contactChangeEmitter.next(this.data);
  }
}
