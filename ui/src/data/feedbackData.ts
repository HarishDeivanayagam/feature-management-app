import {atom} from "jotai";

export const initialFeedbackState: Array<any> = []

const feedbackAtom = atom(initialFeedbackState);

export default feedbackAtom;
