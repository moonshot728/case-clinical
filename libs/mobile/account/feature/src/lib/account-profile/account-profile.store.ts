import { Injectable } from '@angular/core'

import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { AccountUpdateProfileInput, MobileCoreDataAccessService, User } from '@case-clinical/mobile/core/data-access'
import { mergeMap, switchMap, tap } from 'rxjs/operators'

interface AccountProfileState {
  profile?: User
  errors?: any
  loading: boolean
}

@Injectable()
export class AccountProfileStore extends ComponentStore<AccountProfileState> {
  constructor(private readonly data: MobileCoreDataAccessService) {
    super({ loading: false })
  }

  readonly vm$ = this.select(({ profile, errors, loading }) => ({
    profile,
    errors,
    loading,
  }))

  readonly updateProfileEffect = this.effect<AccountUpdateProfileInput>((input$) =>
    input$.pipe(
      mergeMap((input) =>
        this.data.accountUpdateProfile({ input }).pipe(
          tapResponse(
            ({ errors }) => {
              this.patchState({ errors })
              this.loadProfileEffect()
            },
            (errors) => this.patchState({ errors, loading: false }),
          ),
        ),
      ),
    ),
  )

  readonly updateUsernameEffect = this.effect<string>((username$) =>
    username$.pipe(
      mergeMap((username) =>
        this.data.accountUpdateUsername({ username }).pipe(
          tapResponse(
            ({ errors }) => {
              this.patchState({ errors })
              this.loadProfileEffect()
            },
            (errors) => this.patchState({ errors, loading: false }),
          ),
        ),
      ),
    ),
  )

  readonly loadProfileEffect = this.effect(($) => {
    return $.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this.data.accountProfile({}, { fetchPolicy: 'no-cache' }).pipe(
          tapResponse(
            ({ data, errors }) => {
              this.patchState({
                profile: data?.accountProfile,
                loading: false,
                errors,
              })
            },
            (errors) => this.patchState({ errors, loading: false }),
          ),
        ),
      ),
    )
  })

  private readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }))
}
