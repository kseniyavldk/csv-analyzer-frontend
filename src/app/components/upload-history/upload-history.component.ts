import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CsvAnalysisRecord, UploadDetailComponent } from '../upload-detail/upload-detail.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-upload-history',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    UploadDetailComponent
  ],
  templateUrl: './upload-history.component.html',
  styleUrls: ['./upload-history.component.scss']
})
export class UploadHistoryComponent implements OnInit {
  displayedColumns = ['fileName', 'fileSize', 'processedAt', 'mean', 'stdDev', 'actions'];
  dataSource: CsvAnalysisRecord[] = [];
  pagedData: CsvAnalysisRecord[] = [];
  loading = false;
  errorMessage = '';

  currentPage = 0;
  pageSize = 5;
  totalPages = 0;

  selectedRecord: CsvAnalysisRecord | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;
    this.http.get<CsvAnalysisRecord[]>('http://localhost:8080/api/history').subscribe({
      next: (data) => {
        this.dataSource = data;
        this.totalPages = Math.ceil(this.dataSource.length / this.pageSize);
        this.updatePagedData();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Ошибка при загрузке истории';
        this.loading = false;
      }
    });
  }

  updatePagedData() {
    const start = this.currentPage * this.pageSize;
    this.pagedData = this.dataSource.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  openDetails(record: CsvAnalysisRecord) {
    this.selectedRecord = record;
  }

  deleteFile(id: number) {
    if (!confirm('Удалить этот файл из истории?')) return;
    this.http.delete(`http://localhost:8080/api/history/${id}`).subscribe({
      next: () => {
        this.dataSource = this.dataSource.filter(item => item.id !== id);
        this.totalPages = Math.ceil(this.dataSource.length / this.pageSize);
        if (this.currentPage >= this.totalPages) this.currentPage = this.totalPages - 1;
        this.updatePagedData();
        if (this.selectedRecord?.id === id) this.selectedRecord = null;
      },
      error: () => {
        this.errorMessage = 'Ошибка при удалении файла';
      }
    });
  }
}
