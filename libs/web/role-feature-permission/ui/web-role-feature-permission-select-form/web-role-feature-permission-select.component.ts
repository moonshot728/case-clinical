

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebRoleFeaturePermissionFeatureStore } from '@case-clinical/web/role-feature-permission/shared'

@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-role-feature-permission-form
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [roleFeaturePermission]="context.value || {}"
      >
      </ui-role-feature-permission-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-role-feature-permission-select-table-view
        class="w-full h-full bg-white"
        [roleFeaturePermissions]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-role-feature-permission-select-table-view>
    </ng-template>
  `,
})
export class WebRoleFeaturePermissionSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl

  constructor(private store: WebRoleFeaturePermissionFeatureStore) {
    super()
    this.store.loadRoleFeaturePermissionsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.roleFeaturePermissions$.pipe(
      switchMap((roleFeaturePermissions) => {
        return of(roleFeaturePermissions)
      }),
    )
  }
}

