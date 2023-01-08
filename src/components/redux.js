import { combineReducers , legacy_createStore as createStore} from "redux";

//intial State

import { avocado, eggplant, fastfood, Vegetables, watermelon } from "./icons";

const intialState = [
    {
        "_id": 1,
        "category_name": "Fresh Vegetables",
        "sub_cateries": [{ "name": "Tomotoes" }, { "name": "Spinach" }, { "name": "Onions" }],
        "image": Vegetables
    },
    {
        "_id": 2,
        "category_name": "Diet Food",
        "sub_cateries": [{ "name": "quinoa" }, { "name": "Oats" }],
        "image": eggplant
    },
    {
        "_id": 3,
        "category_name": "Healthy Food",
        "sub_cateries": [{ "name": "Boiled Eggs" }, { "name": "Whole Wheat" },],
        "image": avocado
    },
    {
        "_id": 4,
        "category_name": "Fast Food",
        "sub_cateries": [{ "name": "Sandwich" }, { "name": "Burger" }, { "name": "Pizza" }, { "name": "Tacos" }],
        "image": fastfood
    },
    {
        "_id": 5,
        "category_name": "Juicy Fruits",
        "sub_cateries": [{ "name": "Watermelon" }, { "name": "Grapes" }, { "name": "Berries" }],
        "image": watermelon
    },
];

//actions

export const AddCategories = () => {
    return {
        type: 'ADD_CATEGORY',
    }
}

//reducer

const category = (state = intialState, action) => {

    switch (action.type) {
        case "ADD_CATEGORY":
            return {
                ...state,
            }
            break;
        default:
            return state
            break;
    }

}

//root reducer

const rootReducer = combineReducers({
    category
});

//redux store

export default () => {
    let store = createStore(rootReducer);
    return{store}
}



