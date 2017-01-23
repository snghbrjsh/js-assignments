var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('carsdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'carsdb' database");
        db.collection('cars', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'cars' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var cars = [{
            manufacturer: 'Porsche',
            model: '911',
            price: 135000,
            wiki: 'http://en.wikipedia.org/wiki/Porsche_997',
            img: 'porsche_carrera.jpg'
        },{
            manufacturer: 'Nissan',
            model: 'GT-R',
            price: 80000,
            wiki:'http://en.wikipedia.org/wiki/Nissan_Gt-r',
            img: 'nissan_gtr.jpg'
        },{
            manufacturer: 'BMW',
            model: 'M3',
            price: 60500,
            wiki:'http://en.wikipedia.org/wiki/Bmw_m3',
            img: 'bmw_m3.jpg'
        },{
            manufacturer: 'Audi',
            model: 'S5',
            price: 53000,
            wiki:'http://en.wikipedia.org/wiki/Audi_S5#Audi_S5',
            img: 'audi_s5.jpg'
        },{
            manufacturer: 'Audi',
            model: 'TT',
            price: 40000,
            wiki:'http://en.wikipedia.org/wiki/Audi_TT',
            img: 'audi_tt.jpg'
        }];

    db.collection('cars', function(err, collection) {
        collection.insert(cars, {safe:true}, function(err, result) {});
    });

};

exports.index = function(req, res) {
            req.db = db || {};
            res.sendfile("../frontend/index.html");
}

exports.getCars = function(req, res){
    db.collection('cars').find().toArray(function (err, result) {
        if (err) throw err

        res.json(result);
    });
}

