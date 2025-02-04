

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="location_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebLocationFeatureStore],
})
export class WebLocationOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebLocationFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadLocationEffect(this.route.params.pipe(pluck('locationId')))
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['../../../'], {relativeTo: this.route});
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteLocationEffect()
    }
  }

  
  appointmentAdded($event){
    console.log('from the overview in Location, added: ',$event)
  }


  caseAccountAdded($event){
    console.log('from the overview in Location, added: ',$event)
  }


  caseProcedureAdded($event){
    console.log('from the overview in Location, added: ',$event)
  }


  clinicalProviderLocationAdded($event){
    console.log('from the overview in Location, added: ',$event)
  }


  vendorLocationAdded($event){
    console.log('from the overview in Location, added: ',$event)
  }

}

