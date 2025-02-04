import { Component } from '@angular/core'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { environment } from '@case-clinical/web/core/feature'
import { map } from 'rxjs/operators'

@Component({
  template: `
    <ui-page headerTitle="About">
      <div class="dark:bg-gray-800 px-6 py-4 mb-3 md:mb-6 rounded-lg shadow">
        <ng-container *ngIf="me$ | async as user">
          <div class="flex items-center justify-between mb-3 md:mb-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-20 w-20">
                <img class="h-20 w-20 rounded-full" src="/assets/images/case-clinical-logo.svg" alt="" />
              </div>
              <div class="ml-4">
                <div class="text-lg font-medium text-gray-900 dark:text-gray-200">@nxpm/stack</div>
                <div class="text-lg text-indigo-500">
                  <a href="https://github.com/nxpm/stack" target="_blank">github.com/nxpm/stack</a>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col space-y-3">
            <pre class="p-4 text-xs border border-gray-700 rounded-md ">Your Account: {{ me$ | async | json }}</pre>
            <pre class="p-4 text-xs border border-gray-700 rounded-md ">Environment: {{ environment | json }}</pre>
            <pre class="p-4 text-xs border border-gray-700 rounded-md ">API Uptime: {{ uptime$ | async }}</pre>
          </div>
        </ng-container>
      </div>
    </ui-page>
  `,
})
export class WebAboutFeatureComponent {
  environment = environment
  me$ = this.data.me().pipe(map((res) => res?.data?.me))
  uptime$ = this.data.uptimeWatch(null, { pollInterval: 1000 }).valueChanges.pipe(map((res) => res?.data?.uptime))
  constructor(private readonly data: WebCoreDataAccessService) {}
}
