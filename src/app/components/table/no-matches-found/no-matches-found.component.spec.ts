import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMatchesFoundComponent } from './no-matches-found.component';

describe('NoMatchesFoundComponent', () => {
  let component: NoMatchesFoundComponent;
  let fixture: ComponentFixture<NoMatchesFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoMatchesFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoMatchesFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
