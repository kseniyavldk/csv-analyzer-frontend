import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { uploadFile } from '../../store/files.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | null = null;
  errorMessage = '';
  stats: any = null;
  maxSize = 50 * 1024 * 1024; // 50 MB

  constructor(private store: Store, private snack: MatSnackBar) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.selectedFile = null;
      return;
    }

    const file = input.files[0];

    if (file.size > this.maxSize) {
      this.snack.open('Файл слишком большой. Максимальный размер — 50 МБ.', 'OK', { duration: 4000 });
      this.selectedFile = null;
      return;
    }

    const isCsv = file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv');
    if (!isCsv) {
      this.snack.open('Неверный тип файла. Ожидается CSV.', 'OK', { duration: 4000 });
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
  }

  upload() {
    if (!this.selectedFile) return;
    this.store.dispatch(uploadFile({ file: this.selectedFile }));
    this.snack.open('Файл отправлен на обработку', 'OK', { duration: 2000 });
    this.selectedFile = null;
  }
}
