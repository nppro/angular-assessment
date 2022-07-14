import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/models/question-base';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  questions$!: Observable<Array<QuestionBase<string>>>;

  constructor(private questionService: QuestionsService,) { }

  ngOnInit(): void {
    this.questions$ = this.questionService.getQuestions();
    this.questions$.subscribe();
  }

}
