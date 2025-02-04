import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Email } from '@case-clinical/web/core/data-access'

@Component({
  selector: 'account-email-list',
  template: `
    <ng-container *ngFor="let item of emails">
      <div class="flex justify-between items-center">
        <div class="flex items-center text-lg font-semibold tracking-wider">
          {{ item.email }}
        </div>
        <div class="flex items-center space-x-2">
          <span class="rounded rounded-full px-2 text-xs bg-blue-100 text-blue-800" *ngIf="item.primary">
            Primary
          </span>
          <span
            class="rounded rounded-full px-2 text-xs"
            [ngClass]="{
              'bg-yellow-100 text-yellow-800': item.public,
              'bg-green-100 text-green-800': !item.public
            }"
            [class.badge-primary]="!item.public"
            [class.badge-warning]="item.public"
          >
            {{ item.public ? 'Public' : 'Private' }}
          </span>
          <button class="text-red-900" (click)="deleteEmail.next(item)">
            <ui-icon icon="trash"></ui-icon>
          </button>
        </div>
      </div>
    </ng-container>
  `,
})
export class AccountUiEmailListComponent {
  @Input() emails: Email[]
  @Output() deleteEmail = new EventEmitter<Email>()
}
