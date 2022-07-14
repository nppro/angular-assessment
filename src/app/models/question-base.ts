export enum ControlType {CHECKBOX = 'checkbox', PARAGRAPH='textarea'};

export interface IOptions<T> {
  value: T|undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: ControlType;
  type: string;
  options: {key: string, value: boolean}[];
}

export class QuestionBase<T> {
  value?: T|undefined;
  key: string;
  label?: string;
  required?: boolean;
  order?: number;
  controlType?: ControlType;
  type?: string;
  options?: {key: string, value: boolean}[];


  constructor(options: IOptions<T>){
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || ControlType.PARAGRAPH;
    this.type = options.type || '';
    this.options = options.options || [];
  }
}
