import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CsvAnalysisRecord {
  id: number;
  fileName: string;
  fileSize: number;
  processedAt: string;
  totalLines: number;
  invalidLines: number;
  min: number;
  max: number;
  mean: number;
  stdDev: number;
  uniqueValues: number;
}

@Component({
  selector: 'app-upload-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="upload-detail" *ngIf="record; else noRecord">
      <h2>Детали файла: {{ record.fileName }}</h2>
      <div class="detail-row"><strong>Размер:</strong> {{ record.fileSize }} байт</div>
      <div class="detail-row"><strong>Дата анализа:</strong> {{ record.processedAt | date:'dd.MM.yyyy HH:mm' }}</div>
      <div class="detail-row"><strong>Всего строк:</strong> {{ record.totalLines }}</div>
      <div class="detail-row"><strong>Ошибочных:</strong> {{ record.invalidLines }}</div>
      <div class="detail-row"><strong>Минимум:</strong> {{ record.min }}</div>
      <div class="detail-row"><strong>Максимум:</strong> {{ record.max }}</div>
      <div class="detail-row"><strong>Среднее:</strong> {{ record.mean }}</div>
      <div class="detail-row"><strong>Стандартное отклонение:</strong> {{ record.stdDev }}</div>
      <div class="detail-row"><strong>Уникальные значения:</strong> {{ record.uniqueValues }}</div>
    </div>
    <ng-template #noRecord>
      <p>Выберите файл для отображения деталей</p>
    </ng-template>
  `,
  styleUrls: ['./upload-detail.component.scss']
})
export class UploadDetailComponent {
  @Input() record: CsvAnalysisRecord | null = null;
}
