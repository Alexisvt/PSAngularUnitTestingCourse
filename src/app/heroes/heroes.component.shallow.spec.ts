import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;
  let component: HeroesComponent;

  @Component({
    selector: 'app-hero',
    template: '<div></div>',
  })
  class MockHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach(function() {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, MockHeroComponent],
      schemas: [],
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

  it('should set heroes correctly from the service', () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // act
    fixture.detectChanges();

    // assert
    expect(component.heroes).toEqual(HEROES);
  });

  it('should create one li for each hero', () => {
    // arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // act
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(HEROES.length);
  });
});
