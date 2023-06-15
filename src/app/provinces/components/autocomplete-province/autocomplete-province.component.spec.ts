import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutocompleteProvinceComponent } from './autocomplete-province.component';

describe('AutocompleteProvinceComponent', () => {
  let component: AutocompleteProvinceComponent;
  let fixture: ComponentFixture<AutocompleteProvinceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteProvinceComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
