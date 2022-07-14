import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswersComponent } from './pages/answers/answers.component';
import { QuestionBuilderComponent } from './pages/question-builder/question-builder.component';
import { QuestionsComponent } from './pages/questions/questions.component';

const routes: Routes = [
  {
  path: 'form', component: QuestionsComponent, children: [
    {path: '', redirectTo: 'builder', pathMatch: 'full'},
    {path: 'builder', component: QuestionBuilderComponent},
    {path: 'answers', component: AnswersComponent}
  ]
  },
  {path: '', redirectTo: '/form', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
