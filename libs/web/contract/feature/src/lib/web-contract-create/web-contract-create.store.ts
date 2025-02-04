
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateContractInput, WebCoreDataAccessService, Contract, Organization,Template,Vendor,ReconciliationPeriodType,CalculationBasisType,Process } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ContractService } from '@case-clinical/web/contract/shared'

export interface ContractCreateState {
  errors?: any
  loading?: boolean
  item?: Contract,
 organizations?: Organization[],
 templates?: Template[],
 vendors?: Vendor[],
 reconciliationPeriodTypes?: ReconciliationPeriodType[],
 calculationBasisTypes?: CalculationBasisType[],
 processes?: Process[]
  searchTerm?: string
}

@Injectable()
export class WebContractCreateStore extends ComponentStore<ContractCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contractService: ContractService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly organizations$ = this.select((s) => s.organizations || [])
  readonly templates$ = this.select((s) => s.templates || [])
  readonly vendors$ = this.select((s) => s.vendors || [])
  readonly reconciliationPeriodTypes$ = this.select((s) => s.reconciliationPeriodTypes || [])
  readonly calculationBasisTypes$ = this.select((s) => s.calculationBasisTypes || [])
  readonly processes$ = this.select((s) => s.processes || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.organizations$,this.templates$,this.vendors$,this.reconciliationPeriodTypes$,this.calculationBasisTypes$,this.processes$,
    (errors, loading, item, organizations,templates,vendors,reconciliationPeriodTypes,calculationBasisTypes,processes ) => ({
    errors,
    loading,
    item,
organizations,templates,vendors,reconciliationPeriodTypes,calculationBasisTypes,processes
  }),
{debounce: true})



  readonly filterOrganizations = (term) => 
        this.data.userSelectOrganizations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let organizations = res.data.items;
              this.patchState({organizations})
              return organizations
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterTemplates = (term) => 
        this.data.userSelectTemplates({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let templates = res.data.items;
              this.patchState({templates})
              return templates
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterVendors = (term) => 
        this.data.userSelectVendors({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let vendors = res.data.items;
              this.patchState({vendors})
              return vendors
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterReconciliationPeriodTypes = (term) => 
        this.data.userSelectReconciliationPeriodTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let reconciliationPeriodTypes = res.data.items;
              this.patchState({reconciliationPeriodTypes})
              return reconciliationPeriodTypes
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterCalculationBasisTypes = (term) => 
        this.data.userSelectCalculationBasisTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let calculationBasisTypes = res.data.items;
              this.patchState({calculationBasisTypes})
              return calculationBasisTypes
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterProcesses = (term) => 
        this.data.userSelectProcesses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let processes = res.data.items;
              this.patchState({processes})
              return processes
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly addOrganization = this.updater((state, organization: Organization) => ({
    ...state, organizations: state.organizations.concat(organization)
  }))


  readonly addTemplate = this.updater((state, template: Template) => ({
    ...state, templates: state.templates.concat(template)
  }))


  readonly addVendor = this.updater((state, vendor: Vendor) => ({
    ...state, vendors: state.vendors.concat(vendor)
  }))


  readonly addReconciliationPeriodType = this.updater((state, reconciliationPeriodType: ReconciliationPeriodType) => ({
    ...state, reconciliationPeriodTypes: state.reconciliationPeriodTypes.concat(reconciliationPeriodType)
  }))


  readonly addCalculationBasisType = this.updater((state, calculationBasisType: CalculationBasisType) => ({
    ...state, calculationBasisTypes: state.calculationBasisTypes.concat(calculationBasisType)
  }))


  readonly addProcess = this.updater((state, process: Process) => ({
    ...state, processes: state.processes.concat(process)
  }))

    

  readonly createContractEffect = this.effect<UserCreateContractInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.contractService.createContract({...input}).pipe(
          tapResponse(
            (contract: Contract) => {
              this.patchState({ item: contract, loading: false })
              return this.router.navigate(['..', contract?.id], {relativeTo: this.route})
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
