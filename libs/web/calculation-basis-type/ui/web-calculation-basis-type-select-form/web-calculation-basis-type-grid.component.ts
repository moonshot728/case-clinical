

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCalculationBasisTypeFeatureStore } from '@case-clinical/web/calculation-basis-type/shared'
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
      <ui-calculation-basis-type-form
        class="flex-grow flex flex-col"
        [formName]="'calculationBasisType_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [calculationBasisType]="context.value"
      >
      </ui-calculation-basis-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-calculation-basis-type-form
        class="flex-grow flex flex-col"
        [formName]="'calculationBasisType_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [calculationBasisType]="{}"
      >
      </ui-calculation-basis-type-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-calculation-basis-type-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [calculationBasisTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-calculation-basis-type-select-table-view>
    </ng-template>
  `,
})
export class WebCalculationBasisTypeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
