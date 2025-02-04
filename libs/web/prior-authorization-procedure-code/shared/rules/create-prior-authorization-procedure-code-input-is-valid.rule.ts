
import {UserCreatePriorAuthorizationProcedureCodeInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {PriorAuthorizationProcedureCodeNameIsValidRule} from './prior-authorization-procedure-code-name-is-valid.rule'

export class CreatePriorAuthorizationProcedureCodeInputIsValidRule extends CompositeRule {target: UserCreatePriorAuthorizationProcedureCodeInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreatePriorAuthorizationProcedureCodeInput, isDisplayable = false) {
    super(name, message, isDisplayable)
    this.target = target

    this.configureRules()
  }

  private configureRules() {this.rules.push(
      new IsNotNullOrUndefined(
        'NotificationIsNotNull',
        'The form message cannot be null or undefined.',
        this.target,
        this.doNotDisplayToUser,
      ),
    )
    this.rules.push(
      new PriorAuthorizationProcedureCodeNameIsValidRule(
        'name',
        'The priorauthorizationprocedurecode name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )
  }
    }

