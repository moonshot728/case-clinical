
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PatientTreatmentStatusService } from './patient-treatment-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePatientTreatmentStatusInput, UserUpdatePatientTreatmentStatusInput, WebCoreDataAccessService, CorePaging, PatientTreatmentStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PatientTreatmentStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: PatientTreatmentStatus
  done: boolean,
  formName?: string

  patientTreatmentStatuses: PatientTreatmentStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPatientTreatmentStatusFeatureStore extends ComponentStore<PatientTreatmentStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly patientTreatmentStatusService: PatientTreatmentStatusService
) {
    super({ 
      loading: false,
      patientTreatmentStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('patientTreatmentStatusId')) {
      var patientTreatmentStatusId = this.route.snapshot.paramMap.get('patientTreatmentStatusId')
      this.setFormName('patientTreatmentStatus_edit')
    } else {
      this.setFormName('patientTreatmentStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly patientTreatmentStatuses$ = this.select((s) => s.patientTreatmentStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.patientTreatmentStatuses$,

    (errors, loading, item, formName, patientTreatmentStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    patientTreatmentStatuses,

            
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$,  this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))







    

  readonly setItem = this.updater((state, item: PatientTreatmentStatus) => ({...state, item}))

  addNewPatientTreatmentStatus = this.updater((state, patientTreatmentStatus: PatientTreatmentStatus) => ({ ...state, patientTreatmentStatuses: [...state.patientTreatmentStatuses, patientTreatmentStatus] }))

  updatePatientTreatmentStatus = this.updater((state, patientTreatmentStatus: PatientTreatmentStatus) => {
    return {
      ...state,
      patientTreatmentStatuses: state.patientTreatmentStatuses.map((el) => {
        if (el.id === patientTreatmentStatus.id) {
          return patientTreatmentStatus
        } else {
          return el
        }
      }),
    }
  })

  addPatientTreatmentStatuses = this.updater((state, newPatientTreatmentStatuses: any[]) => ({...state, patientTreatmentStatuses: state.patientTreatmentStatuses.concat(newPatientTreatmentStatuses) }))
  updatePatientTreatmentStatuses = this.updater((state, updatedPatientTreatmentStatuses: any[]) => {
    return {
      ...state,
      patientTreatmentStatuses: state.patientTreatmentStatuses.map((patientTreatmentStatus) => {
        const updated = updatedPatientTreatmentStatuses.find((el) => el.id === patientTreatmentStatus.id);
        return updated ? updated : patientTreatmentStatus;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.patientTreatmentStatusService.validatePatientTreatmentStatusExcelData(excelData);
      })
    )
  }


  readonly loadPatientTreatmentStatusEffect = this.effect<string>((patientTreatmentStatusId$) =>
    patientTreatmentStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((patientTreatmentStatusId) =>
        this.data.userPatientTreatmentStatus({ patientTreatmentStatusId }).pipe(
          tapResponse(
            (res) => {
                    this.patchState({ 
                    item: res.data.item, 
                    errors: res.errors, 
                    loading: false 
                })
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



  readonly loadPatientTreatmentStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPatientTreatmentStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                patientTreatmentStatuses: res.data.items,
                errors: res.errors,
                loading: false,
              }),
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

  readonly createPatientTreatmentStatusEffect = this.effect<UserCreatePatientTreatmentStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.patientTreatmentStatusService.createPatientTreatmentStatus({...input }).pipe(
          tapResponse(
            (patientTreatmentStatus: PatientTreatmentStatus) => {
              this.addNewPatientTreatmentStatus(patientTreatmentStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: patientTreatmentStatus, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            }
          ),
        ),
      ),
    ),
  )

    readonly updatePatientTreatmentStatusEffect = this.effect<UserUpdatePatientTreatmentStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.patientTreatmentStatusService.updatePatientTreatmentStatus(input, input.id).pipe(
              tapResponse(
                (patientTreatmentStatus) => {
                  this.updatePatientTreatmentStatus(patientTreatmentStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: patientTreatmentStatus, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                      this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                      this.patchState({
                        loading: false,
                        errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                      })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }
              ),
            ),
          ),
        ),
      )
  
    readonly deletePatientTreatmentStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, patientTreatmentStatus]) => {
          return this.data.userDeletePatientTreatmentStatus({patientTreatmentStatusId: patientTreatmentStatus.id})
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted successfully!", { duration: 3000 })
                  setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({ done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                    this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                    this.patchState({
                      loading: false,
                      errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                    })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }),
            )}
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdatePatientTreatmentStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.patientTreatmentStatusService.importPatientTreatmentStatuses(data).pipe(
        catchError(error => {
          this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addPatientTreatmentStatuses(created);
            this.updatePatientTreatmentStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
