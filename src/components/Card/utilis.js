export const validateState = (user, userInfoStateLost) => ({
  lost: user !== userInfoStateLost,
  finded: user === userInfoStateLost,
  remitted: user !== userInfoStateLost
});
