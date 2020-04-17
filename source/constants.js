const DOMAIN = 'free-radio.online';
const HOME_PAGE = `https://${DOMAIN}`;
const COOKIE_NAME = 'toolbar_cookie';

const URLS = {
  STATIONS: `${HOME_PAGE}/api/stations`,
  AFTER_INSTALL_PAGE: `${HOME_PAGE}/after-install/`,
  UNINSTALL_PAGE: `${HOME_PAGE}/uninstall-extension/`,
};

const GA_ID = 'UA-148596168-1';

const CONTENT_TYPE_JSON = {
  'Content-Type': 'application/json',
};

const SUPPORTED_I18N_LANGS = [
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
];
const DEFAULT_LANG = { code: 'ru', name: 'Русский' };

export {
  DOMAIN,
  COOKIE_NAME,
  URLS,
  GA_ID,
  HOME_PAGE,
  CONTENT_TYPE_JSON,
  SUPPORTED_I18N_LANGS,
  DEFAULT_LANG,
};
