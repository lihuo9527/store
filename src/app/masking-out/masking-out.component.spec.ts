/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MaskingOutComponent } from './masking-out.component';

describe('MaskingOutComponent', () => {
  let component: MaskingOutComponent;
  let fixture: ComponentFixture<MaskingOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskingOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskingOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
