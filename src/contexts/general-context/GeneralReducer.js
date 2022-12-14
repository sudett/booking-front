import actionTypes from "./ActionTypes";

export const INITIAL_STATE = {
  page: "home",
  destination: "",
  dates: {
    startDate: new Date(),
    endDate: new Date(),
  },
  options: {
    adults: 1,
    children: 0,
    rooms: 1,
  },
  price: {
    minPrice: 100,
    maxPrice: 1000,
  },
  auth: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: "",
  },
};

export const generalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return { ...state, page: action.payload };

    case actionTypes.SET_DESTINATION:
      return { ...state, destination: action.payload };

    case actionTypes.SET_DATES:
      return {
        ...state,
        dates: { startDate: action.payload.start, endDate: action.payload.end },
      };

    case actionTypes.SET_OPTIONS:
      return {
        ...state,
        options: {
          ...state.options,
          [action.payload.option]: action.payload.value,
        },
      };

    case actionTypes.SET_PRICE:
      return {
        ...state,
        price: { ...state.price, [action.payload.item]: action.payload.value },
      };

    case actionTypes.LOGIN_START:
      return {
        ...state,
        auth: {
          user: null,
          isFetching: true,
          error: "",
        },
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          user: action.payload,
          isFetching: false,
          error: "",
        },
      };

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        auth: {
          user: null,
          isFetching: false,
          error: action.payload,
        },
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        auth: {
          user: null,
          isFetching: false,
          error: "",
        },
      };
    default:
      return state;
  }
};
