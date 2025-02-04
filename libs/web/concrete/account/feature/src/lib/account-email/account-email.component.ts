import { Component } from '@angular/core'
import { AccountCreateEmailInput, Email } from '@case-clinical/web/core/data-access'
import { AccountEmailStore } from './account-email.store'

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
      <ng-container *ngIf="vm.emails">
        <div class="flex flex-col space-y-3 md:space-y-6">
          <div class="flex flex-col shadow rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div class="px-4 py-2 dark:bg-gray-700 flex items-center font-semibold">Emails</div>
            <div class="p-4">
              <account-email-list (deleteEmail)="deleteEmail($event)" [emails]="vm.emails"></account-email-list>
            </div>
          </div>
          <div class="flex flex-col shadow rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div class="px-4 py-2 dark:bg-gray-700 flex items-center font-semibold">Select Primary Email</div>
            <div class="p-4">
              <account-email-primary-form
                [emails]="vm.emails"
                (send)="setPrimaryEmail($event)"
              ></account-email-primary-form>
            </div>
          </div>
          <div class="flex flex-col shadow rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div class="px-4 py-2 dark:bg-gray-700 flex items-center font-semibold">Add Email</div>
            <div class="p-4">
              <account-email-form (send)="addEmail($event)"></account-email-form>
            </div>
          </div>
        </div>
      </ng-container>
    </ng-container>
  `,
  providers: [AccountEmailStore],
})
export class AccountEmailComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: AccountEmailStore) {}

  addEmail(email: AccountCreateEmailInput) {
    this.store.addEmail(email)
  }

  deleteEmail(email: Email) {
    if (!window.confirm('Are you sure?')) {
      return true
    }
    this.store.deleteEmail(email)
  }

  setPrimaryEmail(email: Email) {
    this.store.setPrimaryEmail(email)
  }

  ngOnInit(): void {
    this.store.loadEmailsEffect()
  }
}
