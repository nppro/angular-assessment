import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlType, QuestionBase } from 'src/app/models/question-base';


export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DynamicQuestionComponent),
  multi: true
};

@Component({
  selector: 'app-dynamic-question',
  templateUrl: './dynamic-question.component.html',
  styleUrls: ['./dynamic-question.component.scss'],
  providers: [TYPE_CONTROL_ACCESSOR]
})
export class DynamicQuestionComponent implements OnInit, ControlValueAccessor {
  @Input() question!: QuestionBase<string>;
  arrValue!: Array<{key:string, value: boolean}>;
  get isValid() {
    return true;
    // return this.form.controls[this.question.key!].valid;
  }

  constructor() { }

  ngOnInit(): void {
    this.arrValue = [...this.question.options!];
  }

  value!: string;


  writeValue(value: string){
    this.value = value;
  }

  private onTouch!: Function;
  private onModelChange!: Function

  registerOnTouched(fn: Function){
    this.onTouch = fn;
  }

  registerOnChange(fn:Function){
    this.onModelChange = fn;
  }

  changeValue(e: any){
    let value;
    if(this.question.controlType === ControlType.PARAGRAPH){
      value = e.target.value;
    } else {
      const index = this.arrValue.findIndex(i => i.key === e.target.value);
      this.arrValue[index].value = !this.arrValue[index].value;
      // if(index > -1){
      //   this.arrValue[index].value = 'false';
      // } else {
      //   this.arrValue[index].value = 'false';
      //   this.arrValue.push({key: e.target.value, value: 'true'});
      // }

      value = this.arrValue;
    }


    this.onModelChange(value);
    this.onTouch();
  }

  selectOptions(){}

}
