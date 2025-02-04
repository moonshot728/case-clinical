

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContactFeatureStore } from '@case-clinical/web/contact/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
     [readOnly]="to.readOnly"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-contact-form
        class="flex-grow flex flex-col"
        [formName]="'contact_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contact]="context.value"
      >
      </ui-contact-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contact-form
        class="flex-grow flex flex-col"
        [formName]="'contact_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contact]="{}"
      >
      </ui-contact-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-contact-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [contacts]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-contact-select-table-view>
    </ng-template>
  `,
})
export class WebContactGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
