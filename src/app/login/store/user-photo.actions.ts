import { Action } from '@ngrx/store';

export const ADD_PHOTO = 'ADD_PHOTO';
export const UPDATE_PHOTO = 'UPDATE_PHOTO';

export class AddUserPhoto implements Action {
  readonly type = ADD_PHOTO;

  /**
   *
   * @param payload
   */
  constructor(public payload: string) {}
}

export class UpdateUserPhoto implements Action {
  readonly type = UPDATE_PHOTO;

  /**
   *
   * @param payload
   */
  constructor(public payload: string) {}
}

export type UserPhotoActions = AddUserPhoto | UpdateUserPhoto;
