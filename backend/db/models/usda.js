var sequelize = require('sequelize');
var {allSQLConnection} = require('./../config');

var sqlConnection = allSQLConnection[1];

var DataSrc = sqlConnection.define('DataSrc', {
  datasrc_id: {
    type: sequelize.STRING(6),
    allowNull: false,
    primaryKey: true
  },
  authors: {
    type: sequelize.TEXT,
  },
  title: {
    type: sequelize.TEXT,
    allowNull: false
  },
  year: {
    type: sequelize.INTEGER
  },
  journal: {
    type: sequelize.TEXT
  },
  vol_city: {
    type: sequelize.TEXT
  },
  issue_state: {
    type: sequelize.TEXT
  },
  start_page: {
    type: sequelize.TEXT
  },
  end_page: {
    type: sequelize.TEXT
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'data_src',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});


var DeriveCD = sqlConnection.define('DeriveCD', {
  deriv_cd: {
    type: sequelize.TEXT,
    allowNull: false,
    primaryKey: true
  },
  derivcd_desc: {
    type: sequelize.TEXT,
    allowNull: false
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'deriv_cd',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});


var FDGroup = sqlConnection.define('FDGroup', {
  fdgrp_cd: {
    type: sequelize.STRING(4),
    allowNull: false,
    primaryKey: true
  },
  fddrp_desc: {
    type: sequelize.TEXT,
    allowNull: false
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'fd_group',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});


var FoodDescription = sqlConnection.define('FoodDescription', {
  ndb_no: {
    type: sequelize.STRING(5),
    allowNull: false,
    primaryKey: true
  },
  fdgrp_cd: {
    type: sequelize.STRING(4),
    allowNull: false
  },
  long_desc: {
    type: sequelize.TEXT,
    allowNull: false
  },
  shrt_desc: {
    type: sequelize.TEXT,
    allowNull: false
  },
  comname: {
    type: sequelize.TEXT
  },
  manufacname: {
    type: sequelize.TEXT
  },
  survey: {
    type: sequelize.STRING(1)
  },
  ref_desc: {
    type: sequelize.TEXT
  },
  refuse: {
    type: sequelize.INTEGER
  },
  sciname: {
    type: sequelize.TEXT
  },
  n_factor: {
    type: sequelize.DOUBLE
  },
  pro_factor: {
    type: sequelize.DOUBLE
  },
  fat_factor: {
    type: sequelize.DOUBLE
  },
  cho_factor: {
    type: sequelize.DOUBLE
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'food_des',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});

FoodDescription.belongsTo(FDGroup, {foreignKey: 'fdgrp_cd'});


var NutritionDefinition = sqlConnection.define('Nutrition_Defition', {
  nutr_no: {
    type: sequelize.STRING(3),
    allowNull: false,
    primaryKey: true
  },
  units: {
    type: sequelize.TEXT,
    allowNull: false
  },
  tagname: {
    type: sequelize.TEXT
  },
  nutrdesc: {
    type: sequelize.TEXT
  },
  num_dec: {
    type: sequelize.INTEGER
  },
  sr_order: {
    type: sequelize.INTEGER
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'nutr_def',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});


var SourceCD = sqlConnection.define('Source_CD', {
  src_cd: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  srccd_desc: {
    type: sequelize.TEXT,
    allowNull: false
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'src_cd',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});


var Footnote = sqlConnection.define('Footnote', {
  ndb_no: {
    type: sequelize.STRING(5),
    allowNull: false,
    primaryKey: false
  },
  footnt_no: {
    type: sequelize.STRING(4),
    allowNull: false,
    primaryKey: false
  },
  footnt_typ: {
    type: sequelize.STRING(1),
    allowNull: false,
    primaryKey: false
  },
  nutr_no: {
    type: sequelize.STRING(3),
    primaryKey: false
  },
  footnt_txt: {
    type: sequelize.TEXT,
    allowNull: false,
    primaryKey: false
  }
},
{
  // This is to make sure sequelize uses a particular table name
  // instead of generating an automatic table name from model name.
  freezeTableName: true,
  tableName: 'footnote',

  // This to not insert createdAt or updatedAt timestamps and not
  // expect them when reading tables.
  timestamps: false
});

FootNote.removeAttribute('id');
FootNote.belongsTo(FoodDescription, {foreignKey: 'ndb_no'});
Footnote.belongsTo(NutritionDefinition, {foreignKey: 'nutr_no'});


module.exports = {
  DataSrc,
  DeriveCD,
  FDGroup,
  FoodDescription,
  NutritionDefinition,
  SourceCD,
  Footnote
};
