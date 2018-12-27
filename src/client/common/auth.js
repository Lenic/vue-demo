import _ from 'underscore';
import Cookies from 'js-cookie';

export const authInfo = {
  uid: Cookies.get('uid') || null,
  token: Cookies.get('token') || null
};

const obj = {
  init: router => {
    authInfo.router = router;

    router.beforeEach((to, from, next) => {
      if (_.all(to.matched, v => !v.meta.noAuth)) {
        if (!authInfo.token) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          });
        } else {
          next();
        }
      } else if (to.path === from.path) {
        next(from);
      } else {
        next();
      }
    });
  },
  setAuth: (uid = null, token = null, mobile = null) => {
    if (!uid || !token) {
      authInfo.uid = null;
      authInfo.token = null;

      Cookies.remove('uid');
      Cookies.remove('token');
      Cookies.remove('mobile');

      authInfo.router &&
        authInfo.router.push({
          path: '/login',
          query: { redirect: authInfo.router.currentRoute.fullPath }
        });
    } else {
      authInfo.uid = uid;
      authInfo.token = token;

      Cookies.set('uid', uid);
      Cookies.set('token', token);
      Cookies.set('mobile', mobile);
    }
  }
};

export default obj;

obj.setAuth(authInfo.uid, authInfo.token, Cookies.get('mobile'));
