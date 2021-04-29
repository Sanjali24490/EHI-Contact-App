import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ContactService } from '../contact.service';

export interface Contact {
  FName: string;
  LName: string;
  Mobile: string;
  Email: string;
  Status: boolean;
}
@Component({
  selector: 'app-contact-grid',
  templateUrl: './contact-grid.component.html',
  styleUrls: ['./contact-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactGridComponent implements OnInit {
  @Output() onEditContact = new EventEmitter<any>();
  public gridData: Contact[] = [];
  public displayedColumns: string[] = [
    'First Name',
    'Last Name',
    'Phone Number',
    'Email',
    'Status',
    'Action',
  ];
  constructor(
    private contactService: ContactService,
    private cref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.contactService.contactChangeEmitter.subscribe((data: Contact[]) => {
      this.gridData = [...data];
      this.cref.markForCheck();
    });
  }

  public onDelete(index: number) {
    if (index !== undefined && index !== null) {
      this.contactService.deleteContact(index);
    }
  }
  public onEdit(index: number) {
    if (index !== undefined && index !== null) {
      this.onEditContact.emit({ ...this.gridData[index], index });
    }
  }
  public getColumnKey(columnHeader: string) {
    let columnName: string = '';
    switch (columnHeader) {
      case this.displayedColumns[0]:
        columnName = 'FName';
        break;
      case this.displayedColumns[1]:
        columnName = 'LName';
        break;
      case this.displayedColumns[2]:
        columnName = 'Mobile';
        break;
      case this.displayedColumns[3]:
      case this.displayedColumns[4]:
        columnName = columnHeader;
        break;
    }
    return columnName;
  }
}
