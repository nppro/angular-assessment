import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { QuestionBuilderComponent } from './pages/question-builder/question-builder.component';
import { AnswersComponent } from './pages/answers/answers.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicQuestionComponent } from './components/dynamic-question/dynamic-question.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    QuestionBuilderComponent,
    AnswersComponent,
    AddQuestionComponent,
    DynamicQuestionComponent,
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
