import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubirFicherosPage } from './subir-ficheros.page';

describe('SubirFicherosPage', () => {
  let component: SubirFicherosPage;
  let fixture: ComponentFixture<SubirFicherosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirFicherosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubirFicherosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
