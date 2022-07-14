import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { filter, tap } from 'rxjs';
import { ControlType } from 'src/app/models/question-base';
import { CheckBoxQuestion } from 'src/app/models/question-checkbox';
import { TextBoxQuestions } from 'src/app/models/question-textbox';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  @Output() addQuestions = new EventEmitter();
  readonly ControlTypeEnum = ControlType;
  questionForm: FormGroup;


  constructor(private fb: FormBuilder, private questionService: QuestionsService) {
    this.questionForm = this.fb.group({
      type: new FormControl(ControlType.PARAGRAPH),
      name: new FormControl(''),
      answers: this.fb.array(this.generateAnswer(5)),
      ownAnswer: new FormControl(false),
      required: new FormControl(false)
    });
  }

  ngOnInit(): void {
  }

  generateAnswer(n: number): Array<FormControl>{
    return new Array(n).fill(null).map(() => new FormControl(''));
  }

  get answers(){
    return this.questionForm.get('answers') as FormArray;
  }

  get questionType(){
    return this.questionForm.get('type') as FormControl;
  }

  addAnotherAnswer(){
    this.answers.push(new FormControl(''));
  }

  submitForm(e: any){
    // console.log(this.questionForm.value);
    // this.addQuestions.emit(this.questionForm.value);
    const valueForm = this.questionForm.value;
    let question;
    if(valueForm.type === ControlType.PARAGRAPH){
      question = new TextBoxQuestions({
        key: `${valueForm.type}-${this.questionService.uuid()}`,
        label: valueForm.name,
        value: '',
        required: valueForm.required,
        order: 1,
        type: ControlType.PARAGRAPH,
        controlType: ControlType.PARAGRAPH,
        options: []
      });
    } else {
      const options:any = [...valueForm.answers];
      if(valueForm.ownAnswer){
        options.push('Other');
      }
      question = new CheckBoxQuestion({
        controlType: ControlType.CHECKBOX,
        type: ControlType.CHECKBOX,
        key: `${valueForm.type}-${this.questionService.uuid()}`,
        label: valueForm.name,
        value: '',
        required: valueForm.required,
        order: 1,
        options: options.map((item: string) => {
          return {key: item, value: false}
        })
      });
    }
    this.questionService.addQuestion(question);

  }
}
