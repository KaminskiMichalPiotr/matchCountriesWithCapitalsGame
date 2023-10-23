import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { correctOptionsSelected, gameEnd, gameSizeChange, optionSelected, resetOptionsAfterNextSelection, restartGame, wrongOptionsSelected } from "./game.actions";
import { Option } from '../data/option.model'
import { initializeData } from "../data/countries.model";


export const defaultGameSize = 10;

export const gameFeatureKey = 'game';

export interface State {
    options: Option[],
    correctAnswers: number,
    wrongAnswers: number,
    selectedOptions: Option[],
    gameFinished: boolean,
    gameSize: number
}

const initialState: State = {
    options: initializeData(defaultGameSize),
    correctAnswers: 0,
    wrongAnswers: 0,
    selectedOptions: [],
    gameFinished: false,
    gameSize: defaultGameSize
}

export const gameReducer = createReducer(
    initialState,
    on(restartGame, (state) => ({ ...initialState, options: initializeData(state.gameSize), gameSize: state.gameSize })),
    on(optionSelected, (state, action) => ({
        ...state,
        options: markSelectedOption([...state.options], action.option),
        selectedOptions: [...state.selectedOptions, action.option]
    })),
    on(resetOptionsAfterNextSelection, (state, action) => ({
        ...state,
        options: markDefaultOptions([...state.options], action.options, state.selectedOptions[2]),
        selectedOptions: [...state.selectedOptions.slice(2, 3)]
    })),
    on(correctOptionsSelected, (state, action) => (
        {
            ...state,
            correctAnswers: state.correctAnswers + 1,
            options: markCorrectAnswers([...state.options], action.options),
            selectedOptions: []
        }
    )),
    on(wrongOptionsSelected, (state, action) => ({
        ...state,
        wrongAnswers: state.wrongAnswers + 1,
        options: markWrongAnswers([...state.options], action.options)
    })),
    on(gameEnd, (state) => ({ ...state, gameFinished: true })),
    on(gameSizeChange, (state, action) => ({
        ...state,
        gameSize: action.size
    }))
)

export const selectGameState = createFeatureSelector<State>(gameFeatureKey)
export const selectWrongAnswers = createSelector(
    selectGameState,
    (s: State) => s.wrongAnswers
)
export const selectCorrectAnswers = createSelector(
    selectGameState,
    (s: State) => s.correctAnswers
)
export const selectOptions = createSelector(
    selectGameState,
    (s: State) => s.options
)
export const selectGameFinshed = createSelector(
    selectGameState,
    (s: State) => s.gameFinished
)
export const selectGameSize = createSelector(
    selectGameState,
    (s: State) => s.gameFinished
)

function markWrongAnswers(options: Option[], optionsSelected: Option[]): Option[] {
    return options.map(option => {
        if (optionsSelected.some(selectedOption => selectedOption.textValue === option.textValue)) {
            return {
                ...option,
                disabled: false,
                wrong: true
            };
        }
        return option;
    });
}

function markCorrectAnswers(options: Option[], optionsSelected: Option[]): Option[] {
    return options.map(option => {
        if (optionsSelected.some(selectedOption => selectedOption.textValue === option.textValue)) {
            return {
                ...option,
                visible: false
            };
        }
        return option;
    });



}

function markDefaultOptions(options: Option[], optionsSelected: Option[], nextOption: Option): Option[] {
    return options.map(option => {
        if (nextOption.textValue == option.textValue) {
            return {
                ...option,
                wrong: false,
                selected: true,
                disabled: true
            }
        }
        if (optionsSelected.some(selectedOption => selectedOption.textValue === option.textValue)) {
            return {
                ...option,
                wrong: false,
                selected: false,
                disabled: false
            };
        }

        return option;
    });

}

function markSelectedOption(options: Option[], optionSelected: Option): Option[] {
    return options.map(option => {
        if (optionSelected.textValue === option.textValue) {
            return {
                ...option,
                selected: true,
                disabled: true
            };
        }
        return option;
    });
}
