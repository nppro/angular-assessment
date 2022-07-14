import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { QuestionBase } from '../models/question-base';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private questions: Array<QuestionBase<string>> = [];
  private subject$ = new BehaviorSubject<Array<QuestionBase<string>>>([]);

  constructor() { }

  getQuestions(): Observable<Array<QuestionBase<string>>> {
    return this.subject$.asObservable();
  }

  addQuestion(question: QuestionBase<string>){
    console.log('--ADD QUESTIONS---', question);
    this.questions = [...this.questions, question];
    this.subject$.next(this.questions);
    console.log(this.subject$);
  }

  updateQuestion(formValue: any){
    console.log('--UPDATE QUESTIONS--', formValue);
    this.questions.forEach(q => {
      if(formValue[q.key]){
        q.value = formValue[q.key];
      }
    });
    this.subject$.next([...this.questions]);

  }

  uuid(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}
