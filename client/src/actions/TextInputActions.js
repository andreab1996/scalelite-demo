
import axios from 'axios';
import {
    DISABLE_SERVER,
    ENABLE_SERVER,
    FIRST_NAME_CHANGED,
    FULL_NAME_CHANGED,
    LAST_NAME_CHANGED,
    RECEIVE_DATA
} from './types';

const Scalelite = require('scalelite-js').ScaleliteApi
const scalelite = new Scalelite(
    "https://vcss.etfbl.net/scalelite/api/",
    // process.env.SCALELITE_URL, // should be in form http://example.com/scalelite/api
    // process.env.SCALELITE_SECRET
    "8dfcebc4b2c7faebf8ed960768c993e1bf23efc393780844"
)

export const firstNameChanged = (text) => {
    return {
        type: FIRST_NAME_CHANGED,
        payload: text
    };
};

export const lastNameChanged = (text) => {
    return {
        type: LAST_NAME_CHANGED,
        payload: text
    };
};

export const fullNameChanged = (text) => {
    return {
        type: FULL_NAME_CHANGED,
        payload: text
    }
}

export const getData = () => {
    return (dispatch) => {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        // const url = 'https://vcss.etfbl.net/scalelite/api/getServers?checksum=6991bdb9abecaf5f661282a25cb90d40a31fd45f';

        // scalelite.getServers().then((json) => {
        //     console.log(json.servers)
        // })
        axios.get(url)
            .then((response) => {
                // console.log(response.headers.get('Content-Type'));
                // console.log(response.headers.get('Date'));
                // debugger;
                // console.log(response.body);
                dispatch(receiveData(response.data))
            })
            .catch((error) => console.log(error))
    }
}

export const receiveData = (data) => {
    return {
        type: RECEIVE_DATA,
        payload: data
    }
}

export const enableServer = (data) => {
    console.log("enable");
    return {
        type: ENABLE_SERVER,
        payload: data
    }
}

export const disableServer = (data) => {
    console.log("disable");
    return {
        type: DISABLE_SERVER,
        payload: data
    }
}