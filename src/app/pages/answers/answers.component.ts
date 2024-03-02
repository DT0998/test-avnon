import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../../shared/services/form/form.service';

@Component({
  selector: 'app-form-answers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss',
})
export class AnswersComponent {
  constructor(public router: Router, public formService: FormService) {}
  navigateBuilder() {
    this.router.navigate(['/form', 'builder']);
  }
}
