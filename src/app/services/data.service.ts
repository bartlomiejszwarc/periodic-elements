import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Cell, ELEMENT_DATA, PeriodicElement} from './../data/periodic-table-elements';
import {Injectable} from '@angular/core';
import randomNumberBetween from '../utils/random-number-between';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
  private loadingSubject = new Subject<boolean>();
  loadingObservable: Observable<boolean> = this.loadingSubject.asObservable();

  private dataSubject = new BehaviorSubject<PeriodicElement[] | null>(null);
  dataObservable: Observable<PeriodicElement[] | null> = this.dataSubject.asObservable();

  readonly data = Object.freeze(ELEMENT_DATA);

  getData() {
    const ms = randomNumberBetween(1000, 2000);
    this.loadingSubject.next(true);
    setTimeout(() => {
      this.dataSubject.next([...this.data]);
      this.loadingSubject.next(false);
    }, ms);
  }

  updateCellValue(cell: Cell) {
    const data = this.dataSubject.getValue();
    if (data) {
      const updatedData = data.map((element) => {
        if (element.position === cell.position) {
          return {...element, [cell.column]: cell.value};
        }
        return element;
      });
      this.dataSubject.next(updatedData);
    }
  }
}
