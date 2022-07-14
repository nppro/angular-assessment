import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, tap } from 'rxjs';
import { AddQuestionComponent } from 'src/app/components/add-question/add-question.component';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';
import { ControlType, QuestionBase } from 'src/app/models/question-base';

import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question-builder',
  templateUrl: './question-builder.component.html',
  styleUrls: ['./question-builder.component.scss']
})
export class QuestionBuilderComponent implements OnInit, AfterViewInit {
  questions$!: Observable<Array<QuestionBase<any>>>;
  counter = 0;
  @ViewChild('dynamicForm') dynamicForm!: DynamicFormComponent ;
  constructor(public dialog: MatDialog, private questionService: QuestionsService, private router: Router) {}

  ngOnInit(): void {
    this.questions$ = this.questionService.getQuestions();
    // this.questions$.subscribe();
  }

  ngAfterViewInit(): void {
      this.dynamicForm.form.valueChanges.pipe(
        filter(item => !!item),
        tap((item) => {
          console.log(item);

          // const keys = this.questions$.subscribe().map(q => q.key);
          // keys.forEach(k => {
          //   if(!item[k]){

          //   }
          // })
          // console.log(keys);

          // const index = this.questions.findIndex(q => Object.keys(item).findIndex(k => k === q.key));
          // console.log(index);

        })
      ).subscribe();
  }

  addQuestion(){
    console.log('button clicked');


    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '400px',
    });


  }


  review(){
    this.questionService.updateQuestion(this.dynamicForm.form.value);
    this.router.navigate(['/form/answers']);
  }

}
