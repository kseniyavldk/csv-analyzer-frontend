import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


export interface UploadRecord {
  id: number;
  timestamp: string;
  value: number;
}

@Component({
  selector: 'app-upload-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.scss']
})
export class UploadDetailComponent {
  @Input() record: UploadRecord | null = null;
}