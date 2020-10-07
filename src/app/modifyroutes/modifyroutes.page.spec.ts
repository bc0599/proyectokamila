import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyroutesPage } from './modifyroutes.page';

describe('ModifyroutesPage', () => {
  let component: ModifyroutesPage;
  let fixture: ComponentFixture<ModifyroutesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyroutesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyroutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
