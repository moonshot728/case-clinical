

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPaymentTypeFeatureStore } from '@case-clinical/web/payment-type/shared'
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
      <ui-payment-type-form
        class="flex-grow flex flex-col"
        [formName]="'paymentType_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [paymentType]="context.value"
      >
      </ui-payment-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-payment-type-form
        class="flex-grow flex flex-col"
        [formName]="'paymentType_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [paymentType]="{}"
      >
      </ui-payment-type-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-payment-type-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [paymentTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-payment-type-select-table-view>
    </ng-template>
  `,
})
export class WebPaymentTypeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
