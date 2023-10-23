import { Component, } from '@angular/core';
import { getAllCountriesAndCapitals, getCountryCapitalTableRandomElements, shuffleArray } from './data/countries.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { correctOptionsSelected, gameSizeChange, optionSelected, restartGame, wrongOptionsSelected } from './ngrx/game.actions';
import { Option } from './data/option.model'
import { State, defaultGameSize, selectCorrectAnswers, selectGameFinshed, selectOptions, selectWrongAnswers } from './ngrx/game.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  gameSize: number = defaultGameSize;
  correctAnswers$: Observable<number>;
  wrongAnswers$: Observable<number>;
  options$: Observable<Option[]>;


  constructor(private store: Store<State>) {
    this.correctAnswers$ = this.store.select(selectCorrectAnswers);
    this.wrongAnswers$ = this.store.select(selectWrongAnswers);
    this.options$ = this.store.select(selectOptions)
    this.store.select(selectGameFinshed).subscribe(
      data => {
        if (data) {
          alert("GG finito!")
        }
      }
    )
  }

  restartGame() {
    this.store.dispatch(restartGame())
  }

  optionSelectedNgRx(option: Option) {
    this.store.dispatch(optionSelected({ option }))
  }

  onChange($event: any) {
    this.store.dispatch(gameSizeChange({ size: $event.target.value }))
  }

}
