/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndexNavComponent } from './index-nav.component';

describe('IndexNavComponent', () => {
  let component: IndexNavComponent;
  let fixture: ComponentFixture<IndexNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
