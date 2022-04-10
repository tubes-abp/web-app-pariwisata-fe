const main_state = {
	userData: false,
	posts: false,
  loader: false,
  cashiers: [],
  products: [],
  transactions: [],
  cashier: false,
  product: false,
  transaction: false,
  owner: false,
}

const main = (state = main_state, action) => {
	switch (action.type) {
		case "PUT_DATA":
			return { ...state, [action.key]: action.data };				
    case "TOGGLE_LOADER":
      return { ...state, loader: action.bool };		
		default:
			return state;
	}
};

export default main;