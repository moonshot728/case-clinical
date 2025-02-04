
import {UserCreateUserRoleInput} from '@case-clinical/shared/util/sdk'
import {CompositeRule,IsNotNullOrUndefined} from '@schema-driven/rules-engine'
import {UserRoleNameIsValidRule} from './user-role-name-is-valid.rule'

export class CreateUserRoleInputIsValidRule extends CompositeRule {target: UserCreateUserRoleInput
  displayToUser = true
  doNotDisplayToUser = false

  constructor(name: string,message: string, target: UserCreateUserRoleInput, isDisplayable = false) {
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
      new UserRoleNameIsValidRule(
        'name',
        'The userrole name is not valid. Must be within 2 and 255 characters.',
        this.target.name,
        2,
        255,
      )
    )

    ////this.rules.push(
    ////  new ScqNumerIsValidRule (
    ////    "scqNumber",
    ////    "The scq number is not vlaid, Must be within 2 and 10 characters.",
    ////    this.target.scqNumber,
    ////    2, 
    ////    10
    ////  )
    ////)
  }
    }

