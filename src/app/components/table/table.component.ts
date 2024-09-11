import {Component, inject} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {ColumnType, PeriodicElement} from '../../data/periodic-table-elements';
import {FilterService} from '../../services/filter.service';
import {Subscription} from 'rxjs';
import {DataService} from '../../services/data.service';
import {TableSkeletonComponent} from '../skeletons/table-skeleton/table-skeleton.component';
import {NoMatchesFoundComponent} from './no-matches-found/no-matches-found.component';
import {MatDialog} from '@angular/material/dialog';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, TableSkeletonComponent, NoMatchesFoundComponent, EditDialogComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  filterService = inject(FilterService);
  dataService = inject(DataService);

  columns: ColumnType[] = ['position', 'name', 'weight', 'symbol'];
  elements: PeriodicElement[] = [];
  originalElements: PeriodicElement[] = [];
  loading: boolean = true;
  filterValue: string = '';

  filterSubscription: Subscription = new Subscription();
  dataSubscription: Subscription = new Subscription();
  loadingSubscription: Subscription = new Subscription();

  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.getData();
    this.checkIfLoading();
    this.filterSubscription = this.filterService.filterObservable.subscribe((filterValue) => {
      this.filterData(filterValue);
    });
  }

  getData() {
    this.dataService.getData();
    this.dataSubscription = this.dataService.dataObservable.subscribe((data) => {
      if (data) {
        this.originalElements = [...data];
        this.elements = [...data];
      }
    });
  }

  checkIfLoading() {
    this.loadingSubscription = this.dataService.loadingObservable.subscribe((loading) => {
      this.loading = loading;
    });
  }

  openEditDialog(cellValue: string, position: string, column: string) {
    this.dialog.open(EditDialogComponent, {
      width: '630px',
      enterAnimationDuration: 100,
      exitAnimationDuration: 100,
      data: {cellValue: cellValue, position: position, column: column},
    });
  }

  filterData(filterValue: string) {
    this.elements = this.originalElements.filter((element) =>
      Object.keys(element).some((key) =>
        element[key as keyof PeriodicElement].toString().toLowerCase().includes(filterValue.toLowerCase()),
      ),
    );
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
