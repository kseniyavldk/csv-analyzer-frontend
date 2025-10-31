import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-upload-history',
  standalone: true,
  imports: [
    DatePipe,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatTooltipModule
  ],
  templateUrl: './upload-history.component.html',
  styleUrls: ['./upload-history.component.scss']
})
export class UploadHistoryComponent implements OnInit {
  displayedColumns: string[] = ['filename', 'processedAt', 'totalLines', 'invalidLines', 'actions'];
  dataSource: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;
    this.http.get<any[]>('http://localhost:8080/api/history').subscribe({
      next: (data) => {
        this.dataSource = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Ошибка при загрузке истории';
        this.loading = false;
      }
    });
  }

 deleteFile(id: number) {
  if (!confirm('Удалить этот файл из истории?')) return;

  this.http.delete(`http://localhost:8080/api/history/${id}`).subscribe({
    next: () => {
      this.dataSource = this.dataSource.filter(item => item.id !== id);
    },
    error: () => {
      this.errorMessage = 'Ошибка при удалении файла';
    }
  });
}

}
