import {atom} from "jotai";

export const initialSegmentState: Array<any> = []

const segmentAtom = atom(initialSegmentState);

export default segmentAtom;
