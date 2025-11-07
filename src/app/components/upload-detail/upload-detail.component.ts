import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvAnalysisRecord } from '../../models/csv-analysis-record.model';

@Component({
  selector: 'app-upload-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.scss']
})
export class UploadDetailComponent {
  @Input() record: CsvAnalysisRecord | null = null;
}
