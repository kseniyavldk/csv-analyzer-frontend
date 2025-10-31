import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

interface CsvStatistics {
  totalLines: number;
  invalidLines: number;
  min: number;
  max: number;
  mean: number;
  stdDev: number;
  uniqueValues: number;
  invalidLinesDetails?: string[];
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile!: File;
  stats: CsvStatistics | null = null;
  errorMessage = '';

  constructor(private api: ApiService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.stats = null;
    this.errorMessage = '';
  }

  upload() {
    if (!this.selectedFile) return;
    this.api.uploadFile(this.selectedFile).subscribe({
      next: (res) => {
        this.stats = res;
        this.errorMessage = '';
      },
      error: () => {
        this.stats = null;
        this.errorMessage = 'Ошибка при загрузке файла';
      }
    });
  }
}
