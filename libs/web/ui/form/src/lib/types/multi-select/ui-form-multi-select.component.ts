import { ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormService } from '../../form.service';
import { Observable, toArray } from 'rxjs';

import { Component, NgZone, ChangeDetectorRef, TemplateRef } from '@angular/core'
import { FormControl } from '@angular/forms'
import { NavigationStart, Router } from '@angular/router'
import { DialogRef, DialogService } from '@ngneat/dialog'
import { FieldType } from '@ngx-formly/core'
import { Subject, takeUntil } from 'rxjs'
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  templateUrl: `./ui-form-multi-select.component.html`,
  styles: [
    `
      ::ng-deep .ng-select .ng-select-container {
        margin-top: 0px !important;
      }

      ::ng-deep .ng-dropdown-panel .ng-dropdown-panel-items .ng-option {
        display: flex !important;
        align-items: center;
        gap: 8px;
      }

      ::ng-deep .custom input[type='checkbox'] {
        border-radius: 3px;
      }

      ::ng-deep .ng-dropdown-panel-items input[type='checkbox'] {
        width: 12px;
        height:12px;
        margin-top: 0px;
      }


      ::ng-deep ng-select.ng-invalid.ng-touched {
        .ng-arrow-wrapper {
          margin-right: 22px;
        }
        .ng-select-container {
          border-color: rgb(252 165 165 / var(--tw-border-opacity)) !important;
        }
      }

      .mat-form-field.mat-form-field-appearance-fill.mat-form-field-invalid
        .mat-form-field-wrapper
        .mat-form-field-flex,
      .mat-form-field.mat-form-field-appearance-fill.mat-focused.mat-form-field-invalid
        .mat-form-field-wrapper
        .mat-form-field-flex {
        border-color: red !important;
      }

      .cdk-overlay-container {
        z-index: 2000;
      }

      textarea.mat-input-element {
        box-shadow: none !important;
      }

      .coutry-name {
        width: 190px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      ::ng-deep ngneat-dialog .ngneat-dialog-backdrop {
        z-index: 500;
      }

      .popup-content {
        max-height: 95vh;
      }
    `,
  ],
})

export class UiFormSelectSearchComponent extends FieldType implements OnInit {
  formControl!: FormControl
  @ViewChild('dropDown', { static: true }) dropDownField: NgSelectComponent;
  @ViewChild('ngSelectSpan', { static: false }) ngSelectSpan!: ElementRef;
  public items: any[] = []
  public value: string = null
  loading = true
  refreshFlag = false
  searchTerm
  isAddBtnRequired = true
  private _unsubscribeAll: Subject<any> = new Subject<any>()

  valueProp = 'value';
  labelProp = 'label';
  private dialogRef: DialogRef
  constructor(
    private ref: ChangeDetectorRef,
    private readonly dialog: DialogService,
    private formService: FormService
  ) {
    super()
  }

  async ngOnInit() {
    this.valueProp = this.to.valueProp ?? 'value';
    this.labelProp = this.to.labelProp ?? 'label';
    if(this.to.items && this.to.items.length > 0) {
      this.items = this.to.items;
      this.loading = false
    } else {
      const dataKey = this.to.dataKey;
      if(dataKey) {
        const source = this.formService.getValueForKey(dataKey, this.formState);

        if(source instanceof Array) {
          this.items = source;
          this.loading = false
        } else if(source instanceof Observable) {
          source.subscribe(data => {
            this.items = data;
            this.loading = false
            this.ref.markForCheck()
            this.ref.detectChanges()
          })
        }
      }
    }
    if(this.formControl.value && Array.isArray(this.formControl.value)){
      if(this.to.valueChanged && this.to.valueChanged instanceof Function)
        this.to.valueChanged(this.formControl.value);
    }
  }

  async loadItems(source) {
    source.subscribe(data => {
      this.items = data;
      this.loading = false
      this.refreshNgSelect();
    })

  }

  refreshNgSelect() {
    if (this.dropDownField && !this.refreshFlag) {
      this.refreshFlag = true
      this.dropDownField.ngOnInit(); // Trigger change detection cycle for ng-select
    }
  }

  
  loadData() {
    return new Promise((resolve) => {
      if (typeof this.to.source == 'function') {
        this.to
          ?.source('')
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(async () => {
            await this.refreshItems()
            resolve('success')
          })
      } else {
        this.refreshItems()
        resolve('success')
      }
    })
  }

  refreshItems() {
    return new Promise((resolve) => {
      this.to?.valuesObservable.pipe(takeUntil(this._unsubscribeAll)).subscribe((result: any) => {

        this.items = result
        this.loading = false
        resolve('success')
      })
    })
  }

  async createNewFormValue(createFormValue) {
    if (this.to.createNewFormValue) {
      await this.to.createNewFormValue(createFormValue, this.formControl, this.field)
      if (!this.to.multiple) {
        this.formControl.setValue(createFormValue.id)
      }
      this.ref.markForCheck()
      this.ref.detectChanges()
    }
  }

  changed(e: any) {
    if (e && e?.term && e?.term.trim().length > 0) {
      this.searchTerm = e?.term
      this.isAddBtnRequired = true
    } else {
      this.isAddBtnRequired = false
    }
  }

  manualChange(values: []) {
    if(this.to?.valueChanged){
      const idValus = values.map((value) =>{ return value[this.valueProp]});
      if(this.to.valueChanged && this.to.valueChanged instanceof Function)
        this.to.valueChanged(idValus, values);
    }
  }

  clicked(e: any) {
    if (e) {
      this.formControl.setValue(e)
      this.value = e
    }
  }

  displayFn(e: any): string {

    return e ? e.name : null
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }

  openDialog<T>(tpl: TemplateRef<any>, { formDefaultValue }: { formDefaultValue?: T }) {
    const dialogSize =
      this.to?.createFormSelector == 'ui-clinical-provider-form' ||
      this.to?.createFormSelector == 'ui-medical-record-form'
        ? 'lg'
        : ''
    this.dialogRef = this.dialog.open(tpl, { data: { formDefaultValue }, closeButton: false, size: dialogSize })
  }

  openModal() {
    if (!this.formControl.touched) {
      this.formControl.setErrors(null)
    }
  }

  get classNames(): string {
    this.showError && this.field.formControl.markAsTouched()
    const classes =
      'custom block w-full text-sm md:text-base dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md'
    const invalidClasses =
      'custom border-red-300 text-red-900 placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500'
    return this.showError ? `${classes} ${invalidClasses}` : classes
  }
}
