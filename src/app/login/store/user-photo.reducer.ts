import * as UserPhotoActions from './user-photo.actions';

const initPhoto: string = JSON.parse(localStorage.getItem('photoUser'));

/**
 *
 * @param state
 * @param action
 * @returns
 */
export function userPhotoReducer(
  state: string = initPhoto,
  action: UserPhotoActions.UserPhotoActions
) {
  switch (action.type) {
    case UserPhotoActions.ADD_PHOTO:
      return action.payload;
    case UserPhotoActions.UPDATE_PHOTO:
      return action.payload;
    default:
      return state;
  }
}
