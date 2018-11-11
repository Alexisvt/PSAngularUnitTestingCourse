import { of } from 'rxjs';

import { HeroesComponent } from './heroes.component';

// Isolated test for a Component
describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(function() {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);
  });

  describe('#delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      // arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      // act
      component.deleteHero(HEROES[2]);

      // assert
      expect(component.heroes.length).toBe(2);
    });

    // interaction test
    it('should call deleteHero', () => {
      // arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      // act
      component.deleteHero(HEROES[2]);

      // assert
      // here we are checking not only that the system is calling the correct
      // method, we are also checking that is calling the method with the correct
      // argument
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});
