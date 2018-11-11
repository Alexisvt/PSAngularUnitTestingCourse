import { Directive, HostListener, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { HeroesComponent } from './heroes.component';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  @Input() routerLink: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.routerLink;
  }
}

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;
  let component: HeroesComponent;

  beforeEach(function() {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkStubDirective],
      // schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: HeroService,
          useValue: mockHeroService,
        },
      ],
    });
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
  });

  it('shoulb render each hero as a HeroComponent', () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // act, running ngOnInit
    fixture.detectChanges();

    // expect
    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDEs.length).toBe(3);
    heroComponentDEs.forEach((heroComponent, index) => {
      expect(heroComponent.componentInstance.hero.id).toBe(HEROES[index].id);
    });
  });

  it(`should call heroService.deleteHero when the Hero component's
  delete button is clicked`, () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    spyOn(component, 'deleteHero');

    // act, running ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0]
      .query(By.css('Button'))
      .triggerEventHandler('click', { stopPropagation: () => {} });

    expect(component.deleteHero).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`should call heroService.deleteHero when the Hero component's
  delete button is clicked`, () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    spyOn(component, 'deleteHero');

    // act, running ngOnInit
    fixture.detectChanges();

    // in this case we are not clicking the button
    // instead we are just executing the delete method in child component directly
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    expect(component.deleteHero).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`should call heroService.deleteHero when the Hero component's
  delete button is clicked`, () => {
    // arrange
    spyOn(component, 'deleteHero');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // act, running ngOnInit
    fixture.detectChanges();

    // in this case we are not clicking the button
    // instead we are just emitting the delete event directly, we are not
    // executing the method on the child either.
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].triggerEventHandler('delete', null);

    expect(component.deleteHero).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to the hero list when the add button is clicked', () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({ id: 5, name, strength: 4 }));
    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    // act
    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    // we are doing this step to display the new hero in th HTML
    fixture.detectChanges();

    // assert
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    const routerLink = heroComponents[0]
      .query(By.directive(RouterLinkStubDirective))
      .injector.get(RouterLinkStubDirective);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe('/detail/1');
  });
});
