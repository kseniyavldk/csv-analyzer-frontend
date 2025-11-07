import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { uploadFile } from '../../store/files.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  template: `
    <div class="upload-form">
      <h2>Загрузить CSV</h2>
      <input type="file" (change)="onFile($event)" accept=".csv" />
      <button mat-raised-button color="primary" (click)="submit()" [disabled]="!selected">Загрузить</button>
    </div>
  `,
  styles: [`
    .upload-form { display:flex; flex-direction:column; gap:12px; max-width:420px; }
    input[type=file] { outline: none; }
  `]
})
export class UploadFormComponent {
  selected: File | null = null;
  constructor(private store: Store, private snack: MatSnackBar) {}

  onFile(e: Event) {
    const inEl = e.target as HTMLInputElement;
    this.selected = inEl.files && inEl.files.length ? inEl.files[0] : null;
  }

  submit() {
    if (!this.selected) return;
    this.store.dispatch(uploadFile({ file: this.selected }));
    this.snack.open('Файл отправлен на обработку', 'ОК', { duration: 2000 });
    this.selected = null;
  }
}
