import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig, FormlyFormBuilder, FormlyFormOptions } from '@ngx-formly/core'

@Component({
  selector: 'ui-form',
  template: `
    <form class='w-full' [formGroup]="form" novalidate (ngSubmit)="submitForm.emit(model)">
      <div>
        <formly-form [fields]="fields" [form]="form" [model]="model" [options]="options"></formly-form>
        <button type="submit" style="display: none;" [disabled]="form.touched && !form.valid">submit</button>
      </div>
      <ng-content></ng-content>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebUiFormComponent implements OnInit {
  @Input() fields: FormlyFieldConfig[] = []
  @Input() form = new FormGroup({})
  @Input() model?: any = {}
  @Input() options: FormlyFormOptions = {}
  @Output() submitForm = new EventEmitter()

  constructor(private builder: FormlyFormBuilder) {}

  ngOnInit(): void {
    this.builder.buildForm(this.form, this.fields, this.model, this.options)
  }

  submit() {
    this.submitForm.emit(this.model)
  }
}
