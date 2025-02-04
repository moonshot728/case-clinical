import { Component, OnInit } from '@angular/core'
import { MobileAuthStore } from '@case-clinical/mobile/auth/data-access'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <auth-page pageTitle="Logging out">
        <div class="" *ngIf="vm.errors">
          {{ vm.errors }}
        </div>
      </auth-page>
    </ng-container>
  `,
})
export class LogoutComponent implements OnInit {
  readonly vm$ = this.store.vm$
  constructor(private readonly store: MobileAuthStore) {}

  ngOnInit(): void {
    this.store.logoutEffect()
  }
}
