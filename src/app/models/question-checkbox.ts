import { ControlType, QuestionBase } from "./question-base";

export class CheckBoxQuestion extends QuestionBase<string>{
  override controlType: ControlType = ControlType.CHECKBOX;
}
