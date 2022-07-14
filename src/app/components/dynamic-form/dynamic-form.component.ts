import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormRecord, Validators } from '@angular/forms';
import { filter, tap } from 'rxjs';
import { QuestionBase } from 'src/app/models/question-base';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {
  form!: FormGroup;
  @Input() questions: Array<QuestionBase<string>> = [];
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
   }

   ngOnChanges(changes: SimpleChanges): void {
      console.log('changes');
      if(this.questions.length > 0){
        this.questions.forEach(question => {
          console.log(question);
          const control = question.required ? new FormControl(question.value || '', Validators.required)
          : new FormControl(question.value || '');
          this.form.addControl(question.key, control);
        });

      }
   }

  ngOnInit(): void {

  }

  onSubmit(){
    console.log('submit',this.form.value);
    ;
  }

  toFormGroup(questions: QuestionBase<string>[] ) {
    const group: any = {};

    questions.forEach(question => {
      console.log(question);
      group[question.key!] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
