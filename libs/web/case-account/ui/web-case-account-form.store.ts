
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, CaseAccount, UserCreateCaseAccountInput, LegalCase,Location,Vendor,AccountStatus,ProcedureType,AgreementType,User,Contract,Portfolio,ProcedureVendor } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CaseAccountFormState {
  errors?: any
  loading?: boolean
  item?: CaseAccount,
 legalCases?: LegalCase[],
 locations?: Location[],
 vendors?: Vendor[],
 accountStatuses?: AccountStatus[],
 procedureTypes?: ProcedureType[],
 agreementTypes?: AgreementType[],
 users?: User[],
 contracts?: Contract[],
 portfolios?: Portfolio[],
 procedureVendors?: ProcedureVendor[]
  searchTerm?: string
}

@Injectable()
export class WebCaseAccountFormStore extends ComponentStore<CaseAccountFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly locations$ = this.select((s) => s.locations || [])
  readonly vendors$ = this.select((s) => s.vendors || [])
  readonly accountStatuses$ = this.select((s) => s.accountStatuses || [])
  readonly procedureTypes$ = this.select((s) => s.procedureTypes || [])
  readonly agreementTypes$ = this.select((s) => s.agreementTypes || [])
  readonly users$ = this.select((s) => s.users || [])
  readonly contracts$ = this.select((s) => s.contracts || [])
  readonly portfolios$ = this.select((s) => s.portfolios || [])
  readonly procedureVendors$ = this.select((s) => s.procedureVendors || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.legalCases$,this.locations$,this.vendors$,this.accountStatuses$,this.procedureTypes$,this.agreementTypes$,this.users$,this.contracts$,this.portfolios$,this.procedureVendors$,
    (errors, loading, item, legalCases,locations,vendors,accountStatuses,procedureTypes,agreementTypes,users,contracts,portfolios,procedureVendors ) => ({
    errors,
    loading,
    item,
legalCases,locations,vendors,accountStatuses,procedureTypes,agreementTypes,users,contracts,portfolios,procedureVendors
  }),
{debounce: true})



  readonly filterLegalCases = (term) => 
        this.data.userLegalCases({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let legalCases = res.data.items;
              this.patchState({legalCases})
              return legalCases
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


  readonly filterLocations = (term) => 
        this.data.userLocations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let locations = res.data.items;
              this.patchState({locations})
              return locations
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
        this.data.userVendors({input: { name: term}}).pipe(
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


  readonly filterAccountStatuses = (term) => 
        this.data.userAccountStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let accountStatuses = res.data.items;
              this.patchState({accountStatuses})
              return accountStatuses
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


  readonly filterProcedureTypes = (term) => 
        this.data.userProcedureTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let procedureTypes = res.data.items;
              this.patchState({procedureTypes})
              return procedureTypes
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


  readonly filterAgreementTypes = (term) => 
        this.data.userAgreementTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let agreementTypes = res.data.items;
              this.patchState({agreementTypes})
              return agreementTypes
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


  readonly filterUsers = (term) => 
        this.data.userUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
              this.patchState({users})
              return users
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


  readonly filterContracts = (term) => 
        this.data.userContracts({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let contracts = res.data.items;
              this.patchState({contracts})
              return contracts
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


  readonly filterPortfolios = (term) => 
        this.data.userPortfolios({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let portfolios = res.data.items;
              this.patchState({portfolios})
              return portfolios
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


  readonly filterProcedureVendors = (term) => 
        this.data.userProcedureVendors({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let procedureVendors = res.data.items;
              this.patchState({procedureVendors})
              return procedureVendors
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



  readonly createCaseAccountEffect = this.effect<UserCreateCaseAccountInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateCaseAccount({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
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


  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))


  readonly addLocation = this.updater((state, location: Location) => ({
    ...state, locations: state.locations.concat(location)
  }))


  readonly addVendor = this.updater((state, vendor: Vendor) => ({
    ...state, vendors: state.vendors.concat(vendor)
  }))


  readonly addAccountStatus = this.updater((state, accountStatus: AccountStatus) => ({
    ...state, accountStatuses: state.accountStatuses.concat(accountStatus)
  }))


  readonly addProcedureType = this.updater((state, procedureType: ProcedureType) => ({
    ...state, procedureTypes: state.procedureTypes.concat(procedureType)
  }))


  readonly addAgreementType = this.updater((state, agreementType: AgreementType) => ({
    ...state, agreementTypes: state.agreementTypes.concat(agreementType)
  }))


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))


  readonly addContract = this.updater((state, contract: Contract) => ({
    ...state, contracts: state.contracts.concat(contract)
  }))


  readonly addPortfolio = this.updater((state, portfolio: Portfolio) => ({
    ...state, portfolios: state.portfolios.concat(portfolio)
  }))


  readonly addProcedureVendor = this.updater((state, procedureVendor: ProcedureVendor) => ({
    ...state, procedureVendors: state.procedureVendors.concat(procedureVendor)
  }))

}
