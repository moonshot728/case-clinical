
import {IsNotNullOrUndefined,IsNumber, StringIsValidDateString, CellIdIsValidRule } from '@schema-driven/rules-engine'
import {of} from 'rxjs'
import {CasePreAccidentBusinessActionBase} from './case-pre-accident.business-action-base'
import {CasePreAccidentNameIsValidRule} from '../rules/case-pre-accident-name-is-valid.rule';
import {switchMap} from 'rxjs';
import {UserUpdateCasePreAccidentInput} from '@case-clinical/shared/util/sdk';

export class UpdateCasePreAccidentsAction extends CasePreAccidentBusinessActionBase<boolean> {

    constructor(private casePreAccidents: UserUpdateCasePreAccidentInput[]) {
        super('UpdateCasePreAccidentsAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.casePreAccidents,
                true
            )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCasePreAccidents({ input: { casePreAccidents: this.casePreAccidents} }).pipe(
                switchMap(() => of(true))
            )
    }
}

export class UpdateCasePreAccidentAction extends CasePreAccidentBusinessActionBase<boolean> {

    constructor(private casePreAccident: UserUpdateCasePreAccidentInput, private casePreAccidentId: string) {
        super('UpdateCasePreAccidentAction')
    }

    preValidateAction()
    {
        this.validationContext.addRule(
            new IsNotNullOrUndefined(
                'Input',
                'Input should have values',
                this.casePreAccident,
                true
            )
        ).addRule(
            new CellIdIsValidRule(
                'Id',
                'Id should be a CUID and not null',
                this.casePreAccidentId,
                true
                )
        )
    }

    performAction()
    {
        this.response = this.businessProvider.data.userUpdateCasePreAccident({casePreAccidentId: this.casePreAccidentId, input: this.casePreAccident }).pipe(
                switchMap(() => of(true))
            )
    }
}
