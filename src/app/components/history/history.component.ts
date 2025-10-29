import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-history',
  standalone: true,    
  imports: [CommonModule, JsonPipe],  
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  history: any[] = [];
  selected: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getHistory().subscribe(data => this.history = data);
  }

  select(item: any) {
    this.selected = item;
  }
}
