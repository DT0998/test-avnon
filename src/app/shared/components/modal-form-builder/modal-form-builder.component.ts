import { Component, DoCheck, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalAddQuestionComponent } from '../modal-add-question/modal-add-question.component';
import { FormService } from '../../services/form/form.service';

@Component({
  selector: 'app-modal-form-builder',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ModalAddQuestionComponent,
    MatDialogModule,
  ],
  providers: [],
  templateUrl: './modal-form-builder.component.html',
  styleUrl: './modal-form-builder.component.scss',
})
export class ModalFormBuilderComponent {
  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<ModalFormBuilderComponent>,
    public dialog: MatDialog,
    public formService: FormService
  ) {}

  openModalAddNewQuestion() {
    this.dialog.open(ModalAddQuestionComponent, {
      width: '300px',
    });
  }

  navigateAnswers() {
    this.router.navigate(['/form', 'answers']);
    this.dialogRef.close();
  }
}
