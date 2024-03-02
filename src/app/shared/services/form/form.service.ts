import { Injectable, signal } from '@angular/core';

export interface IForm {
  questions: IQuestion[];
}

export interface IQuestion {
  id: number;
  questionType: string;
  question: string;
  checkboxAnswers?: IAnswerCheckbox[];
  paragraphAnswer?: IAnswerParagraph;
}

export interface IAnswerCheckbox {
  required?: boolean | null;
  id: number;
  name?: string;
  title?: string;
  content: string;
  checked?: boolean;
}

export interface IAnswerParagraph {
  id: number;
  content?: string;
  required?: boolean | null;
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  isAllowOthers = signal(false);
  isRequired = signal<null | boolean>(null);
  questionType = signal('checkbox');
  question = signal('');
  hasRequired = signal(false);
  checkboxAnswers = signal([
    {
      id: Math.random(),
      name: '',
      title: '',
      content: '',
      checked: false,
      required: this.isRequired(),
    },
    {
      id: Math.random(),
      name: '',
      title: '',
      content: '',
      checked: false,
      required: this.isRequired(),
    },
  ]);
  checkedAnswers = signal(false);
  paragraphAnswer = signal('');
  formBuilder = signal({
    questions: [
      {
        id: Math.random(),
        questionType: 'paragraph',
        question: 'Please tell us about yourself*',
        paragraphAnswer: { id: 1, content: '', required: null },
      },
      {
        id: Math.random(),
        questionType: 'checkbox',
        question: 'Please select the language you know*',
        checkboxAnswers: [
          {
            id: 1,
            name: 'typescript',
            title: 'TypeScript',
            content: '',
            checked: false,
            required: null,
          },
          {
            id: 2,
            name: 'python',
            title: 'Python',
            content: '',
            checked: false,
            required: null,
          },
          {
            id: 3,
            name: 'c#',
            title: 'C#',
            content: '',
            checked: false,
            required: null,
          },
          {
            id: 4,
            name: 'other',
            title: 'Other',
            content: '',
            checked: false,
            required: null,
          },
        ],
      },
    ],
  });
  constructor() {}

  handleQuestionName(name: string): void {
    this.question.set(name);
  }

  handleIsRequired(isRequired: boolean): void {
    if (isRequired) {
      this.isRequired.set(true);
      this.hasRequired.set(true);
    } else {
      this.isRequired.set(null);
      this.hasRequired.set(false);
    }
  }

  handleAllowOthers(isAllowOthers: boolean): void {
    this.isAllowOthers.set(isAllowOthers);
  }

  handleParagraphAnswer(answer: string): void {
    this.checkAnswersEmpty(answer);
    this.paragraphAnswer.set(answer);
  }

  updateRequiredParagraphAnswer(answer: IQuestion): void {
    if (answer.paragraphAnswer && answer.paragraphAnswer.required !== null) {
      if (answer.paragraphAnswer.content) {
        answer.paragraphAnswer.required = false;
      } else {
        answer.paragraphAnswer.required = true;
      }
    }
  }

  selectQuestionType(type: string): void {
    if (type === 'checkbox') {
      this.paragraphAnswer();
    }
    if (type === 'paragraph') {
      this.checkboxAnswers();
    }
    this.questionType.set(type);
  }

  checkAnswersEmpty(answer: string) {
    if (answer.trim()) {
      this.hasRequired.set(false);
    } else {
      this.hasRequired.set(true);
    }
  }

  handleCheckboxAnswer(answer: string, index: number): void {
    const newAnswers = this.checkboxAnswers().map((item) => {
      // they can edit specific value input
      if (item.id === index) {
        this.checkAnswersEmpty(answer);
        if (this.isAllowOthers()) {
          return {
            ...item,
            id: Math.random(),
            name: answer,
            title: answer,
            content: answer,
            checked: false,
            required: this.isRequired(),
          };
        } else {
          return {
            ...item,
            id: Math.random(),
            name: answer,
            title: answer,
            content: '',
            checked: false,
            required: this.isRequired(),
          };
        }
      }
      return item;
    });
    this.checkboxAnswers.set(newAnswers);
  }

  addOption(): void {
    if (this.checkboxAnswers().length < 5) {
      this.checkboxAnswers().push({
        id: Math.random(),
        name: '',
        title: '',
        content: '',
        checked: false,
        required: null,
      });
    }
  }

  // submit add new question
  handleSubmit(): void {
    const newQuestion: any = {
      id: Math.random(),
      questionType: this.questionType(),
      question: this.question(),
    };

    if (this.questionType() === 'checkbox') {
      newQuestion.checkboxAnswers = this.checkboxAnswers();
    }
    if (this.questionType() === 'paragraph') {
      newQuestion.paragraphAnswer = {
        id: Math.random(),
        content: this.paragraphAnswer(),
        required: this.hasRequired(),
      };
    }

    this.formBuilder().questions.push(newQuestion);
    console.log(this.formBuilder());
    this.resetForm();
  }

  // check if the form has empty required fields
  hasEmptyRequiredFields(): boolean {
    for (const question of this.formBuilder().questions) {
      // case paragraph
      if (question.questionType === 'paragraph') {
        if (
          question.paragraphAnswer?.required &&
          question.paragraphAnswer.content.trim() === ''
        ) {
          return true;
        }
        // case checkbox
      } else if (question.questionType === 'checkbox') {
        for (const answer of question.checkboxAnswers ?? []) {
          if (answer.required && answer.content.trim() === '') {
            return true;
          }
        }
      }
    }
    return false;
  }

  updateAnswerCheckbox(answer: IAnswerCheckbox, index: number): void {
    answer.content = answer.title ?? '';
    // lowercase name
    answer.name = (answer.title ?? '').toLowerCase().replace(/\s+/g, '_') || '';
    // Update the answer in the formBuilder signal
    const formBuilderValue = this.formBuilder();
    if (formBuilderValue) {
      const questions = formBuilderValue.questions;
      if (questions && questions[index] && questions[index].checkboxAnswers) {
        const checkboxAnswers = questions[index].checkboxAnswers;
        if (checkboxAnswers && checkboxAnswers[index]) {
          checkboxAnswers[index] = {
            ...checkboxAnswers[index],
            id: answer.id,
            name: answer.name || '',
            title: answer.title || '',
            content: answer.content || '',
            checked: answer.checked || false,
            required: null,
          };
          this.formBuilder.set(formBuilderValue);
        }
      }
    }
  }

  updateCheckedAnswer(answer: IAnswerCheckbox): void {
    answer.checked = !answer.checked;
    if (answer.required !== null) {
      if (answer.checked) {
        answer.required = false;
      } else {
        answer.required = true;
      }
    }
  }

  resetForm() {
    // Clear form fields
    this.question.set('');
    this.isRequired.set(null);
    this.checkboxAnswers.set([
      {
        id: Math.random(),
        name: '',
        title: '',
        content: '',
        checked: false,
        required: this.isRequired(),
      },
      {
        id: Math.random(),
        name: '',
        title: '',
        content: '',
        checked: false,
        required: this.isRequired(),
      },
    ]);
    this.paragraphAnswer.set('');
    // Reset state variables
    this.isAllowOthers.set(false);
    this.questionType.set('checkbox');
  }
}
