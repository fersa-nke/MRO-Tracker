import {GET_API_Mapper, GET_KEY_Mapper, GET_EXCHANGE_TYPES, GET_MODELS, GET_REASON_OF_CHANGES, GET_SHAFT_POSITIONS, GET_BEARING_TYPES, GET_BRANDS, GET_GENERATOR_MODELS } from '../ReduxConsants';

const initialState = {
    exhangeTypes: [],
    models: [],
    reasonOfChanges: [],
    shaftPositions: [],
    bearingTypes: [],
    brands: [],
    generatorModels: [],
    apiMapperConfig: [],
    keyMapperConfig: []
}

const masterReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_API_Mapper:
            return {
                ...state,
                apiMapperConfig: action.payload
            }
        case GET_KEY_Mapper:
            return {
                ...state,
                keyMapperConfig: action.payload
            }    
        case GET_EXCHANGE_TYPES:
            return {
                ...state,
                exhangeTypes: action.payload
            }
        case GET_MODELS:
            return {
                ...state,
                models: action.payload
            }
        case GET_REASON_OF_CHANGES:
            return {
                ...state,
                reasonOfChanges: action.payload
            }
        case GET_SHAFT_POSITIONS:
            return {
                ...state,
                shaftPositions: action.payload
            }
        case GET_BEARING_TYPES:
            return {
                ...state,
                bearingTypes: action.payload
            }
        case GET_BRANDS:
            return {
                ...state,
                brands: action.payload
            }
        case GET_GENERATOR_MODELS:
                return {
                    ...state,
                    generatorModels: action.payload
        }    
        default:
            return state
    }
}

export default masterReducer;
