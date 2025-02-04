import { Component } from '@angular/core'
import { MobileCoreDataAccessService } from '@case-clinical/mobile/core/data-access'
import { map } from 'rxjs/operators'

@Component({
  template: `
    <ng-container *ngIf="me$ | async as me">
      <ui-page pageTitle="About">
        <ion-card>
          <ion-card-header>
            <div class="ion-text-start ion-justify-content-start ion-align-items-center" [style.display]="'flex'">
              <ion-avatar *ngIf="me?.avatarUrl" class="ion-margin-end">
                <img [attr.src]="me?.avatarUrl" alt="User Avatar" />
              </ion-avatar>
              <div>
                <ion-card-title>{{ me?.name }}</ion-card-title>
                <ion-card-subtitle>{{ me?.email }}</ion-card-subtitle>
              </div>
            </div>
          </ion-card-header>

          <ion-card-content>
            <ng-container *ngIf="uptime$ | async as uptime">
              {{ uptime }}
            </ng-container>
          </ion-card-content>
        </ion-card>
      </ui-page>
    </ng-container>
  `,
})
export class MobileAboutFeatureComponent {
  me$ = this.data.me().pipe(map((res) => res?.data?.me))
  uptime$ = this.data.uptimeWatch(null, { pollInterval: 1000 }).valueChanges.pipe(map((res) => res?.data?.uptime))
  constructor(private readonly data: MobileCoreDataAccessService) {}
}
