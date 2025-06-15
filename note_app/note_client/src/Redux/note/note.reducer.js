import { NOTES_FAILURE, NOTES_REQUEST, NOTES_SUCCESS } from "./note.action";

const initialNotes = {
  isNotesLoading: false,
  isNotesError: null,
  AllNotes: { notes: [], total: 0 },
};

export const reducer = (state = initialNotes, { type, payload }) => {
  switch (type) {
    case NOTES_REQUEST:
      return {
        ...state,
        isNotesLoading: true,
        isNotesError: null,
      };
    case NOTES_SUCCESS:
      // console.log(payload);
      return {
        ...state,
        isNotesLoading: false,
        isNotesError: null,
        AllNotes: {
          notes: payload.notes,
          total: payload.total,
        },
      };
    case NOTES_FAILURE:
      return {
        ...state,
        isNotesLoading: false,
        isNotesError: payload,
      };
    default:
      return state;
  }
};
