import {Component} from '@angular/core';
import {ColumnType} from '../../../data/periodic-table-elements';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-no-matches-found',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './no-matches-found.component.html',
  styleUrl: './../table.component.scss',
})
export class NoMatchesFoundComponent {
  columns: ColumnType[] = ['position', 'name', 'weight', 'symbol'];
  array = Array.from({length: 1}, (_, index) => ({
    id: index,
  }));
}
