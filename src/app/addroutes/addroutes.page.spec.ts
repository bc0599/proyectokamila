import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddroutesPage } from './addroutes.page';

describe('AddroutesPage', () => {
  let component: AddroutesPage;
  let fixture: ComponentFixture<AddroutesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddroutesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddroutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
