import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormService } from '../../services/form/form.service';

@Component({
  selector: 'app-modal-add-question',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [],
  templateUrl: './modal-add-question.component.html',
  styleUrl: './modal-add-question.component.scss',
})
export class ModalAddQuestionComponent {
  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<ModalAddQuestionComponent>,
    public formService: FormService
  ) {}
 
  handleSubmit() { 
    this.formService.handleSubmit();
    this.dialogRef.close();
  }
}
