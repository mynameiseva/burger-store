import {call, put, takeLatest} from 'redux-saga/effects'
import {delay} from 'redux-saga'

function* mainSaga() {
  yield takeLatest(null, null)
}

export default mainSaga