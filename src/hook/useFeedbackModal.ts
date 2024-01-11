import {useCallback} from "react";

import {useAppDispatch, useAppSelector} from "../service/hooks";
import {addFeedbackModal, removeFeedbackModal} from "../service/reducers/modal/feedback";

export function useFeedbackModal() {
    const dispatch = useAppDispatch();
    const isFeedbackModalOpen = useAppSelector((state) => state.feedbackModal.data);

    const handleClickOpenFeedback = useCallback(
        (payload: Feedback) => {
            dispatch(addFeedbackModal(payload))
        },
        [dispatch]
    );

    const handleClickCloseFeedback = useCallback(
        () => {
            dispatch(removeFeedbackModal())
        },
        [dispatch]
    );

    return {isFeedbackModalOpen, handleClickOpenFeedback, handleClickCloseFeedback};
}