import { Component, signal, computed, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-upload-history',
  standalone: true,
 imports: [
  CommonModule,
  FormsModule,
  MatCheckboxModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  UploadDetailComponent
],

  templateUrl: './upload-history.component.html',
  styleUrls: ['./upload-history.component.scss'],
 animations: [
  trigger('rowAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-10px)' }),
      animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
    ])
  ])
]

})
export class UploadHistoryComponent implements OnDestroy {
  files = signal<CsvAnalysisRecord[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selectedRecord = signal<CsvAnalysisRecord | null>(null);

  pageSize = 5;
  currentPage = signal(0);
  displayedColumns = ['fileName', 'fileSize', 'processedAt', 'mean', 'stdDev', 'actions'];

  // сортировка и фильтры
  sortBy = signal<'date' | 'size'>('date');
  sortDirection = signal<'asc' | 'desc'>('desc');
  filterErrors = signal(false);

  private subs = new Subscription();

  constructor(private store: Store, private snack: MatSnackBar) {
    this.subs.add(this.store.select(selectAllFiles).subscribe(f => this.files.set(f)));
    this.subs.add(this.store.select(selectLoading).subscribe(l => this.loading.set(l)));
    this.subs.add(this.store.select(selectError).subscribe(e => {
      this.error.set(e);
      if (e) this.snack.open(e, 'Закрыть', { duration: 4000 });
    }));
    this.store.dispatch(loadHistory());
  }

  ngOnDestroy() { this.subs.unsubscribe(); }

  openDetails(record: CsvAnalysisRecord) {
    this.selectedRecord.set(record);
    this.store.dispatch(loadDetails({ id: record.id }));
  }

  deleteFile(id: number) {
    if (!confirm('Удалить файл?')) return;
    this.store.dispatch(deleteFile({ id }));
    this.snack.open('Запрос на удаление отправлен', 'ОК', { duration: 2000 });
  }

  prevPage() { if (this.currentPage() > 0) this.currentPage.update(v => v - 1); }
  nextPage() { if (this.currentPage() < this.totalPages() - 1) this.currentPage.update(v => v + 1); }

  // Сортировка и фильтры
  filteredSorted(): CsvAnalysisRecord[] {
    let arr = [...this.files()];
    if (this.filterErrors()) arr = arr.filter(f => f.invalidLines > 0);
    arr.sort((a, b) => {
      let cmp = 0;
      if (this.sortBy() === 'date') cmp = new Date(a.processedAt).getTime() - new Date(b.processedAt).getTime();
      else if (this.sortBy() === 'size') cmp = a.fileSize - b.fileSize;
      return this.sortDirection() === 'asc' ? cmp : -cmp;
    });
    return arr;
  }

  pagedData(): CsvAnalysisRecord[] {
    const start = this.currentPage() * this.pageSize;
    return this.filteredSorted().slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredSorted().length / this.pageSize));
  }
}
