var sequelize = require('sequelize');
var dbTables = require('./../models/usda');

var {DataSrc,
      DeriveCD,
      FDGroup,
      FoodDescription,
      NutritionDefinition,
      SourceCD,
      FootNote} = require('./../models/usda');


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


var getColNamesNutritionDefinition = () => {
  return {
    order: [
      'Sr No',
      'Units',
      'Tag name',
      'Description',
      'Number',
      'Serial Order'
    ],
    attributes: [
      ['nutr_no', 'Sr No'],
      ['units', 'Units'],
      ['tagname', 'Tag name'],
      ['nutrdesc', 'Description'],
      ['num_dec', 'Number'],
      ['sr_order', 'Serial Order']
    ],
    include: []
  };
};


var getColNamesSourceCD = () => {
  return {
    order: [
      'Source CD',
      'Description'
    ],
    attributes: [
      ['src_cd', 'Source CD'],
      ['srccd_desc', 'Description']
    ],
    include: []
  };
};


var getColNamesFootnote = () => {
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
      ['footnt_no', 'Footnote No'],
      ['footnt_typ', 'Footnote type'],
      ['nutr_no', 'Nutrition no'],
      ['footnt_txt', 'Footnote text'],
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

ndb_no character(5) NOT NULL,
  footnt_no character(4) NOT NULL,
  footnt_typ character(1) NOT NULL,
  nutr_no character(3),
  footnt_txt text NOT NULL,

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
  },
  'NutritionDefinition': {
    model: NutritionDefinition,
    colNames: getColNamesNutritionDefinition
  },
  'SourceCD': {
    model: SourceCD,
    colNames: getColNamesSourceCD
  },
  'Footnote': {
    model: Footnote,
    colNames: getColNamesFootnote
  }
}


module.exports = {
  dbTables,
  tableMapping
};
