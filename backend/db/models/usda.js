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


module.exports = {
  DataSrc,
  DeriveCD,
  FDGroup,
  FoodDescription
};
