import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalFormBuilderComponent } from '../../shared/components/modal-form-builder/modal-form-builder.component';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatDialogModule,
    ModalFormBuilderComponent,
  ],
  providers: [],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
})
export class BuilderComponent {
  constructor(public dialog: MatDialog) {}

  openModal() {
    this.dialog.open(ModalFormBuilderComponent, {
      width: '450px',
    });
  }
}
