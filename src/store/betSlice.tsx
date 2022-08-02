import { createSlice } from "@reduxjs/toolkit"

import type { PayloadAction } from "@reduxjs/toolkit"

export interface BetState {
    reward: number,
}

const initialState : BetState = {
    reward: 0
}

export const betSlice = createSlice({
    name: 'bet',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<number>)=> {
            state.reward = action.payload;
        }
    }
})

export const {set} = betSlice.actions;
export default betSlice.reducer;
