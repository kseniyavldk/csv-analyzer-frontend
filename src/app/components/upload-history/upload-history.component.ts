import { Component, signal, computed, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CsvAnalysisRecord } from '../../models/csv-analysis-record.model';
import { selectAllFiles, selectLoading, selectError } from '../../store/files.selectors';
import { loadHistory, deleteFile, loadDetails } from '../../store/files.actions';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UploadDetailComponent } from '../upload-detail/upload-detail.component';

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
export class UploadHistoryComponent implements OnDestroy {
  files = signal<CsvAnalysisRecord[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selectedRecord = signal<CsvAnalysisRecord | null>(null);

  pageSize = 5;
  currentPage = signal(0);
  displayedColumns = ['fileName', 'fileSize', 'processedAt', 'mean', 'stdDev', 'actions'];

  private subs = new Subscription();

  constructor(private store: Store, private snack: MatSnackBar) {
    // Подписываемся на селекторы NgRx и обновляем сигналы
    this.subs.add(this.store.select(selectAllFiles).subscribe(f => this.files.set(f)));
    this.subs.add(this.store.select(selectLoading).subscribe(l => this.loading.set(l)));
    this.subs.add(this.store.select(selectError).subscribe(e => {
      this.error.set(e);
      if (e) this.snack.open(e, 'Закрыть', { duration: 4000 });
    }));

    // Загружаем историю
    this.store.dispatch(loadHistory());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  openDetails(record: CsvAnalysisRecord) {
    this.selectedRecord.set(record);
    this.store.dispatch(loadDetails({ id: record.id }));
  }

  deleteFile(id: number) {
    if (!confirm('Удалить файл?')) return;
    this.store.dispatch(deleteFile({ id }));
    this.snack.open('Запрос на удаление отправлен', 'ОК', { duration: 2000 });
  }

  prevPage() {
    if (this.currentPage() > 0) this.currentPage.update(v => v - 1);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages() - 1) this.currentPage.update(v => v + 1);
  }

  pagedData(): CsvAnalysisRecord[] {
    const start = this.currentPage() * this.pageSize;
    return this.files().slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.max(1, Math.ceil(this.files().length / this.pageSize));
  }
}
