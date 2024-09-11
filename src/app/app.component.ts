import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TableComponent} from './components/table/table.component';
import {FilterInputComponent} from './components/filter-input/filter-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent, FilterInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'periodic-table';
}
