import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculeAgoraComponent } from './calcule-agora.component';

describe('CalculeAgoraComponent', () => {
  let component: CalculeAgoraComponent;
  let fixture: ComponentFixture<CalculeAgoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculeAgoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculeAgoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
