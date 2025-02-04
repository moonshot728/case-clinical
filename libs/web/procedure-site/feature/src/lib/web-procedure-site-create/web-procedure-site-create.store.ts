
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateProcedureSiteInput, WebCoreDataAccessService, ProcedureSite,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ProcedureSiteService } from '@case-clinical/web/procedure-site/shared'

export interface ProcedureSiteCreateState {
  errors?: any
  loading?: boolean
  item?: ProcedureSite,

  searchTerm?: string
}

@Injectable()
export class WebProcedureSiteCreateStore extends ComponentStore<ProcedureSiteCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly procedureSiteService: ProcedureSiteService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 

    (errors, loading, item,  ) => ({
    errors,
    loading,
    item,

  }),
{debounce: true})





    

  readonly createProcedureSiteEffect = this.effect<UserCreateProcedureSiteInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.procedureSiteService.createProcedureSite({...input}).pipe(
          tapResponse(
            (procedureSite: ProcedureSite) => {
              this.patchState({ item: procedureSite, loading: false })
              return this.router.navigate(['..', procedureSite?.id], {relativeTo: this.route})
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
