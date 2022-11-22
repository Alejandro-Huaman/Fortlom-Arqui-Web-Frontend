import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistEventCreateComponent } from './artist-event-create.component';

describe('ArtistEventCreateComponent', () => {
  let component: ArtistEventCreateComponent;
  let fixture: ComponentFixture<ArtistEventCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistEventCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistEventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
