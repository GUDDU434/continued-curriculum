import { axiosInstance } from "../../utils/axiosInstance";

export const NOTES_REQUEST = "NOTES_REQUEST";
export const NOTES_SUCCESS = "NOTES_SUCCESS";
export const NOTES_FAILURE = "NOTES_FAILURE";

export const GetAllNotes = (query) => {
  return async (dispatch) => {
    dispatch({ type: NOTES_REQUEST });
    try {
      const response = await axiosInstance.get("/api/v1/notes", {
        params: query,
      });
      // console.log(response);
      if (response.status === 200) {
        dispatch({ type: NOTES_SUCCESS, payload: response?.data?.data });
      } else {
        dispatch({ type: NOTES_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: NOTES_FAILURE, payload: error?.message });
    }
  };
};

export const GetSingleNote = (id) => {
  return async (dispatch) => {
    dispatch({ type: NOTES_REQUEST });
    try {
      const response = await axiosInstance.get(`/api/v1/notes/${id}`);
      if (response.status === 200) {
        console.log(response?.data?.data);
        dispatch({ type: NOTES_SUCCESS, payload: response?.data?.data });
      } else {
        dispatch({ type: NOTES_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: NOTES_FAILURE, payload: error?.message });
    }
  };
};

export const AddNote = (data) => {
  return async (dispatch) => {
    dispatch({ type: NOTES_REQUEST });
    try {
      console.log(data);
      const response = await axiosInstance.post("/api/v1/notes", data);
      if (response.status === 201) {
        dispatch(GetAllNotes());
        // dispatch({ type: NOTES_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: NOTES_FAILURE, payload: response?.data });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: NOTES_FAILURE, payload: error?.message });
    }
  };
};

export const UpdateNote = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: NOTES_REQUEST });
    try {
      const response = await axiosInstance.put(`/api/v1/notes/${id}`, data);

      if (response.status === 200) {
        dispatch(GetAllNotes());
        // dispatch({ type: NOTES_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: NOTES_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: NOTES_FAILURE, payload: error?.message });
    }
  };
};

export const DeleteNote = (id) => {
  return async (dispatch) => {
    dispatch({ type: NOTES_REQUEST });
    try {
      const response = await axiosInstance.delete(`/api/v1/notes/${id}`);
      if (response.status === 200) {
        dispatch(GetAllNotes());
        // dispatch({ type: NOTES_SUCCESS, payload: response?.data });
      } else {
        dispatch({ type: NOTES_FAILURE, payload: response?.data });
      }
    } catch (error) {
      dispatch({ type: NOTES_FAILURE, payload: error?.message });
    }
  };
};
