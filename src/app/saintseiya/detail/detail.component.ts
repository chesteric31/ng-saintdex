import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map, mergeMap, tap} from 'rxjs/operators';
import {SaintSeiyaDataService} from '../../common/core/services/saint-seiya-data.service';
import {Armor} from '../../common/interfaces/saint-seiya';

@Component({
  selector: 'app-saintseiya-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit, OnDestroy {

  armor: Observable<Armor>;
  currentIndex = 0;

  constructor(
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: SaintSeiyaDataService) { }

  ngOnInit() {
    this.armor = this.activatedRoute.params
      .pipe(
        distinctUntilChanged(),
        mergeMap(params => this.dataService.allArmors.pipe(map(armor => armor.find(a => a.id === +params.id)))),
        tap(armor =>
          this.title.setTitle(`Armor ${armor.name}`)
        )
      );
  }

  ngOnDestroy() {
    this.title.setTitle('NG-Saintdex');
  }

  next() {
    this.currentIndex++;
  }

  previous() {
    this.currentIndex--;
  }

  close() {
    this.router.navigateByUrl('/saintseiya');
  }
}
