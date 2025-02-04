
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateCalculationBasisTypeInput, WebCoreDataAccessService, CalculationBasisType,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { CalculationBasisTypeService } from '@case-clinical/web/calculation-basis-type/shared'

export interface CalculationBasisTypeEditState {
  errors?: any
  loading?: boolean
  item?: CalculationBasisType,

  searchTerm?: string
}

@Injectable()
export class WebCalculationBasisTypeEditStore extends ComponentStore<CalculationBasisTypeEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly calculationBasisTypeService: CalculationBasisTypeService
) {
    super({ loading: false })
    
    this.loadCalculationBasisTypeEffect(route.params.pipe(map((route) => route?.calculationBasisTypeId)))
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





  
  readonly loadCalculationBasisTypeEffect = this.effect<string>((calculationBasisTypeId$) =>
     calculationBasisTypeId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((calculationBasisTypeId) =>
        this.data.userCalculationBasisType({calculationBasisTypeId}).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.item, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly updateCalculationBasisTypeEffect = this.effect<UserUpdateCalculationBasisTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.calculationBasisTypeService.updateCalculationBasisType(input, item?.id).pipe(
          tapResponse(
            (response: any) => {
              this.toast.success('Changed Successfully')
              this.router.navigate(['..'], { relativeTo: this.route })
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
