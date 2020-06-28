import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesTabsComponent } from './services-tabs.component';

describe('ServicesTabsComponent', () => {
  let component: ServicesTabsComponent;
  let fixture: ComponentFixture<ServicesTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
