import { ControlType, QuestionBase } from "./question-base";

export class TextBoxQuestions extends QuestionBase<string> {
  override controlType = ControlType.PARAGRAPH;
}
