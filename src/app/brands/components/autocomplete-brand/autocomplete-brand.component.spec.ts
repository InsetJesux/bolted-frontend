import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutocompleteBrandComponent } from './autocomplete-brand.component';

describe('AutocompleteBrandComponent', () => {
  let component: AutocompleteBrandComponent;
  let fixture: ComponentFixture<AutocompleteBrandComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteBrandComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
