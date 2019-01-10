'use strict';
var db = require('../../config/sequelize');

//Retrieve All Post Travel Information
exports.getPostTravel = function (req, res) {
    db.post_travel.findAll()
        .then(function (postTravel) {
            return res.jsonp(postTravel);
        })
        .catch(function (err) {
            return res.render('error', {
                error: err,
                status: 500
            });
        });
};

//Retrieve All Post Travel Information By postTravelId
exports.getPostTravelById = function (req, res, next, id) {
    console.log('id => ' + id);
    db.post_travel.find({
        where: {
            id: id
        },
        include: [{
            model: db.country
        }]
    }).then(function (postTravel) {
        if (!postTravel) {
            return next(new Error('Failed to load postTravelId ' + id));
        } else {
            req.postTravel = postTravel;
            return next();
        }
    }).catch(function (err) {
        return next(err);
    });
};

//Retrieve Post Travel Information By profileId
exports.getPostTravelByProfileId = function (req, res, next) {
    db.post_travel.findAll({
            where: {
                profile_id: req.params.profileId,
                travelStatus: {
                    $ne: 'Cancelled'
                }
            },
            include: [{
                model: db.country
            }]
        }).then(function (postTravel) {
            return res.jsonp(postTravel);
        })
        .catch(function (err) {
            return res.render('error', {
                error: err,
                status: 500
            });
        });
};

//Show Post Travel
exports.show = function (req, res) {
    return res.jsonp(req.postTravel);
};

//Create Post Travel
exports.createPostTravel = function (req, res, next) {
    var message = null;
    var postTravel = {
        startDate: req.body.startDate,
        endDate: req.body.toDate,
        travelStatus: req.body.status,
        country_id: req.body.countryID,
        profile_id: req.body.profileId
    };

    var postTravelSave = db.post_travel.build(postTravel);
    req.body.post_travel_id = postTravelSave.id;

    postTravelSave.save().then(function () {
        return next();
        // return res.jsonp({
        //     "result": "success"
        // });
    }).catch(function (err) {
        res.send({ status: 'Exception', message: err });
    });
};

//Update Post Travel
exports.updatePostTravel = function (req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var postTravel = req.postTravel;

    postTravel.updateAttributes({
        travelStatus: req.body.travelStatus
    }).then(function (a) {
        return res.jsonp({
            "result": "success"
        });
    }).catch(function (err) {
        return res.send({ status: 'Exception', message: err });
    });
};

/**
 * Create product
 */
exports.createPostTravelProduct = function (req, res, next) {
    var message = null;
    for (var i=0; i<req.body.productList.length; i++){
        var postTravelProduct = {
            productName: req.body.productList[i].productName,
            description: req.body.productList[i].productDescription,
            amount: req.body.productList[i].amount,
            // PostType: 1,
            // IsActive: 1,
            createdDate: Date.now(),
            post_travel_id: req.body.post_travel_id,
            product_category_id: req.body.productList[i].productCategoryId,
            product_sub_category_id: req.body.productList[i].productSubCategoryId
        };

        var productSave = db.post_travel_product.build(postTravelProduct);
        req.body.post_travel_product_id = productSave.id;
        
        productSave.save();//.then(function () {

            for (var j=0; j<req.body.productList[i].productImage.length; j++){
                var postTravelProductDocument = {
                    imageName: req.body.productList[i].productImage[j].imageName,
                    imagePath: req.body.productList[i].productImage[j].imagePath,
                    createdDate: Date.now(),
                    post_travel_product_id: req.body.post_travel_product_id
                };
        
                var productDocumentSave = db.post_travel_product_document.build(postTravelProductDocument);
        
                productDocumentSave.save().then(function () {
                    return res.jsonp({
                        "result": "success"
                    });
                }).catch(function (err) {
                    res.send({
                        status: 'Exception',
                        message: err
                    })
                });
            };
            
        // }).catch(function (err) {
        //     res.send({ status: 'Exception', message: err })
        // });
    };
};

/**
 * Get country list in post travel page
 */
exports.all = function(req, res){
    db.country.findAll({
        where: {
            is_active: 1
        }
    })
    .then(function(country){
        return res.jsonp(country);
    })
    .catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};
//----------------------------------------End----------------------------------------

