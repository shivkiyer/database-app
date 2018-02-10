var sequelize = require('sequelize');
var dbTables = require('./../models/usda');

var {DataSrc,
      DeriveCD,
      FDGroup,
      FoodDescription} = require('./../models/usda');


var getColNamesDataSrc = () => {
  return {
    order: [
      'ID',
      'Authors',
      'Title',
      'Year',
      'Journal',
      'Volume city',
      'Issue state',
      'Start page',
      'End page'
    ],
    attributes: [
      ['datasrc_id', 'ID'],
      ['authors', 'Authors'],
      ['title', 'Title'],
      ['year', 'Year'],
      ['journal', 'Journal'],
      ['vol_city', 'Volume city'],
      ['issue_state', 'Issue state'],
      ['start_page', 'Start page'],
      ['end_page', 'End page']
    ],
    include: []
  };
};


var getColNamesDeriveCD = () => {
  return {
    order: [
      'Derive CD',
      'Description'
    ],
    attributes: [
      ['deriv_cd', 'Derive CD'],
      ['derivcd_desc', 'Description']
    ],
    include: []
  };
};


var getColNamesFDGroup = () => {
  return {
    order: [
      'FD Group CD',
      'Description'
    ],
    attributes: [
      ['fdgrp_cd', 'FD Group CD'],
      ['fddrp_desc', 'Description']
    ],
    include: []
  };
};


var getColNamesFoodDescription = () => {
  return {
    order: [
      'Sr. No',
      'Long description',
      'Short description',
      'Common name',
      "Manufaturer's name",
      'Survey',
      'Reference description',
      'Refuse',
      'Scientific name',
      'N factor',
      'Protein factor',
      'Fat factor',
      'Cholestrol factor',
      {
        'FDGroup': [
          'FD Group CD',
          'FD Group Description'
        ]
      }
    ],
    attributes: [
      ['ndb_no', 'Sr No'],
      ['long_desc', 'Long description'],
      ['shrt_desc', 'Short description'],
      ['comname', 'Common name'],
      ['manufacname', 'Manufaturers name'],
      ['survey', 'Survey'],
      ['ref_desc', 'Reference description'],
      ['refuse', 'Refuse'],
      ['sciname', 'Scientific name'],
      ['n_factor', 'N factor'],
      ['pro_factor', 'Protein factor'],
      ['fat_factor', 'Fat factor'],
      ['cho_factor', 'Cholestrol factor']
    ],
    include: [{
      model: FDGroup,
      attributes: [
        ['fdgrp_cd', 'FD Group CD'],
        ['fddrp_desc', 'FD Group Description']
      ]
    }]
  };
};


var tableMapping = {
  'DataSrc': {
    model: DataSrc,
    colNames: getColNamesDataSrc
  },
  'DeriveCD': {
    model: DeriveCD,
    colNames: getColNamesDeriveCD
  },
  'FDGroup': {
    model: FDGroup,
    colNames: getColNamesFDGroup
  },
  'FoodDescription': {
    model: FoodDescription,
    colNames: getColNamesFoodDescription
  }
}


module.exports = {
  dbTables,
  tableMapping
};
