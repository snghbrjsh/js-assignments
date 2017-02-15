describe('"/api/getCars"', function(){
    var carList = null;
    beforeAll(function(done){
        var p = getPromise('/api/getCars', 'GET');
        p.then(function(data){
            carList = data;
            done();
        });
    });

    describe('should return valid result', function(){
        it('typeof result === "object"', function(){
           expect(typeof carList).toBe('object');
        });

        it('typeof result !== null', function(){
            expect(typeof carList).not.toBe(null);
        });

        it('result instanceof Array === true', function(){
            expect(carList instanceof Array).toBe(true);
        });
    });

    describe('Each list item should have following property', function(){
        it('_id', function(){
            var flag = carList.every(function(item){
                return item.hasOwnProperty('_id');
            })
            expect(flag).toBe(true);
        });

        it('manufacturer', function(){
            var flag = carList.every(function(item){
                return item.hasOwnProperty('manufacturer');
            })
            expect(flag).toBe(true);
        });

        it('model', function(){
            var flag = carList.every(function(item){
                return item.hasOwnProperty('model');
            })
            expect(flag).toBe(true);
        });

        it('price', function(){
            var flag = carList.every(function(item){
                return item.hasOwnProperty('price');
            })
            expect(flag).toBe(true);
        });

        it('wiki', function(){
            var flag = carList.every(function(item){
                return item.hasOwnProperty('wiki');
            })
            expect(flag).toBe(true);
        });

        it('img', function(){
            var flag = carList.every(function(item){
                return item.hasOwnProperty('img');
            })
            expect(flag).toBe(true);
        });


    });

})