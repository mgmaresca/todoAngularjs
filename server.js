var express		= require('express');
var mongoose	= require('mongoose');
var logger		= require('morgan');
var bodyParser	= require('body-parser');
var methodOverride	= require('method-override');


var app = express();

//Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/angular-todo');


//Configuracion de la aplicacion

	//Localizacion de los ficheros estaticos
	app.use(express.static(__dirname + '/public'));
	//Muestra un log de todos los request de la consola
	app.use(logger('dev'));
	//Permite cambiar HTML con el metodo POST	
	app.use(bodyParser());
	//Simula DELETE y PUT
	app.use(methodOverride());


//Configuracion del modelo de la base de datos
var Todo = mongoose.model('Todo', {
	text: String
});

//Definicion de rutas de nuestro API

//GET de todos los TODO
app.get('/api/todos', function(req, res){
	Todo.find(function(err, todos){
		if(err){
			res.send(err);
		}
		res.json(todos);
	});
});

//POST que crea un TODO y devuelve de nuevo toda la lista
app.post('/api/todos', function(req, res) {
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo){
		if(err){
			res.send(err);
		}

		Todo.find(function(err, todos){
			if(err){
				res.send(err);
			}
			res.json(todos);
		});
	});
});

//DELETE un TODO concreto y devuelve la nueva lista
app.delete('/api/todos/:todo', function(req, res){
	Todo.remove({
		_id:req.params.todo
	}, function(err, todo){
		if(err){
			res.send(err);
		}

		Todo.find(function(err, todos){
			if(err){
				res.send(err);
			}
			res.json(todos);
		});

	});
});

//Carga una ista HTML simple donde irá nuestra SINGLE-PAGE-APP
app.get('*', function(req, res){
	res.sendFile('./public/index.html');
});

//Escucha en el puerto 8080 y corre el server
app.listen(8080, function(){
	console.log('App listening on port 8080');
});