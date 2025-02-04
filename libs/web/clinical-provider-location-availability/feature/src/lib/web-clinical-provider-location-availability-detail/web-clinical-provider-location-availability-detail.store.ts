
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,ClinicalProviderLocationAvailability } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ClinicalProviderLocationAvailabilityDetailState {
  errors ?: any
  loading?: boolean
  item?: ClinicalProviderLocationAvailability
}

@Injectable()
export class WebClinicalProviderLocationAvailabilityDetailStore extends ComponentStore<ClinicalProviderLocationAvailabilityDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadClinicalProviderLocationAvailabilityEffect(route.params.pipe(pluck('clinicalProviderLocationAvailabilityId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

readonly displayItems$ = this.select(
    this.item$,
    (item) =>
      [
{ label: 'Id', value: item?.id },
{ label: 'Name', value: item?.name },
{ label: 'Day', value: item?.day },
{ label: 'Start Time', value: item?.startTime },
{ label: 'End Time', value: item?.endTime },

      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadClinicalProviderLocationAvailabilityEffect = this.effect<string>((clinicalProviderLocationAvailabilityId$) =>
    clinicalProviderLocationAvailabilityId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((clinicalProviderLocationAvailabilityId) =>
        this.data.userClinicalProviderLocationAvailability({ clinicalProviderLocationAvailabilityId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly deleteClinicalProviderLocationAvailabilityEffect = this.effect<ClinicalProviderLocationAvailability>(
    (clinicalProviderLocationAvailability$) =>
      clinicalProviderLocationAvailability$.pipe(
        switchMap((clinicalProviderLocationAvailability) =>
          this.data
            .userDeleteClinicalProviderLocationAvailability({
              clinicalProviderLocationAvailabilityId: clinicalProviderLocationAvailability.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/clinical-provider-location-availabilities'])
                },
                (errors: any) =>
                  this.patchState({
                    loading: false,
                    errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                  }),
              ),
            ),
        ),
      ),
  )
}

