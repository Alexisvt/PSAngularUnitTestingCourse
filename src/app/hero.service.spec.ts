import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(function() {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
      ],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });

  describe('#getHero', () => {
    // this is one way to request from TestBed the values
    // of the HeroService and the HttpTestingController
    // it('should call get with the correct URL', inject(
    //   [HeroService, HttpTestingController],
    //   (service: HeroService, controller: HttpTestingController) => {
    //     service.getHero(4).subscribe(() => {
    //       console.log('fulfilled');
    //     });

    //     const req = controller.expectOne('api/heroes/4');
    //     req.flush({ id: 4, name: 'SuperDude', strength: 100 });
    //     httpTestingController.verify();
    //   }
    // ));

    it('should call get with the correct URL', () => {
      service.getHero(4).subscribe();

      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({ id: 4, name: 'SuperDude', strength: 100 });
      httpTestingController.verify();
    });
  });
});
