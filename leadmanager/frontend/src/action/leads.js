import axios from "axios";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from "./types";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

export const getLeads = () => (dispatch, getState) => {
  axios
    .get("api/leads", tokenConfig(getState))
    .then((result) => {
      dispatch({
        type: GET_LEADS,
        payload: result.data
      });
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const deleteLead = (id) => (dispatch, getState) => {
  axios
    .delete(`api/leads/${id}`, tokenConfig(getState))
    .then((result) => {
      dispatch(createMessage({ deleteLead: "Lead Deleted" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const addLead = (lead) => (dispatch, getState) => {
  axios
    .post("api/leads/", lead, tokenConfig(getState))
    .then((result) => {
      dispatch(createMessage({ addLead: "Lead Added" }));
      dispatch({
        type: ADD_LEAD,
        payload: result.data
      });
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};
