import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {FilterService} from '../../services/filter.service';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-filter-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './filter-input.component.html',
  styleUrl: './filter-input.component.scss',
})
export class FilterInputComponent {
  private filterService = inject(FilterService);
  private dataService = inject(DataService);

  debounceTime: number = 2000;
  filterValue: string = '';
  filterValueSubject = new Subject<string>();

  ngOnInit() {
    this.filterValueSubject.pipe(debounceTime(this.debounceTime)).subscribe((value) => {
      this.filter(value);
    });
  }

  onKeyUp() {
    this.filterValueSubject.next(this.filterValue);
  }

  filter(value: string) {
    this.filterService.setFilterValue(value);
    this.dataService.dataObservable.subscribe(() => this.filterService.setFilterValue(value));
  }

  clearInputValue() {
    this.filterValue = '';
    this.filterService.setFilterValue('');
    this.filterValueSubject.next('');
  }
}
