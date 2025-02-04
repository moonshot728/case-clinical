import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { TaskItem } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  selector: 'ui-task-item-form',
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
      <ui-page-header title="Task Item"></ui-page-header>

      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(taskItem))" [model]="taskItem" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 text-right sm:px-6 rounded-b-lg space-x-3"
          >
            <ui-button label="Discard" variant="white" (click)="handleDiscardClick($event)"></ui-button>
            <ui-button label="Save" type="submit"></ui-button>
          </div>
        </ui-form>
      </div>
    </div>
  `,
})
export class WebFormsUiTaskItemComponent {
  @Input() taskItem: TaskItem = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({})

  model: any = {}

  options = {
    formState: {
      mainModel: this.model,
    },
  }

  fields = [
    WebUiFormField.fieldRow([
      WebUiFormField.input('id', { label: 'Id' }, { className: 'w-1/4  px-1', hide: true }),
      WebUiFormField.input(
        'name',
        { label: 'Name' },
        {
          className: 'w-1/2 px-1',
          hideExpression: (model: any, formState: any, field: FormlyFieldConfig) => {
            // access to the main model can be through `this.model` or `formState` or `model
            if (formState.mainModel && formState.mainModel?.name) {
              return formState.mainModel.name !== '123'
            }
            return true
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any, field: FormlyFieldConfig) => {
              // access to the main model can be through `this.model` or `formState` or `model
              return !formState.mainModel.name
            },
          },
        },
      ),
    ]),
    WebUiFormField.fieldRow([
      WebUiFormField.input('legalCaseId', { label: 'Legal Case Id' }, { className: 'w-1/4  px-1', hide: true }),
      WebUiFormField.input('assignedToId', { label: 'Assigned To Id' }, { className: 'w-1/4  px-1', hide: true }),
    ]),
    WebUiFormField.fieldRow([
      WebUiFormField.input('title', { label: 'Title' }, { className: 'w-1/4  px-1' }),
      WebUiFormField.date('dueDate', { label: 'Due Date' }, { className: 'w-1/4  px-1' }),
    ]),
    WebUiFormField.fieldRow([
      WebUiFormField.date('assignedDate', { label: 'Assigned Date' }, { className: 'w-1/4  px-1' }),
      WebUiFormField.date('completedOn', { label: 'Completed On' }, { className: 'w-1/4  px-1' }),
    ]),
    WebUiFormField.fieldRow([
      WebUiFormField.input('completed', { label: 'Completed' }, { className: 'w-1/4  px-1' }),
      WebUiFormField.input('completionNotes', { label: 'Completion Notes' }, { className: 'w-1/4  px-1' }),
    ]),
  ]

  submit({ name, legalCaseId, assignedToId, title, dueDate, assignedDate, completedOn, completed, completionNotes }) {
    this.send.emit({
      name,
      legalCaseId,
      assignedToId,
      title,
      dueDate,
      assignedDate,
      completedOn,
      completed,
      completionNotes,
    })
  }

  handleDiscardClick(event) {}
}
