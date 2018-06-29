/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyExpressComponent } from './my-express.component';

describe('MyExpressComponent', () => {
  let component: MyExpressComponent;
  let fixture: ComponentFixture<MyExpressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyExpressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyExpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
