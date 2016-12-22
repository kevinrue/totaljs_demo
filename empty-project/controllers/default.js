exports.install = function() {
	F.route('/', view_index);
	// or
	// F.route('/');
	F.route('/class/', view_class)
	F.route('/student/', view_student)
	F.route('/services/{name}/', view_services);
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

function view_class() {
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
					console.log(rows);

					// Send rows as the model into the view
					self.view('class', rows);
			});

	});
}

function view_student() {
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
					console.log(rows);

					// Send rows as the model into the view
					self.view('student', rows);
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

    // Get the data from the request body.
    // The data are parsed into the object automatically.
    var model = self.body;

    // e.g.
    // model.email
    // model.name

    // Send the mail to our company
    var message = self.mail('info@company.com', 'Contact form', 'mail-template', model);
    message.reply(model.email);

    // ---> and send the response in JSON format
    self.json({ success: true });
}
