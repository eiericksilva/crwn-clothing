//essencial
import { createStore } from "redux";
import { rootReducer } from "./root-reducer";

//midlewares
import { compose, applyMiddleware } from "redux";
import logger from "redux-logger";

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

const store = createStore(rootReducer, undefined, composedEnhancers);

export { store };
