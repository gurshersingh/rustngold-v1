const authService = require('../services/auth.service');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge: 8 * 60 * 60 * 1000, // 8 hours
  path: '/',
};

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);

    res.cookie('auth_token', token, COOKIE_OPTIONS);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res) {
  res.clearCookie('auth_token', { path: '/' });
  res.json({ message: 'Logged out successfully' });
}

async function me(req, res, next) {
  try {
    const user = await authService.getCurrentUser(req.user.userId);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = { login, logout, me };
