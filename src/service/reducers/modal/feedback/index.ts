import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface IInitialFeedbackModal {
    data: Feedback | null
}

const initialState: IInitialFeedbackModal = {
    data: null
};

const feedbackModal = createSlice({
    name: "feedbackModal",
    initialState,
    reducers: {
        addFeedbackModal: (
            state: IInitialFeedbackModal,
            action: PayloadAction<Feedback>
        ) => {
            return {
                data: action.payload
            };
        },
        removeFeedbackModal: () => {
            return {
                data: null
            };
        }
    }
});

export const {addFeedbackModal, removeFeedbackModal} = feedbackModal.actions;
export default feedbackModal.reducer;