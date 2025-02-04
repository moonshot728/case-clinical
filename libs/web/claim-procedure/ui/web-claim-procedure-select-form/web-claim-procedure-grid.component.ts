

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClaimProcedureFeatureStore } from '@case-clinical/web/claim-procedure/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-claim-procedure-form
        class="flex-grow flex flex-col"
        [formName]="'claimProcedure_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [claimProcedure]="context.value"
      >
      </ui-claim-procedure-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-claim-procedure-form
        class="flex-grow flex flex-col"
        [formName]="'claimProcedure_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [claimProcedure]="{}"
      >
      </ui-claim-procedure-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-claim-procedure-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [claimProcedures]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-claim-procedure-select-table-view>
    </ng-template>
  `,
})
export class WebClaimProcedureGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
