var mongo = require('mongodb'),
    fs = require('fs');

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
            carid: 'POR911',
            manufacturer: 'Porsche',
            model: '911',
            price: 135000,
            wiki: 'http://en.wikipedia.org/wiki/Porsche_997',
            img: 'porsche_carrera.jpg'
        },{
            carid: 'NISGTR',
            manufacturer: 'Nissan',
            model: 'GT-R',
            price: 80000,
            wiki:'http://en.wikipedia.org/wiki/Nissan_Gt-r',
            img: 'nissan_gtr.jpg'
        },{
            carid:'BMW0M3',
            manufacturer: 'BMW',
            model: 'M3',
            price: 60500,
            wiki:'http://en.wikipedia.org/wiki/Bmw_m3',
            img: 'bmw_m3.jpg'
        },{
            carid: 'AUD0S5',
            manufacturer: 'Audi',
            model: 'S5',
            price: 53000,
            wiki:'http://en.wikipedia.org/wiki/Audi_S5#Audi_S5',
            img: 'audi_s5.jpg'
        },{
            carid:'AUD0TT',
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

exports.addCar = function(req,res) {
    //console.log(req);
    console.log('body',req.body);
    console.log('files',req.files);

    if ( Object.keys( req.body).length) {
        var filename = req.files["img"]["name"];
        var bodyParam = req.body;
        var newPath = __dirname + "/../../frontend/images/cars/" + filename;
        var source = fs.createReadStream(req.files.img.path);
        var dest = fs.createWriteStream(newPath);

        source.pipe(dest);
        source.on('end', function() { /* copied */
            console.log('uploaded file');
            db.collection("cars").insert({
                carid: bodyParam.carid,
                manufacturer: bodyParam.manufacturer,
                model: bodyParam.model,
                price: bodyParam.price,
                wiki: bodyParam.wiki,
                img: filename
            }, {safe: true}, function (err2, result) {
                if (err2) {
                    console.log("unable to update db");
                    throw err2;
                }
                //res.json({
                //    result: true
                //});
            });
        });
        source.on('error', function(err) { /* error */
            console.log('upload file error');
        });


    /*
    fs.readFile(req.files.img.path, function (err, data) {
        // ...
        var newPath = __dirname + "/../../frontend/images/" + filename;
       // console.log(newPath);
        fs.writeFile(newPath, data, function (err) {
            if (err) {
                console.log('unable to upload file');
                throw err;
            }

            db.collection("cars").insert({
                manufacturer: bodyParam.manufacturer,
                model: bodyParam.model,
                price: bodyParam.price,
                wiki: bodyParam.wiki,
                img: filename
            }, {safe: true}, function (err2, result) {
                if (err2) {
                    console.log("unable to update db");
                    throw err2;
                }
                res.json({
                    result: true
                });
            });
        });
    }); */
}


}


exports.removeCar = function(req,res){
    console.log(req.body);
    if(req.body.carid){
        db.collection('cars').removeOne({carid:req.body.carid},function(err,result){
           if (err) throw err;

           res.json({
               result:true
           });
        });
    }else{
        res.json({
            result: false
        })
    }
}

exports.clearData = function(req,res){
    db.collection('cars').remove({},function(err,result){
       if(err) throw err;

       res.json({
          result:true
       });
    });
}

exports.populateData = function(req,res){
    populateDB();
}