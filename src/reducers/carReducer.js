const availableCar = (state, action) => {
    console.log('car reducer',action)
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return {
          ...state,
           cars : action.payload.availableCars,
          loading: false,
        };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export  {availableCar};