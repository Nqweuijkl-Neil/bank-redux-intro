import { combineReducers, createStore } from "redux";

const initialStateAmount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

const initialStateCustomer = {
    fullname: "",
    nationalID: "",
    createdAt: "",
};

function accountReducer(state = initialStateAmount, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload };
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload };
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            };
        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan,
            };
        default:
            return state;
    }
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullname: action.payload.fullname,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            };
        case "account/updateName":
            return {
                ...state,
                fullname: action.payload,
            };
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});
const store = createStore(rootReducer);

store.dispatch(deposit(1000));
store.dispatch(withdraw(100));
console.log(store.getState());
store.dispatch(requestLoan(20000, "Buy a car"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

function deposit(amount) {
    return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
    return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
    return {
        type: "account/requestLoan",
        payload: { amount, purpose },
    };
}
function payLoan() {
    return { type: "account/payLoan" };
}

function createCustomer(fullname, nationalID) {
    return {
        type: "customer/createCustomer",
        payload: { fullname, nationalID, createdAt: new Date().toISOString() },
    };
}

function updateName(fullname) {
    return {
        type: "account/updateName",
        payload: fullname,
    };
}

store.dispatch(createCustomer("Neil Patrick", "123-456-789"));
console.log(store.getState());
store.dispatch(updateName("Neil"));
console.log(store.getState());
