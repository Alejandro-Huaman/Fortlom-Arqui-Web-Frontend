/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImagealbumComponent } from './imagealbum.component';

describe('ImagealbumComponent', () => {
  let component: ImagealbumComponent;
  let fixture: ComponentFixture<ImagealbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagealbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagealbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
