import { Component } from '@angular/core'
import { AccountUpdatePasswordInput } from '@case-clinical/web/core/data-access'
import { AccountPasswordStore } from './account-password.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.loading">
        <div class="flex py-4 justify-center items-center shadow rounded-lg bg-gray-100 dark:bg-gray-800 mb-3">
          <ui-loader></ui-loader>
        </div>
      </ng-container>
      <ng-container *ngIf="vm.errors">
        <div class="p-4 shadow rounded-lg bg-gray-100 dark:bg-gray-800">
          <div class="font-semibold">An error occurred:</div>
          <pre class="text-red-700">{{ vm.errors }}</pre>
        </div>
      </ng-container>
      <ng-container *ngIf="!vm.loading && !vm.errors">
        <div class="flex flex-col space-y-3 md:space-y-6">
          <div class="flex flex-col shadow rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div class="px-4 py-2 dark:bg-gray-700 flex items-center font-semibold">Change Password</div>
            <div class="p-4">
              <account-password-form (send)="updatePassword($event)"></account-password-form>
            </div>
          </div>
        </div>
      </ng-container>
    </ng-container>
  `,
  providers: [AccountPasswordStore],
})
export class AccountPasswordComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: AccountPasswordStore) {}

  updatePassword(password: AccountUpdatePasswordInput) {
    this.store.updatePasswordEffect(password)
  }
}
