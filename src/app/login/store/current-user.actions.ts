import { Action } from '@ngrx/store';
import { CurrentUserModel } from '../model/current-user.model';

export const ADD_CURRENT_USER = 'ADD_CURRENT_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

export class AddCurrentUser implements Action {
  readonly type = ADD_CURRENT_USER;

  /**
   *
   * @param payload
   */
  constructor(public payload: CurrentUserModel) {}
}

export class UpdateCurrentUser implements Action {
  readonly type = UPDATE_CURRENT_USER;

  /**
   *
   * @param payload
   */
  constructor(public payload: CurrentUserModel) {}
}

export type CurrentUserActions = AddCurrentUser | UpdateCurrentUser;
