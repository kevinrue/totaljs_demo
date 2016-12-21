var mysql = require('mysql');
var pool  = mysql.createPool({
  host            : 'localhost',
  user            : 'guest',
  password        : 'ReadOnly#2016',
  database        : 'school'
});

// override the framework prototype
// use CONFIG files for connection string
F.database = function(callback) {
	return pool.getConnection(callback);
};
