import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvAnalysisRecord } from '../../models/csv-analysis-record.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-upload-detail',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.scss']
})
export class UploadDetailComponent {
  @Input() record: CsvAnalysisRecord | null = null;
}
