

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebHealthInsuranceFeatureStore } from '@case-clinical/web/health-insurance/shared'
import {HealthInsurance} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [upModel]="model"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
      [key]="field.key"
      (selectionChanged)="formState[$event.key]=$event.value"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-health-insurance-form
        class="flex-grow flex flex-col"
        [formName]="'healthInsurance_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [healthInsurance]="healthInsurance"
      >
      >
      </ui-health-insurance-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-health-insurance-form
        class="flex-grow flex flex-col"
        [formName]="'healthInsurance_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [healthInsurance]="{}"
      >
      </ui-health-insurance-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-health-insurance-select-table-view
        class="w-full h-full bg-white"
        [healthInsurances]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-health-insurance-select-table-view>
    </ng-template>
  `,
})
export class WebHealthInsuranceSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  healthInsurance: HealthInsurance

  constructor(private store: WebHealthInsuranceFeatureStore) {
    super()
    this.store.loadHealthInsurancesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.healthInsurances$.pipe(
      switchMap((healthInsurances) => {
        return of(healthInsurances)
      }),
    )
  }
}

