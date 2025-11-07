import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentFile } from '../../store/files.selectors';
import { CsvAnalysisRecord } from '../../models/csv-analysis-record.model';

@Component({
  selector: 'app-upload-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.scss']
})
export class UploadDetailComponent {
  record$: Observable<CsvAnalysisRecord | null>;

  constructor(private store: Store) {
    this.record$ = this.store.select(selectCurrentFile);
  }
}
