'use strict'
import *  as ACTIONTYPE from './actiontypes';

export default function CollectBookAction(data) {
    return {
        type: ACTIONTYPE.COLLECT_BOOK_SUCCEED,
        data: data
    }
}

