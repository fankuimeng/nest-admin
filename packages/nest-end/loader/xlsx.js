module.exports = function (source = '') {
  let newsource = source;

  if (source?.includes(`var cpt = require('./cpt' + 'able');`)) {
    newsource = source.replace(`var cpt = require('./cpt' + 'able');`, '');
  }
  return newsource;
};
