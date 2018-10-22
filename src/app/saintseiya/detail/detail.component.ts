import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map, mergeMap, tap} from 'rxjs/operators';
import {SaintSeiyaDataService} from '../../common/core/services/saint-seiya-data.service';
import {Armor} from '../../common/interfaces/saint-seiya';

@Component({
  selector: 'app-saintseiya-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  armor: Observable<Armor>;

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
    // this.title.setTitle('Search for Armors');
  }

  next() {
    const paramId = +this.activatedRoute.snapshot.params.id;
    const id = paramId === 1 ? 151 : paramId - 1;
    this.router.navigateByUrl(`/saintseiya/${id}`);
  }

  previous() {
    const paramId = +this.activatedRoute.snapshot.params.id;
    const id = paramId < 151 ? paramId + 1 : 1;
    this.router.navigateByUrl(`/saintseiya/${id}`);
  }

  close() {
    this.router.navigateByUrl('/saintseiya');
  }
}
