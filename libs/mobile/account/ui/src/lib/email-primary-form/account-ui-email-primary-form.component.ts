import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Email } from '@case-clinical/mobile/core/data-access'
import { MobileUiFormField } from '@case-clinical/mobile/ui/form'

@Component({
  selector: 'account-email-primary-form',
  template: `
    <ui-form (submitForm)="submit($event.payload)" [model]="model" [fields]="fields" [form]="form"></ui-form>
    <div class="">
      <ui-button (handler)="submit(model)" [disabled]="!form.valid" label="Save"></ui-button>
    </div>
  `,
})
export class AccountUiEmailPrimaryFormComponent implements OnChanges {
  @Input() emails: Email[] = []
  @Output() send = new EventEmitter()

  form = new FormGroup({})
  fields = []
  model = {}
  submit(payload: any) {
    this.send.emit(payload)
  }

  ngOnChanges(): void {
    this.model = { ...this.emails.find((item) => item.primary) }
    this.fields = [
      MobileUiFormField.select('id', {
        required: true,
        options: this.emails?.map((email) => ({
          value: email.id,
          label: email.email,
        })),
      }),
    ]
  }
}
