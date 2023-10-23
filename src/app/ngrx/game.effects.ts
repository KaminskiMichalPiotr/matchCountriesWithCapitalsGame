import { Actions, createEffect, ofType } from "@ngrx/effects";
import { correctOptionsSelected, gameEnd, gameSizeChange, optionSelected, optionSelectedSucces, resetOptionsAfterNextSelection, restartGame, wrongOptionsSelected } from "./game.actions";
import { concatMap, filter, map, of, switchMap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { State, selectGameState } from "./game.reducer";
import { Store } from "@ngrx/store";
import { getAllCountriesAndCapitals } from "../data/countries.model";
import { Option } from "../data/option.model";


@Injectable()
export class GameEffects {

  constructor(private actions$: Actions, private store: Store<State>) {

  }

  //TODO: game won alert

  resizeGame$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(gameSizeChange),
        map(action => restartGame())
      )
    }
  )


  checkSelectedOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(optionSelected),
      switchMap(action =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(selectGameState)
          ),
          concatMap(([action, latest]) => {
            if (latest.selectedOptions.length == 2) {
              if (this.checkIfIsCorrectPair(latest.selectedOptions[0], latest.selectedOptions[1])) {
                if (latest.gameSize == latest.correctAnswers + 1)
                  return of(correctOptionsSelected({ options: [...latest.selectedOptions] }), gameEnd())
                return of(correctOptionsSelected({ options: [...latest.selectedOptions] }))
              }
              else {
                return of(wrongOptionsSelected({ options: [...latest.selectedOptions] }))
              }
            } else if (latest.selectedOptions.length >= 2) {
              return of(resetOptionsAfterNextSelection({ options: [...latest.selectedOptions.slice(0, 2)] }))
            }
            return of(optionSelectedSucces());
          })
        )
      )
    );
  });


  checkIfIsCorrectPair(option1: Option, option2: Option): boolean {
    //mixed options, btn1 or btn2 can be country or neither or both
    let answearsTable = getAllCountriesAndCapitals();

    var option = answearsTable[option1.textValue]
    if (option == option2.textValue) {
      return true;
    }
    option = answearsTable[option2.textValue]
    if (option == option1.textValue) {
      return true;
    }
    return false;
  }

}