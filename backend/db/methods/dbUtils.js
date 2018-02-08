var getDBFile = (dbIndex) => {
  var fileName;
  switch (dbIndex) {
    case 0: fileName = 'dellstore2';
            break;

    case 1: fileName = 'usda';
            break;

    default: fileName = '';
  }
  return fileName;
}

module.exports = {getDBFile};
