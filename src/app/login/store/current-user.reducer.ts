import { CurrentUserModel } from '../model/current-user.model';
import * as CurrentUserActions from './current-user.actions';

const initCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

/**
 *
 * @param state
 * @param action
 * @returns
 */
export function currentUserReducer(
  state: CurrentUserModel = initCurrentUser,
  action: CurrentUserActions.CurrentUserActions
) {
  switch (action.type) {
    case CurrentUserActions.ADD_CURRENT_USER:
      return action.payload;
    case CurrentUserActions.UPDATE_CURRENT_USER:
      return [state, action.payload];
    default:
      return state;
  }
}
