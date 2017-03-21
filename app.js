function Parser() {


    //==============================Variable declarations===========================================
    var fs = require("fs");
    var jsonfile = require('jsonfile')
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var obj = JSON.parse(fs.readFileSync('demo.json', 'utf8'));
    var intents;
    var entities;
    var intent;
    var list = [];
    var listFinal = [];
    var brandArr = [];
    var colourArr = [];
    var categoArr = [];
    var BrandId;
    var ColourId;
    var categoryId;
    var finalCategoryId;
    var finalLayer;
    var finalName;
    var sort;
    var size;
    var currencyCounter = 0;
    var urlArr = [];
    var urlArrValue = [];
    var urlArrFinal = [];
    var urlViewValue = [];
    var urlView = [];
    var urlViewFinal = [];
    var finalUrlKey;
    var urlKeyFirstFather;
    var urlKeySecondFather;
    var urlKeyThirdFather;

    var fatherCategory;
    var secondFather;
    var request = require('request');

    //================================================


    // console.log("\n"+"■━━━━━━━━━━━━━━━━━━━━━━━━━■");
    // console.log("Parsing IBM Watson's Answer")
    // console.log("■━━━━━━━━━━━━━━━━━━━━━━━━━■"+"\n");

    // =========Separation of the intents and entites objects==============


    for (var key in obj) {
        if (key == "entities") {
            entities = obj[key]
        };

        for (var innerKey in obj[key]) {

            for (var secondKey in obj[key][innerKey]) {
                if (secondKey == "intent") {
                    intents = obj[key][innerKey];
                }

            }
        }
    }


    //====================Detection of the intent================================


    for (var key in intents) {
        if (key == "intent")


        {
            intent = intents[key];
            //console.log("the intent is: "+intent +"\n");

        }


    }
    //===================detection of the list of entities=================================



    for (var key in entities) {
        var i = 0;


        for (var innerKey in entities[key]) {
            i++;

            if (i == 1 || i == 3)
                list.push(entities[key][innerKey]);

        }

    }
    //===========Creation of the 2d array (entity/value)============================

    for (var i = 0; i < list.length; i += 2) {



        entity = list[i];
        value = list[i + 1];

        listFinal.push([entity, value]);



    }

    //===============Display the entity with its index and value=========================


    for (var i = 1; i < listFinal.length + 1; i++)

    {

        var finalEntity = listFinal[i - 1][0];
        var finalValue = listFinal[i - 1][1];

        //console.log("the entity "+i+" is "+finalEntity+" and its value is "+finalValue);

        //================Get the ID of the brand==========================================     

        if (finalEntity == "brand") {
            var brandName = finalValue;
            var brandObj = JSON.parse(fs.readFileSync('brands.json', 'utf8'));
            for (var key in brandObj) {

                for (var innerKey in brandObj[key]) {
                    if (brandObj[key][innerKey] == finalValue) {


                        for (var innerKey in brandObj[key]) {
                            if (innerKey == "id") {
                                brandArr.push(brandObj[key][innerKey]);
                            }
                        }
                    }

                }

            }
            BrandId = brandArr[0];

            //console.log("The brand id is "+BrandId+"\n");  

        }

        //=================Check if prices need to be sorted===============================
        if (finalEntity == "product_sort") {
            sort = finalValue
        }
        //========================Get the prices limits===========================================

        if (finalEntity == "sys_currency") {
            currencyCounter = currencyCounter + 1;

            if (currencyCounter == 1) {
                var firstLimit = finalValue;

                //console.log("the first limit is "+firstLimit+"\n" );
            }

            if (currencyCounter == 2) {
                var secondLimit = finalValue;
                //console.log("the second limit is "+secondLimit+"\n" );
            }

        }

        //================Get the ID of the colour==========================================     


        if (finalEntity == "product_colour") {
            var colourName = finalValue;
            var colourObj = JSON.parse(fs.readFileSync('colours.json', 'utf8'));
            for (var key in colourObj) {

                for (var innerKey in colourObj[key]) {
                    if (colourObj[key][innerKey] == finalValue) {


                        for (var innerKey in colourObj[key]) {
                            if (innerKey == "id") {
                                colourArr.push(colourObj[key][innerKey]);
                            }
                        }
                    }

                }

            }
            ColourId = colourArr[0];

            //console.log("The colour id is "+ColourId+"\n");  

        }

        //======================Get the ID the category(ies)=========================================

        if (finalEntity == "product_category") {
            var categoryName = finalValue;
            var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));
            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey]) {
                        if (secondKey == "name" && categObj[key][innerKey][secondKey] == finalValue) {
                            for (var secondKey in categObj[key][innerKey]) {
                                if (secondKey == "id") {
                                    var categoryId = categObj[key][innerKey][secondKey];
                                    //console.log("The category id is "+categoryId+"\n");
                                }
                                if (secondKey == "urlKey") {
                                    var urlKey1 = categObj[key][innerKey][secondKey];
                                }
                            }
                        }


                    }

                }

            }

        }



        if (finalEntity == "product_category_type") {
            var category_typeName = finalValue;
            var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey]) {
                        for (var thirdKey in categObj[key][innerKey][secondKey]) {

                            for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])


                                if (fourthKey == "name" && categObj[key][innerKey][secondKey][thirdKey][fourthKey] == finalValue)

                            {


                                for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey]) {
                                    if (fourthKey == "id") {
                                        var category_typeId = categObj[key][innerKey][secondKey][thirdKey][fourthKey];
                                        // console.log("the category_type id is "+ category_typeId+"\n");

                                    }

                                    if (fourthKey == "urlKey") {
                                        var urlKey2 = categObj[key][innerKey][secondKey][thirdKey][fourthKey];
                                    }


                                }


                            }

                        }

                    }


                }




            }

        }




        if (finalEntity == "product_category_type_specific") {
            var category_type_specificName = finalValue;
            var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));
            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey]) {

                        for (var thirdKey in categObj[key][innerKey][secondKey]) {

                            for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])


                                for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey]) {

                                    for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey]) {


                                        if (sixthKey == "name" && categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == finalValue) {
                                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey]) {
                                                if (sixthKey == "id") {

                                                    var category_type_specificId = categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey];
                                                    //console.log("the id of the specific category is "+ category_type_specificId+"\n");
                                                }

                                                if (sixthKey == "urlKey") {
                                                    var urlKey3 = categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey];
                                                }

                                            }
                                        }

                                    }

                                }

                        }

                    }


                }

            }


        }




        //=====================================Define the final category ID=================================================================================================

        if (categoryId && category_typeId && !category_type_specificId) {
            var counter = 0;

            var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey]) {
                        if (secondKey == "id" && categObj[key][innerKey][secondKey] == categoryId) {
                            for (var secondKey in categObj[key][innerKey]) {
                                for (var thirdKey in categObj[key][innerKey][secondKey]) {

                                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey]) {

                                        if (fourthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey] == category_typeId)

                                        {

                                            counter = counter + 1;


                                        } else {}

                                    }
                                }

                            }


                        }


                    }
                }
            }

            if (counter == 1) {
                if (categoryName == category_typeName) {
                    finalCategoryId = categoryId;
                    finalLayer = 1;
                    finalUrlKey = urlKey1;
                }

            } else {
                finalCategoryId = category_typeId;
                finalLayer = 2;
                finalUrlKey = urlKey2;



            };
            //console.log("the final id of the category is "+ finalCategoryId+"\n");
        }
        //============================================================================
        else if (category_type_specificId && categoryId && !category_typeId) {
            var counter = 0;

            var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey]) {
                        if (secondKey == "id" && categObj[key][innerKey][secondKey] == categoryId) {
                            for (var secondKey in categObj[key][innerKey]) {
                                for (var thirdKey in categObj[key][innerKey][secondKey]) {

                                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey]) {

                                        for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey]) {

                                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey]) {

                                                if (sixthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == category_type_specificId)

                                                {

                                                    counter = counter + 1;



                                                } else {}
                                            }
                                        }

                                    }
                                }

                            }


                        }


                    }
                }
            }

            if (counter == 1) {

                finalCategoryId = category_type_specificId;
                finalLayer = 3;
                finalUrlKey = urlKey3;



            } else {

                finalCategoryId = categoryId;
                finalLayer = 1;
                finalUrlKey = urlKey1;

                //console.log("the final id of the category is "+ finalCategoryId+"\n");
            }

        }
        //======================================================================================
        else if (category_typeId && category_type_specificId && !categoryId) {
            var counter = 0;


            var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey]) {

                        for (var thirdKey in categObj[key][innerKey][secondKey]) {

                            for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey]) {

                                if (fourthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey] == category_typeId) {
                                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])

                                    {

                                        for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey]) {

                                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey]) {

                                                if (sixthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == category_type_specificId)

                                                {

                                                    counter = counter + 1;



                                                } else {}
                                            }
                                        }

                                    }


                                }
                            }
                        }


                    }
                }
            }




            if (counter == 1) {
                finalCategoryId = category_type_specificId;

                finalLayer = 3;
                finalUrlKey = urlKey3;

            } else {
                finalCategoryId = category_typeId;

                finalLayer = 2;
                finalUrlKey = urlKey2;


            }
            //console.log("the final id of the category is "+ finalCategoryId+"\n");


        }

        //==========================================================================================
        else if (category_type_specificId && category_typeId && categoryId) {
            var counter1 = 0;
            var counter2 = 0;
            var counter3 = 0;

            var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

            //=========================================================================
            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey]) {
                        if (secondKey == "id" && categObj[key][innerKey][secondKey] == categoryId) {
                            for (var secondKey in categObj[key][innerKey]) {
                                for (var thirdKey in categObj[key][innerKey][secondKey]) {

                                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey]) {

                                        if (fourthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey] == category_typeId)

                                        {

                                            counter1 = counter1 + 1;


                                        } else {}

                                    }
                                }

                            }


                        }


                    }
                }
            }

            //=========================================================================
            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey]) {

                        for (var thirdKey in categObj[key][innerKey][secondKey]) {

                            for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey]) {

                                if (fourthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey] == category_typeId) {
                                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])

                                    {

                                        for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey]) {

                                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey]) {

                                                if (sixthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == category_type_specificId)

                                                {

                                                    counter2 = counter2 + 1;



                                                } else {}
                                            }
                                        }

                                    }


                                }
                            }
                        }


                    }
                }
            }

            //=========================================================================

            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey]) {
                        if (secondKey == "id" && categObj[key][innerKey][secondKey] == categoryId) {
                            for (var secondKey in categObj[key][innerKey]) {
                                for (var thirdKey in categObj[key][innerKey][secondKey]) {

                                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey]) {

                                        for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey]) {

                                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey]) {

                                                if (sixthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == category_type_specificId)

                                                {

                                                    counter3 = counter3 + 1;



                                                } else {}
                                            }
                                        }

                                    }
                                }

                            }


                        }


                    }
                }
            }
            //=========================================================================



            if (counter1 == 1 && counter2 == 1) {
                finalCategoryId = category_type_specificId;
                finalLayer = 3;
                finalUrlKey = urlKey3;

                //console.log("the final id of the category is "+ finalCategoryId+"\n");
            } else if (counter2 == 1) {
                finalCategoryId = category_type_specificId;
                finalLayer = 3;
                finalUrlKey = urlKey3;

                //console.log("the final id of the category is "+ finalCategoryId+"\n");
            } else if (counter3 == 1) {
                finalCategoryId = category_type_specificId
                finalLayer = 3;
                finalUrlKey = urlKey3;

                // console.log("the final id of the category is "+ finalCategoryId+"\n");

            } else {
                finalCategoryId = category_type_specificId;
                finalLayer = 3;
                finalUrlKey = urlKey3;

                //console.log("the final id of the category is "+ finalCategoryId+"\n");
            };


        }

        //=====================================================================================================
        else if (!category_type_specificId && !category_typeId && categoryId) {
            finalCategoryId = categoryId;
            finalLayer = 1;
            finalUrlKey = urlKey1;

            //console.log("the final id of the category is "+ finalCategoryId+"\n");


        } else if (!category_type_specificId && category_typeId && !categoryId) {
            finalCategoryId = category_typeId;
            finalLayer = 2;
            finalUrlKey = urlKey2;

            //console.log("the final id of the category is "+ finalCategoryId+"\n");


        } else if (category_type_specificId && !category_typeId && !categoryId) {
            finalCategoryId = category_type_specificId;
            finalLayer = 3;
            finalUrlKey = urlKey3;

            //console.log("the final id of the category is "+ finalCategoryId+"\n");


        } else {};

        //=========================================Define the final category Name=====================================

        if (finalLayer == 1) {
            var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));
            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey]) {
                        if (secondKey == "id" && categObj[key][innerKey][secondKey] == finalCategoryId) {
                            for (var secondKey in categObj[key][innerKey]) {
                                if (secondKey == "name") {
                                    var finalName = categObj[key][innerKey][secondKey];
                                    //console.log("the final Category name is  "+ finalName+"\n");
                                }
                            }
                        }


                    }

                }

            }

        } else if (finalLayer == 2) {


            var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey]) {
                        for (var thirdKey in categObj[key][innerKey][secondKey]) {

                            for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])


                                if (fourthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey] == finalCategoryId)

                            {


                                for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey]) {
                                    if (fourthKey == "name") {
                                        finalName = categObj[key][innerKey][secondKey][thirdKey][fourthKey];
                                        //console.log("the final Category name is  "+ finalName+"\n");

                                    }


                                }


                            }

                        }

                    }


                }




            }
        } else {
            var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));
            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey]) {

                        for (var thirdKey in categObj[key][innerKey][secondKey]) {

                            for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])


                                for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey]) {

                                    for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey]) {


                                        if (sixthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == finalCategoryId) {
                                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey]) {
                                                if (sixthKey == "name") {

                                                    var finalName = categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey];
                                                    // console.log("the final Category name is  "+ finalName+"\n");
                                                }

                                            }
                                        }

                                    }

                                }

                        }

                    }


                }

            }
        }


        //===================================find the father category==========================================
        //console.log("the final layer is "+finalLayer);

        if (finalLayer == 1) {
            var fatherCategoryUrl;
            secondFather = "";
        }

        if (finalLayer == 2) {

            var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));
            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey])
                        if (secondKey == "name") {
                            var categoryKey = categObj[key][innerKey][secondKey];
                            for (var secondKey in categObj[key][innerKey]) {
                                for (var thirdKey in categObj[key][innerKey][secondKey]) {
                                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey]) {
                                        if (fourthKey == "name") {
                                            if (categObj[key][innerKey][secondKey][thirdKey][fourthKey] == finalName) {
                                                fatherCategoryUrl = categoryKey;

                                            }
                                        }
                                    }
                                }
                            }
                        }

                }

            }

        }



        if (finalLayer == 3) {

            var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));
            for (var key in categObj) {

                for (var innerKey in categObj[key]) {

                    for (var secondKey in categObj[key][innerKey])
                        if (secondKey == "name") {
                            var categoryKey = categObj[key][innerKey][secondKey];
                            for (var secondKey in categObj[key][innerKey]) {
                                if (secondKey == "urlKey") {
                                    var lol1 = categObj[key][innerKey][secondKey];
                                }
                                for (var thirdKey in categObj[key][innerKey][secondKey]) {
                                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey]) {
                                        if (fourthKey == "name") {
                                            var categoryTypeKey = categObj[key][innerKey][secondKey][thirdKey][fourthKey];

                                        }
                                        for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey]) {
                                            if (fourthKey == "urlKey") {
                                                var lol2 = categObj[key][innerKey][secondKey][thirdKey][fourthKey];
                                            }

                                            for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey]) {
                                                for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey]) {
                                                    if (sixthKey == "name") {
                                                        if (categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == finalName) {
                                                            fatherCategoryUrl = categoryKey;
                                                            secondFather = categoryTypeKey;
                                                            urlKeyFirstFather = lol1;
                                                            urlKeySecondFather = lol2;




                                                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey]) {
                                                                if (sixthKey == "urlKey") {
                                                                    urlKeyThirdFather = categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey];
                                                                }
                                                            }
                                                        }
                                                    }

                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }

                }

            }




        }

        //=================================Find the size ID=================================================

        if (finalEntity == "product_size") {

            var sizeObj = JSON.parse(fs.readFileSync('sizes.json', 'utf8'));
            for (var key in sizeObj) {

                for (var innerKey in sizeObj[key]) {
                    for (var secondKey in sizeObj[key][innerKey]) {
                        if (secondKey == "id" && sizeObj[key][innerKey][secondKey] == fatherCategory) {
                            for (var secondKey in sizeObj[key][innerKey]) {
                                if (secondKey == "sizes") {
                                    for (var thirdKey in sizeObj[key][innerKey][secondKey]) {
                                        for (var fourthKey in sizeObj[key][innerKey][secondKey][thirdKey]) {
                                            if (fourthKey == "name" && sizeObj[key][innerKey][secondKey][thirdKey][fourthKey] == finalValue) {
                                                for (var fourthKey in sizeObj[key][innerKey][secondKey][thirdKey]) {

                                                    if (fourthKey == "id") {
                                                        size = sizeObj[key][innerKey][secondKey][thirdKey][fourthKey];
                                                        //console.log("the size id is "+size+"\n");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                }


            }


        }

    }


    //=====================================Define the price limits===============================================
    if (currencyCounter == 1) {
        var priceMin = firstLimit * 100;
    }

    if (currencyCounter == 2) {
        if (firstLimit > secondLimit) {
            var priceMin = secondLimit * 100;
            var priceMax = firstLimit * 100;
        } else {
            var priceMax = secondLimit * 100;
            var priceMin = firstLimit * 100;
        }
    }

    //console.log("PriceMin is "+priceMin+" and priceMax is "+priceMax+"\n");

    //===========================Check which URL parameters are defined=====================

    urlArr[0] = "brandIds";
    urlArr[1] = "categoryIds";
    urlArr[2] = "colourIds";
    urlArr[3] = "priceMax";
    urlArr[4] = "priceMin";
    urlArr[5] = "saleableStandardSizes";
    urlArr[6] = "sort";

    urlArrValue[0] = BrandId;
    urlArrValue[1] = finalCategoryId;
    urlArrValue[2] = ColourId;
    urlArrValue[3] = priceMax;
    urlArrValue[4] = priceMin;
    urlArrValue[5] = size;
    urlArrValue[6] = sort;

    for (var i = 0; i < 7; i++) {
        if (urlArrValue[i]) {
            urlArrFinal.push(urlArr[i], urlArrValue[i]);
        }
    }




    urlView[0] = "navlevel3";
    urlView[1] = "designerfilter";
    urlView[2] = "colourfilter";
    urlView[3] = "sizefilter";
    urlView[4] = "sortorder";


    urlViewValue[0] = urlKeyThirdFather;
    urlViewValue[1] = BrandId;
    urlViewValue[2] = ColourId;
    urlViewValue[3] = size;
    urlViewValue[4] = sort;

    for (var i = 0; i < 5; i++) {
        if (urlViewValue[i]) {

            urlViewFinal.push(urlView[i], urlViewValue[i]);
        }
    }

    //console.log(urlViewFinal);



    //==========================Craft the Url used in the API call==================================

    var url = "http://api.net-a-porter.com:80/NAP/GB/300/0/pids?";
    for (var i = 0; i < urlArrFinal.length; i++) {
        if (i == 0) {
            var url = url + urlArrFinal[i] + "=" + urlArrFinal[i + 1];
        } else {
            var url = url + "&" + urlArrFinal[i] + "=" + urlArrFinal[i + 1];
        }
        i = i + 1;
    }
    var url = url + "&visibility=visible";
    console.log(url);




    //============================Craft the ViewAll url==============================================

    var viewAllurl = "";



    if (finalCategoryId == category_type_specificId) {
        var view = "https://www.net-a-porter.com/gb/en/d/shop/" + urlKeyFirstFather + "/" + urlKeySecondFather + "?";
    }

    if (finalCategoryId == category_typeId) {
        var view = "https://www.net-a-porter.com/gb/en/d/shop/" + fatherCategoryUrl + "/" + urlKey2 + "?";
    }

    if (finalCategoryId == categoryId) {

        var view = "https://www.net-a-porter.com/gb/en/d/shop/" + finalUrlKey + "?";

    }



    if (categoryId || category_typeId || category_type_specificId) {
        for (var i = 0; i < urlViewFinal.length; i++) {
            if (i == 0) {

                view = view + urlViewFinal[i] + "=" + urlViewFinal[i + 1];
                viewAllurl = view

            } else {
                viewAllurl = viewAllurl + "&" + urlViewFinal[i] + "=" + urlViewFinal[i + 1];
            }

            i = i + 1;
        }


    } else {


        if (ColourId && BrandId) {
            var view = "https://www.net-a-porter.com/gb/en/Shop/";
            viewAllurl = view + "Designers/" + brandName + "?colourFilter=" + colourName;
        }




    }

    console.log(viewAllurl);



    //=================================Execute API calls=======================

    console.log("\n" + "■━━━━━■");
    console.log("Results")
    console.log("■━━━━━■" + "\n");

    var file = 'finalResult.json';
    fs.truncate(file, 0, function(err) {

    })

    var urlCall = url;

    client.get(url, function(data, response) {
        var list = data.pids;
        console.log("the number of results is: " + list.length);
        //=========================If the answer s empty======================
        if (list.length == 0) {
            var obj = {


                "viewAllurl": {
                    "url": ""
                },

                "products": []
            }
            var file = 'finalResult.json';
            jsonfile.writeFileSync(file, obj, {
                flag: 'a'
            }, function(err) {});

        }
        //=======================otherwise============================================
        else {

            if (list.length < 10) {
                var limit = list.length;
            } else {
                var limit = 10;
            }
            var obj = {


                "viewAllurl": {
                    "url": ""
                },

                "products": []
            }

            for (var i = 0; i < limit; i++) {

                var infoUrl = "http://api.net-a-porter.com:80/NAP/GB/en/summarise/" + list[i];

                client.get(infoUrl, function(data, response) {



                    obj.viewAllurl.url = viewAllurl;
                    var pictureUrl = "cache.net-a-porter.com/images/products/" + data.id + "/" + data.id + "_in_l.jpg";
                    data.images.urlTemplate = pictureUrl;

                    var a = 1;
                    i = i - a;
                    a = a - 1;
                    obj.products[9 - i] = data;
                    file = 'finalResult.json';
                    jsonfile.writeFileSync(file, obj, function(err) {});




                })

            }
            //end for

        }
        //end else



    });

    var RESULT = fs.readFileSync("finalResult.json").toString();



    return RESULT;
}



Parser();
