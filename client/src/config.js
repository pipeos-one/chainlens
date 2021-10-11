export const PIPEOS_SERVER = {
  host: process.env.REACT_APP_PIPEOS_SERVER || 'https://chainlens.herokuapp.com',
  route: {
    pclass: '/pclass',
    pfunction: '/pfunction',
  },
}
