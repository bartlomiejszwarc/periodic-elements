import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  private filterSubject = new Subject<string>();

  filterObservable: Observable<string> = this.filterSubject.asObservable();

  setFilterValue(filterValue: string) {
    this.filterSubject.next(filterValue);
  }
}
