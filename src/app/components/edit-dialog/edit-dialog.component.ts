import {Component, inject, Inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {DataService} from '../../services/data.service';
import {Cell, PeriodicElement} from '../../data/periodic-table-elements';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogTitle,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cellValue: string;
      position: number;
      column: keyof PeriodicElement;
    },
  ) {}
  dataService = inject(DataService);
  updatedCellValue: string = '';

  updateCellValue(cellValue: string | number, position: number, column: keyof PeriodicElement) {
    const updatedCell: Cell = {value: cellValue, position: position, column: column};
    this.dataService.updateCellValue(updatedCell);
  }

  clearInputValue() {
    this.updatedCellValue = '';
  }
}
