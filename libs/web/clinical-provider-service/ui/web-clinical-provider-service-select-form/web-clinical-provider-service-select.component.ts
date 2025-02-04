

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClinicalProviderServiceFeatureStore } from '@case-clinical/web/clinical-provider-service/shared'
import {ClinicalProviderService} from '@case-clinical/web/core/data-access'


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
      <ui-clinical-provider-service-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderService_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderService]="clinicalProviderService"
      >
      >
      </ui-clinical-provider-service-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-clinical-provider-service-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderService_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderService]="{}"
      >
      </ui-clinical-provider-service-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-clinical-provider-service-select-table-view
        class="w-full h-full bg-white"
        [clinicalProviderServices]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-clinical-provider-service-select-table-view>
    </ng-template>
  `,
})
export class WebClinicalProviderServiceSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  clinicalProviderService: ClinicalProviderService

  constructor(private store: WebClinicalProviderServiceFeatureStore) {
    super()
    this.store.loadClinicalProviderServicesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.clinicalProviderServices$.pipe(
      switchMap((clinicalProviderServices) => {
        return of(clinicalProviderServices)
      }),
    )
  }
}

