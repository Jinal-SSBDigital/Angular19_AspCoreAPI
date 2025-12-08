import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwnldRegFormComponent } from './dwnld-reg-form.component';

describe('DwnldRegFormComponent', () => {
  let component: DwnldRegFormComponent;
  let fixture: ComponentFixture<DwnldRegFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DwnldRegFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DwnldRegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
