module.exports = {
  constructResponseSignInPayload: (rawUser) => {
    delete rawUser.password;
    delete rawUser.roleId;
    return {
      ...rawUser,
      isAdmin: rawUser.role.roleName === 'Administrator',
      profilePhotoUrl: rawUser.profilePhotoUrl || `${ process.env.BACKEND_URL }/static/images/avatar.png`,
    };
  },
  constructResponseSignUp: (rawInfo) => {
    const { imgType, password, photoSource, rankId, coverImageSrc, ...restInfo } = rawInfo;
    return {
      ...restInfo,
      isAdmin: restInfo.role.roleName === 'Administrator',
      profilePhotoUrl: restInfo.profilePhotoUrl || `${ process.env.BACKEND_URL }/static/images/avatar.png`,
    };
  },
};
