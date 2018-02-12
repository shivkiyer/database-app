var sequelize = require('sequelize');
var dbTables = require('./../models/usda');

var {DataSrc,
      DeriveCD,
      FDGroup,
      FoodDescription,
      NutritionDefinition,
      SourceCD,
      Footnote,
      NutData} = require('./../models/usda');


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
      'Sr No',
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
      'Footnote No',
      'Footnote type',
      'Footnote text',
      {
        'FoodDescription': [
          'Long description',
          'Short description'
        ]
      },
      {
        'NutritionDefinition': [
          'Units',
          'Tag name',
          'Description'
        ]
      }
    ],
    attributes: [
      ['footnt_no', 'Footnote No'],
      ['footnt_typ', 'Footnote type'],
      ['footnt_txt', 'Footnote text']
    ],
    include: [
      {
        model: FoodDescription,
        attributes: [
          ['long_desc', 'Long description'],
          ['shrt_desc', 'Short description'],
          ['comname', 'Common name'],
          ['manufacname', 'Manufaturers name']
        ]
      },
      {
        model: NutritionDefinition,
        attributes: [
          ['units', 'Units'],
          ['tagname', 'Tag name'],
          ['nutrdesc', 'Description']
        ]
      }
    ]
  };
};


var getColNamesNutData = () => {
  return {
    order: [
      'Sr No',
      'Nutrition no',
      'Nutrition value',
      'Numeric data points',
      'Standard error',
      'Source CD',
      'Derive CD',
      'Ref No',
      'Add nutrition mark',
      'Numerical studies',
      'Min',
      'Max',
      'DF',
      'Low eb',
      'Up eb',
      'Static CMT',
      'CC',
      {
        'DeriveCD': [
          'Derive CD',
          'Description'
        ]
      },
      {
        'FoodDescription': [
          'Long description',
          'Short description',
          'Common name',
          'Manufaturers name'
        ]
      },
      {
        'NutritionDefinition': [
          'Units',
          'Tag name',
          'Description'
        ]
      },
      {
        'SourceCD': [
          'Source CD',
          'Description'
        ]
      }
    ],
    attributes: [
      ['ndb_no', 'Sr No'],
      ['nutr_no', 'Nutrition no'],
      ['nutr_val', 'Nutrition value'],
      ['num_data_pts', 'Numeric data points'],
      ['std_error', 'Standard error'],
      ['src_cd', 'Source CD'],
      ['deriv_cd', 'Derive CD'],
      ['ref_ndb_no', 'Ref No'],
      ['add_nutr_mark', 'Add nutrition mark'],
      ['num_studies', 'Numerical studies'],
      ['min', 'Min'],
      ['max', 'Max'],
      ['df', 'DF'],
      ['low_eb', 'Low eb'],
      ['up_eb', 'Up eb'],
      ['stat_cmt', 'Static CMT'],
      ['cc', 'CC']
    ],
    include: [
      {
        model: DeriveCD,
        attributes: [
          ['deriv_cd', 'Derive CD'],
          ['derivcd_desc', 'Description']
        ]
      },
      {
        model: FoodDescription,
        attributes: [
          ['long_desc', 'Long description'],
          ['shrt_desc', 'Short description'],
          ['comname', 'Common name'],
          ['manufacname', 'Manufaturers name']
        ]
      },
      {
        model: NutritionDefinition,
        attributes: [
          ['units', 'Units'],
          ['tagname', 'Tag name'],
          ['nutrdesc', 'Description']
        ]
      },
      {
        model: SourceCD,
        attributes: [
          ['src_cd', 'Source CD'],
          ['srccd_desc', 'Description']
        ]
      }
    ]
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
  },
  'NutData': {
    model: NutData,
    colNames: getColNamesNutData
  }
}


module.exports = {
  dbTables,
  tableMapping
};
