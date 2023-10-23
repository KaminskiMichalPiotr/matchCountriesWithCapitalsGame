import { createAction, props } from "@ngrx/store";
import { Option } from "../data/option.model";


export const optionSelected = createAction(
    '[GAME] Option selected',
    props<{ option: Option }>()
)

export const resetOptionsAfterNextSelection = createAction(
    '[GAME] Reset option after next pair selection start',
    props<{ options: Option[] }>()
)

export const gameEnd = createAction(
    '[GAME] Has ended'
)

export const optionSelectedSucces = createAction(
    '[GAME] Option selected success'
)

export const wrongOptionsSelected = createAction(
    '[GAME] Wrong pair of options selected',
    props<{ options: Option[] }>()
)

export const correctOptionsSelected = createAction(
    '[GAME] Correct pair of options selected',
    props<{ options: Option[] }>()
)

export const restartGame = createAction(
    '[GAME] Restart game'
)

export const gameSizeChange = createAction(
    '[GAME] Game resized',
    props<{ size: number }>()
)