import { Location } from '@angular/common';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let mockLocation;
  let mockHeroService;
  let mockActivatedRoute;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(function() {
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: HeroService,
          useValue: mockHeroService,
        },
        {
          provide: Location,
          useValue: mockLocation,
        },
      ],
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100 }));
  });

  it('should render the hero name in a h2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

  it('should call updateHero when save is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    // tick(250);
    flush();

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  // this kind of test won't work with timeouts
  it('should call updateHero when save is called', async(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.saveWithPromise();

    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });
  }));

  // fakeAsync works with both, promises and timeouts
  it('should call updateHero when save is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.saveWithPromise();
    flush();

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));
});
