/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PcPageComponent } from './pc-page.component';

describe('PcPageComponent', () => {
  let component: PcPageComponent;
  let fixture: ComponentFixture<PcPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
