

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebContactPhoneNumberFeatureStore } from '@case-clinical/web/contact-phone-number/shared'
import { WebContactPhoneNumberSelectTableViewComponent } from '@case-clinical/web/contact-phone-number/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebCountryFeatureStore } from '@case-clinical/web/country/shared'
import { WebContactFeatureStore } from '@case-clinical/web/contact/shared'

@Component({
  template: `
    <ng-container *featureFlag="'ContactPhoneNumber.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.contactPhoneNumbers"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="contactPhoneNumber"
          title="ContactPhoneNumber"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebContactPhoneNumberFeatureStore,
    WebCountryFeatureStore,
    WebContactFeatureStore
],

})
export class WebContactPhoneNumberListComponent implements OnInit {
  @ViewChild(WebContactPhoneNumberSelectTableViewComponent) tableView: WebContactPhoneNumberSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'country.name', headerName: 'Country', filter: 'agTextColumnFilter' },
{ field: 'contact.name', headerName: 'Contact', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'countryId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'phoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'label', filter: 'agTextColumnFilter'  },
{ field: 'contactId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebContactPhoneNumberFeatureStore,
    private readonly countryFeatureStore: WebCountryFeatureStore,
private readonly contactFeatureStore: WebContactFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadContactPhoneNumbersEffect()
    this.store.filterCountries('').subscribe()
    this.store.filterContacts('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'country':
          {
            const countryCreateActionResultListener = this.countryFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addCountry(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                countryCreateActionResultListener.unsubscribe();
              }
            })
            this.countryFeatureStore.createCountryEffect({ name: newName });
            break;
          }


        case 'contact':
          {
            const contactCreateActionResultListener = this.contactFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addContact(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                contactCreateActionResultListener.unsubscribe();
              }
            })
            this.contactFeatureStore.createContactEffect({ name: newName });
            break;
          }

        default:
          observer.next(false);
      }
    })
  }


  validateImportData(excelData: any[]) {
    return new Observable((resolver) => {
      this.store.validateImportData(excelData).subscribe((result) => {
        resolver.next(result);
        resolver.complete();
      }).unsubscribe();
    })
  }


  /**
   * This function is called when user select the excel from by clicking Import button on data list and click Save button on consequential dialog
   * Here can send batch update request to the server
   * @param excelData excel rows extracted from the excel file
   */
  excelDataHasBeenPopulated(excelData: any[]) { this.store.importExcelEffect(excelData) }

  searchQueryDidChange(searchQuery) {
    this.store.setSearchQuery(searchQuery)
    this.store.loadContactPhoneNumbersEffect()
  }
}
