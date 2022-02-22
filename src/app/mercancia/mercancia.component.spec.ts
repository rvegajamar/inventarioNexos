/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MercanciaComponent } from './mercancia.component';

describe('MercanciaComponent', () => {
  let component: MercanciaComponent;
  let fixture: ComponentFixture<MercanciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercanciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
