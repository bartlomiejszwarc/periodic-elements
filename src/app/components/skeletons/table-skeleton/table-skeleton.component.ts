import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {ColumnType} from '../../../data/periodic-table-elements';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  imports: [MatTableModule, NgxSkeletonLoaderModule],
  templateUrl: './table-skeleton.component.html',
  styleUrl: './../../table/table.component.scss',
})
export class TableSkeletonComponent {
  columns: ColumnType[] = ['position', 'name', 'weight', 'symbol'];
  array = Array.from({length: 6}, (_, index) => ({
    id: index,
  }));
}
