exports.install = function() {
	F.route('/', view_index);
	// or
	// F.route('/');
	// List all classes as a table of information
	F.route('/classes/', view_classes);
	// List all students as a table of information
	F.route('/students/', view_students);
	// List all information for one class
	F.route('/class/{id}', view_class);
	// List all information for one student
	F.route('/student/{id}', view_student);
	// Template page to handle GET argument
	F.route('/services/{name}/', view_services);
	// Template page for contact
	F.route('/contact/', view_contact);
	F.route('/contact/', json_contact, ['post']);
};

// The action
function view_index() {
    var self = this;
    // The "index" view is routed into the views/index.html
    // ---> Send the response
    self.view('index');
}

function view_classes() {
	var self = this;

	// definitions/mysql.js
	// create a DB connection
	DATABASE(function(err, connection){

			if(err != null) {
					self.throw500(err);
					return;
			}

			// Table schema = { Id: String, Subject: String };
			connection.query('SELECT * FROM class', function(err, rows) {

					// Close connection
					connection.release();

					if (err != null) {
							self.view500(err);
							return;
					}

					// Shows the result on a console window
					//console.log(rows);

					// Send rows as the model into the view
					self.view('classes', rows);
			});

	});
}

function view_students() {
	var self = this;

	// definitions/mysql.js
	// create a DB connection
	DATABASE(function(err, connection){

			if(err != null) {
					self.throw500(err);
					return;
			}

			// Table schema = { Id: String, Subject: String };
			connection.query('SELECT * FROM student', function(err, rows) {

					// Close connection
					connection.release();

					if (err != null) {
							self.view500(err);
							return;
					}

					// Shows the result on a console window
					//console.log(rows);
					//console.log(rows[0]);

					// Send rows as the model into the view
					self.view('students', rows);
			});

	});
}

function view_class(id) {
	var self = this;

	// definitions/mysql.js
	// create a DB connection
	DATABASE(function(err, connection){

			if(err != null) {
					self.throw500(err);
					return;
			}

			//console.log('MySQL: SELECT * FROM student WHERE id = '+id)

			// Table schema = { Id: String, Subject: String };
			connection.query(
					'SELECT * FROM class WHERE id = "'+id+'"',
					function(err, rows) {

							// Close connection
							connection.release();

							if (err != null) {
									self.view500(err);
									return;
							}

							// Shows the result on a console window
							//console.log(rows);
							//console.log(rows[0]);

							// Send row as the model into the view
							// TODO: throw error if >1 row
							self.view('class', rows[0]);
			});

	});
}

function view_student(id) {
	var self = this;

	// definitions/mysql.js
	// create a DB connection
	DATABASE(function(err, connection){

			if(err != null) {
					self.throw500(err);
					return;
			}

			//console.log('MySQL: SELECT * FROM student WHERE id = '+id)

			// Table schema = { Id: String, Subject: String };
			connection.query(
					'SELECT * FROM student WHERE id = "'+id+'"',
					function(err, rows) {

							// Close connection
							connection.release();

							if (err != null) {
									self.view500(err);
									return;
							}

							// Shows the result on a console window
							//console.log(rows);
							//console.log(rows[0]);

							// Send row as the model into the view
							// TODO: throw error if >1 row
							self.view('student', rows[0]);
			});

	});
}

function view_services(name) {
    var self = this;
    // The "services" view is routed into the views/services.html
    // A second argument is the model
    // ---> Send the response
    self.view('services', { category: name });
}

function view_contact() {
    var self = this;
    // "contact" view is routed to views/contact.html
    // ---> Send the response
    self.view('contact');
}

function json_contact() {
    var self = this;
		console.log(self);
    // Get the data from the request body.
    // The data are parsed into the object automatically.
    var model = self.bxdy;
		console.log(model);
    // e.g.
    // model.email
    // model.name

    // Send the mail to our company
    var message = self.mail('info@company.com', 'Contact form', 'mail-template', model);
    message.reply(model.email);

    // ---> and send the response in JSON format
    self.json({ success: true });
}
