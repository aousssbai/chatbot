



//==============================Variable declarations===========================================
var fs = require("fs");
var JSONPath = require('JSONPath');
var csv = require('csv-parser')
var obj = JSON.parse(fs.readFileSync('demo.json', 'utf8'));
var intents;
var entities;
var intent;
var list=[];
var listFinal=[];
var brandArr=[];
var colourArr=[];
var categoArr=[];
var BrandId;
var ColourId;
var categoryId;
var finalCategoryId;
var finalLayer;
var finalName;
var sort;
var size;
var currencyCounter=0; 
var urlArr=[];
var urlArrValue=[];
var urlArrFinal=[];

var fatherCategory;
var request = require('request');



// console.log("\n"+"■━━━━━━━━━━━━━━━━━━━━━━━━━■");
// console.log("Parsing IBM Watson's Answer")
// console.log("■━━━━━━━━━━━━━━━━━━━━━━━━━■"+"\n");

	// =========Separation of the intents and entites objects==============


	for(var key in obj) 
	{
		if (key=="entities") {entities = obj[key]};

        for(var innerKey in obj[key]) 
         {
           
           for (var secondKey in obj[key][innerKey])
           {
             if (secondKey == "intent") { intents =  obj[key][innerKey]; }
             
           }
         }      
    }
    

//====================Detection of the intent================================


for(var key in intents) 
	{
		if (key=="intent")
			
         	
         { 
         	intent = intents[key];
         	//console.log("the intent is: "+intent +"\n");

         }
         
		
	}
//===================detection of the list of entities=================================



	 for(var key in entities) 
	 {
	 	var i=0;

	 	
	 	for (var innerKey in entities[key])
	 	{
	 	 i++;

	 	 if (i==1 || i==3)
	       	list.push(entities[key][innerKey]);
             
		}
	
	 }
//===========Creation of the 2d array (entity/value)============================

	 for (var i=0; i<list.length; i+=2)
	 { 
	 
	 	 
	 	   
           entity = list[i];
           value = list[i+1];

           listFinal.push([entity,value]);

   

	 }

//===============Display the entity with its index and value=========================


for (var i=1; i<listFinal.length+1; i++)

{

     var finalEntity = listFinal[i-1][0];
     var finalValue = listFinal[i-1][1];

     //console.log("the entity "+i+" is "+finalEntity+" and its value is "+finalValue);

//================Get the ID of the brand==========================================     

if (finalEntity=="brand")
{
   var brandObj = JSON.parse(fs.readFileSync('brands.json', 'utf8'));
   for (var key in brandObj)
   {
   	 
   	  for (var innerKey in brandObj[key])
   	  {     
             if (brandObj[key][innerKey] == finalValue)
             {
                

                for (var innerKey in brandObj[key])
                {
                     if (innerKey == "id")
                     {
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
if (finalEntity == "sort")
{
  sort = finalValue
}
//========================Get the prices limits===========================================

if (finalEntity == "sys_currency")
{
currencyCounter = currencyCounter+1; 

if (currencyCounter == 1)
{
  var firstLimit = finalValue;

  //console.log("the first limit is "+firstLimit+"\n" );
}

if (currencyCounter == 2)
{
  var secondLimit = finalValue; 
  //console.log("the second limit is "+secondLimit+"\n" );
}

}

//================Get the ID of the colour==========================================     


if (finalEntity=="colour")
{
   var colourObj = JSON.parse(fs.readFileSync('colours.json', 'utf8'));
   for (var key in colourObj)
   {
   	 
   	  for (var innerKey in colourObj[key])
   	  {     
             if (colourObj[key][innerKey] == finalValue)
             {
                

                for (var innerKey in colourObj[key])
                {
                     if (innerKey == "id")
                     {
                     	colourArr.push(colourObj[key][innerKey]);
                     }
                }
             }

   	  }
   	   
   }
     ColourId = colourArr[0];

    // console.log("The colour id is "+ColourId+"\n");  

}

//======================Get the ID the category(ies)=========================================
  
if (finalEntity=="product_category") 
{
  var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));
   for (var key in categObj)
   {
     
          for (var innerKey in categObj[key])
          {   
                
              for (var secondKey in categObj[key][innerKey])
              {
                   if (secondKey == "name" && categObj[key][innerKey][secondKey] == finalValue)
                  {
                      for (var secondKey in categObj[key][innerKey])
                            {
                               if (secondKey == "id")
                               {
                                var categoryId = categObj[key][innerKey][secondKey];
                                //console.log("The category id is "+categoryId+"\n");
                               }
                            }
                  }
                 
                 
              }
                    
          }

   }

 }



if (finalEntity=="product_category_type") 
{
  var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

   for (var key in categObj)
   {
     
          for (var innerKey in categObj[key])
          {   
                
              for (var secondKey in categObj[key][innerKey])
              {
                  for (var thirdKey in categObj[key][innerKey][secondKey])
                  {

                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])


                     if (fourthKey == "name"  && categObj[key][innerKey][secondKey][thirdKey][fourthKey] == finalValue)

                     { 
                        

                          for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])
                          { 
                              if(fourthKey == "id")
                              {
                                var category_typeId =  categObj[key][innerKey][secondKey][thirdKey][fourthKey];
                               // console.log("the category_type id is "+ category_typeId+"\n");

                              }       


                          }
                         

                    }
                    
                  }
                            
              }
                 
                 
          }

           





                    
    }

}






if (finalEntity=="product_category_type_specific") 
{
  var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));
   for (var key in categObj)
   {
     
          for (var innerKey in categObj[key])
          {   
                
              for (var secondKey in categObj[key][innerKey])
              {

                  for (var thirdKey in categObj[key][innerKey][secondKey])
                  {

                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])


                        for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey])
                        {

                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey])
                            {

                                
                                if (sixthKey == "name" && categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == finalValue)
                                {
                                  for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey])
                                  {
                                     if (sixthKey == "id")
                                     {

                                      var category_type_specificId = categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey];
                                         //console.log("the id of the specific category is "+ category_type_specificId+"\n");
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

if ( categoryId && category_typeId && !category_type_specificId) 
{ var counter=0;

   var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

   for (var key in categObj)
   {
     
          for (var innerKey in categObj[key])
          {   
                
              for (var secondKey in categObj[key][innerKey])
              {
                if (secondKey == "id" && categObj[key][innerKey][secondKey] == categoryId)
                {
                   for (var secondKey in categObj[key][innerKey])
              {
                  for (var thirdKey in categObj[key][innerKey][secondKey])
                  { 

                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])
                     { 
                    
                     if (fourthKey== "id"  && categObj[key][innerKey][secondKey][thirdKey][fourthKey] == category_typeId)

                     { 
                        
                         counter=counter+1; 
                         

                    }


                    else {}
                  
                }
                }
                            
              }
                 
                 
          }

                           
    }
  }
}

     if (counter == 1)
     {
      finalCategoryId = category_typeId;
      finalLayer = 2;
      
     }
     
     else {
      finalCategoryId = categoryId;
       finalLayer = 1;
      


     };
    // console.log("the final id of the category is "+ finalCategoryId+"\n");
}
//============================================================================


else if (category_type_specificId && categoryId && !category_typeId)
{ 
  var counter=0;

   var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

   for (var key in categObj)
   {
     
          for (var innerKey in categObj[key])
          {   
                
              for (var secondKey in categObj[key][innerKey])
              {
                if (secondKey == "id" && categObj[key][innerKey][secondKey] == categoryId)
                {
                   for (var secondKey in categObj[key][innerKey])
              {
                  for (var thirdKey in categObj[key][innerKey][secondKey])
                  { 

                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])
                     { 

                       for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey])
                        {

                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey])
                            {
                    
                     if (sixthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == category_type_specificId)

                     { 
                        
                         counter=counter+1; 
                         
                         

                    }


                    else {}
                  }
              }
                  
                }
                }
                            
              }
                 
                 
          }

                           
    }
  }
}

     if (counter == 1)
     {
      finalCategoryId = category_type_specificId;
       finalLayer = 3;
      

     }
     
     else {finalCategoryId == categoryId;
       finalLayer = 1;
 
     //console.log("the final id of the category is "+ finalCategoryId+"\n");
   }
  
}
//======================================================================================

else if (category_typeId && category_type_specificId && !categoryId)
{
  var counter=0;

   var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

   for (var key in categObj)
   {
     
          for (var innerKey in categObj[key])
          {   
                
              for (var secondKey in categObj[key][innerKey])
              {
                
                  for (var thirdKey in categObj[key][innerKey][secondKey])
                  { 

                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])
                     { 

                      if (fourthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey] == category_typeId)
                {
                   for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])
                   
              {

                       for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey])
                        {

                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey])
                            {
                    
                     if (sixthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == category_type_specificId)

                     { 
                        
                         counter=counter+1; 
                         
                         

                    }


                    else {}
                  }
              }
                  
                }
                 
                 
          }
        }
      }

                           
    }
  }
}




  if (counter == 1)
     {
      finalCategoryId = category_type_specificId;
      finalLayer = 3;
     
     }
     
     else {finalCategoryId == category_typeId;
      finalLayer = 2;
      
     
   }
//console.log("the final id of the category is "+ finalCategoryId+"\n");
  
  
}

//==========================================================================================

else if (category_type_specificId && category_typeId && categoryId)
{
var counter1=0;
var counter2=0;
var counter3=0;

   var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

//=========================================================================
   for (var key in categObj)
   {
     
          for (var innerKey in categObj[key])
          {   
                
              for (var secondKey in categObj[key][innerKey])
              {
                if (secondKey == "id" && categObj[key][innerKey][secondKey] == categoryId)
                {
                   for (var secondKey in categObj[key][innerKey])
              {
                  for (var thirdKey in categObj[key][innerKey][secondKey])
                  { 

                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])
                     { 
                    
                     if (fourthKey== "id"  && categObj[key][innerKey][secondKey][thirdKey][fourthKey] == category_typeId)

                     { 
                        
                         counter1=counter1+1; 
                         

                    }


                    else {}
                  
                }
                }
                            
              }
                 
                 
          }

                           
    }
  }
}

//=========================================================================
for (var key in categObj)
   {
     
          for (var innerKey in categObj[key])
          {   
                
              for (var secondKey in categObj[key][innerKey])
              {
                
                  for (var thirdKey in categObj[key][innerKey][secondKey])
                  { 

                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])
                     { 

                      if (fourthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey] == category_typeId)
                {
                   for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])
                   
              {

                       for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey])
                        {

                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey])
                            {
                    
                     if (sixthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == category_type_specificId)

                     { 
                        
                         counter2=counter2+1; 
                         
                         

                    }


                    else {}
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

for (var key in categObj)
   {
     
          for (var innerKey in categObj[key])
          {   
                
              for (var secondKey in categObj[key][innerKey])
              {
                if (secondKey == "id" && categObj[key][innerKey][secondKey] == categoryId)
                {
                   for (var secondKey in categObj[key][innerKey])
              {
                  for (var thirdKey in categObj[key][innerKey][secondKey])
                  { 

                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])
                     { 

                       for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey])
                        {

                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey])
                            {
                    
                     if (sixthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == category_type_specificId)

                     { 
                        
                         counter3=counter3+1; 
                         
                         

                    }


                    else {}
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



   if (counter1 == 1 && counter2 == 1)
     {
      finalCategoryId = category_type_specificId;
       finalLayer = 3;
      
     // console.log("the final id of the category is "+ finalCategoryId+"\n");
     }

     else if (counter2 == 1)
     {
         finalCategoryId = category_type_specificId;
          finalLayer = 3;
      
        // console.log("the final id of the category is "+ finalCategoryId+"\n");
     }

     else if (counter3 == 1)
     {
           finalCategoryId == category_typeId
            finalLayer = 2;
      
          // console.log("the final id of the category is "+ finalCategoryId+"\n");

     }
     
     else {finalCategoryId == categoryId;
       finalLayer = 1;
      
     //console.log("the final id of the category is "+ finalCategoryId+"\n");
   };
  
   
}

//=====================================================================================================

else if (!category_type_specificId && !category_typeId && categoryId)
{
  finalCategoryId = categoryId;
   finalLayer = 1;
      
  //console.log("the final id of the category is "+ finalCategoryId+"\n");

  
}

else if (!category_type_specificId && category_typeId && !categoryId)
{
   finalCategoryId = category_typeId;
    finalLayer = 2;
      
   //console.log("the final id of the category is "+ finalCategoryId+"\n");

   
}

else if (category_type_specificId && !category_typeId && !categoryId)
{
  finalCategoryId = category_type_specificId;
   finalLayer = 3;
     
  //console.log("the final id of the category is "+ finalCategoryId+"\n");

  
}





//=========================================Get the size Id=====================================



if (finalEntity == "product_size")
{


if (finalLayer==1)
{
var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));
   for (var key in categObj)
   {
     
          for (var innerKey in categObj[key])
          {   
                
              for (var secondKey in categObj[key][innerKey])
              {
                   if (secondKey == "id" && categObj[key][innerKey][secondKey] == finalCategoryId)
                  {
                      for (var secondKey in categObj[key][innerKey])
                            {
                               if (secondKey == "name")
                               {
                                var finalName = categObj[key][innerKey][secondKey];
                               // console.log("the final Category name is  "+ finalName+"\n");
                               }
                            }
                  }
                 
                 
              }
                    
          }

   }

}

else if (finalLayer==2)
{


var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));

   for (var key in categObj)
   {
     
          for (var innerKey in categObj[key])
          {   
                
              for (var secondKey in categObj[key][innerKey])
              {
                  for (var thirdKey in categObj[key][innerKey][secondKey])
                  {

                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])


                     if (fourthKey == "id"  && categObj[key][innerKey][secondKey][thirdKey][fourthKey] == finalCategoryId)

                     { 
                        

                          for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])
                          { 
                              if(fourthKey == "name")
                              {
                                 finalName =  categObj[key][innerKey][secondKey][thirdKey][fourthKey];
                                //console.log("the final Category name is  "+ finalName+"\n");

                              }       


                          }
                         

                    }
                    
                  }
                            
              }
                 
                 
          }

           





                    
    }
}



else 
{
var categObj = JSON.parse(fs.readFileSync('categories.json', 'utf8'));
   for (var key in categObj)
   {
     
          for (var innerKey in categObj[key])
          {   
                
              for (var secondKey in categObj[key][innerKey])
              {

                  for (var thirdKey in categObj[key][innerKey][secondKey])
                  {

                    for (var fourthKey in categObj[key][innerKey][secondKey][thirdKey])


                        for (var fifthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey])
                        {

                            for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey])
                            {

                                
                                if (sixthKey == "id" && categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey] == finalCategoryId)
                                {
                                  for (var sixthKey in categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey])
                                  {
                                     if (sixthKey == "name")
                                     {

                                      var finalName = categObj[key][innerKey][secondKey][thirdKey][fourthKey][fifthKey][sixthKey];
                                         //console.log("the final Category name is  "+ finalName+"\n");
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

var clothing = ["Clothing","Beachwear","One-Piece,One Piece","Bikinis","Bikini Tops","Bikini Bottoms","Bikini Sets","Coverups","Beach Dresses","Kaftans and Sarongs","Bridal","Dresses","Skirts","Tops","Coats","Capes","Double Breasted","Down Coats","Fur and Shearling","Knee Length","Long","Parkas","Short","Trench Coats",
"Denim",
"Dresses",
"Jackets",
"Jumpsuits",
"Pants",
"Shorts",
"Skirts",
"Tops",
"Dresses",
"Mini",
"Knee Length",
"Midi",
"Maxi",
"Gowns",
"Boho",
"Bridal",
"Cocktail",
"Day",
"Evening",
"Floral",
"Off the Shoulder",
"Printed",
"Shirt",
"Sleeved",
"Sweater",
"Vacation",
"Work",
"Evening",
"Dresses",
"Jackets",
"Jumpsuits",
"Pants",
"Skirts",
"Tops",
"Jackets",
"Biker Jackets",
"Blazers",
"Bomber",
"Capes",
"Casual Jackets",
"Denim",
"Evening",
"Leather",
"Smart",
"Statement",
"Vests and Gilets",
"Jeans",
"Boyfriend",
"Flared",
"Skinny Leg",
"Straight Leg",
"Wide Leg",
"Cropped",
"High Rise",
"Mid Rise",
"Low Rise",
"Distressed",
"Shorts",
"Jumpsuits",
"Evening",
"Full Length",
"Playsuits",
"Knitwear",
"Fine Knit",
"Medium Knit",
"Heavy Knit",
"Cardigan",
"Cashmere",
"Patterned",
"Poncho",
"Statement",
"Sweater",
"Tops",
"Turtleneck",
"Pants",
"Cropped",
"Culottes",
"Flared",
"Leather",
"Leggings",
"Skinny Leg",
"Straight Leg",
"Tapered",
"Track Pants",
"Wide Leg",
"Shorts",
"Short and Mini",
"Knee Length",
"Denim",
"Skirts",
"Mini",
"Knee Length",
"Midi",
"Maxi",
"Denim",
"Leather",
"Pencil",
"Pleated",
"Statement",
"Wrap",
"Suits",
"Tops",
"Blouses",
"Bodysuits",
"Boho",
"Cropped",
"Evening",
"Knits",
"Lace",
"Long Sleeved",
"Off the Shoulder",
"Shirts",
"Short Sleeved",
"Sleeveless",
"Statement",
"Strapless",
"Sweatshirts",
"T-Shirt,T Shirt",
"Tanks and Camis",
"Tunics"];


var shoes =["Shoes",
"Boots",
"Ankle Boots",
"Knee Boots",
"Over the Knee",
"Platform Boots",
"Rain Boots",
"Shearling",
"Flat",
"Mid Heel",
"High Heel",
"Block Heels",
"Pumps",
"Sandals",
"Evening Shoes",
"Espadrilles",
"Flatforms",
"Flat Shoes",
"Ballet Flats",
"Brogues",
"Loafers",
"Pointed-Toe Flats,Pointed Toe Flats",
"Sandals",
"Slippers",
"Pumps",
"High Heel",
"Mid Heel",
"Kitten Heel",
"Flat",
"Platforms",
"Bridal",
"Sandals",
"High Heel",
"Mid Heel",
"Flat",
"Bridal",
"Mules",
"Platforms",
"Simple",
"Slides",
"Statement",
"Wedges",
"Sneakers",
"High Top",
"Low Top",
"Sport",
"Slip-On,Slip On"];

var bags =["Bags",
"Backpacks",
"Clutch Bags",
"Box",
"Novelty",
"Pouch",
"Evening Bags",
"Luggage and Travel",
"Suitcases",
"Holdall",
"Rolling",
"Mini Bags",
"Shoulder Bags",
"Tote Bags",
"Shoulder Bags",
"Chain Strap",
"Cross Body",
"Drawstring",
"Structured",
"Top Handle",
"Tote Bags",
"Shoulder Strap",
"Beach",
"Bag Accessories",
"Bag Charms",
"Bag Straps"];

var accessories = ["Accessories",
"Jewelry and Watches",
"Fine Jewelry",
"Fashion Jewelry",
"Demi-Fine Jewelry,Demi Fine Jewelry",
"Earrings",
"Chokers",
"Necklaces",
"Bracelets",
"Rings",
"Body Jewelry",
"Brooches",
"Jewelry Cases",
"Watches",
"Fine Watches",
"Fine Watches",
"Beach Accessories",
"Beauty Cases",
"Belts",
"Skinny",
"Wide",
"Waist",
"Bridal Accessories",
"Books",
"Clothing Patches",
"Fine Jewelry",
"Gloves",
"Leather",
"Hair Accessories",
"Headbands",
"Hairclips",
"Headpieces",
"Hats",
"Beanies",
"Berets",
"Caps",
"Fedoras",
"Sunhats",
"Homeware",
"Candles",
"Clothing Care",
"Eye Masks and Pillowcases",
"Room Fragrance",
"Towels",
"Jewelry",
"Keychains",
"Opticals",
"PORTER Magazine",
"Pouches",
"Scarves",
"Wraps",
"Silk",
"Printed",
"Skinny",
"Stationery",
"Sunglasses",
"Aviator",
"Cat-Eye,Cat Eye",
"D-Frame,D Frame",
"Round Frame",
"Square Frame",
"Technology",
"Headphones",
"iPhone 5 Cases",
"iPhone 6 Cases",
"iPhone 6 Plus Cases",
"Tablet Cases",
"iPhone 7 Cases",
"Travel",
"Umbrellas",
"Wallets",
"Cardholders",
"Wallets",
"Watches"];

var lingerie = ["Lingerie",
"Bodysuits",
"Bras",
"Balconette Bras",
"Contour Bras",
"Maternity",
"Multiway Bras",
"Plunge Bras",
"Push Up Bras",
"Soft Cup Bras",
"Sports Bras",
"Strapless Bras",
"Underwired Bras",
"Bridal Lingerie",
"Bridal",
"Hosiery",
"Lingerie Accessories",
"Shapewear",
"Briefs",
"Briefs",
"Thongs",
"High Waisted",
"Shorts",
"Camisoles and Chemises",
"Camisoles",
"Chemises",
"Slips",
"Corsetry",
"Hosiery",
"Socks",
"Tights",
"Stockings",
"Lingerie Accessories",
"Loungewear",
"Robes",
"Short Robes",
"Long Robes",
"Shapewear",
"Bodysuits",
"Briefs and Shorts",
"Slips",
"Tops",
"Sleepwear",
"Camisoles and Chemises",
"Pajamas",
"Nightdresses",
"Playsuits",
"Suspender Belts"];

var beauty = ["Beauty",
"Bath and Body",
"Bath Oil and Soak",
"Body Cleanser and Soap",
"Body Exfoliant and Scrub",
"Body Moisturizer",
"Body Oil",
"Firming",
"Sunscreen",
"Sunless Tanning",
"Footcare",
"Handcare",
"Toothcare",
"Supplements",
"Beauty Sets",
"Bath and Body",
"Haircare",
"Makeup",
"Nails",
"Skincare",
"Candles",
"Room Fragrance",
"Cosmetics Cases",
"Fragrance",
"Discovery Sets",
"Travel and Refills",
"Haircare",
"Shampoo",
"Conditioner",
"Masques and Treatments",
"Styling",
"Travel-Sized,Travel Sized",
"Hair Color",
"Hair Oil",
"Color Treated",
"Dry Hair",
"Fine Hair",
"Frizzy Hair",
"SLS and Paraben-Free,SLS and Paraben Free",
"Dryers and Irons",
"Brushes",
"Makeup",
"Face",
"Light",
"Medium",
"Dark",
"BB Cream",
"Blush",
"Bronzer",
"Concealer",
"Contour",
"Foundation",
"Illuminator",
"Powder",
"Primer",
"Tinted Moisturizer",
"Eye",
"Brows",
"Eyeliner",
"Eyeshadow",
"Mascara",
"Lip",
"Lipcare",
"Lipgloss",
"Lipliner",
"Lipstick",
"Multi-Purpose,Multi Purpose",
"SPF",
"Palettes",
"Brushes and Tools",
"Removers",
"Sets",
"Nails",
"Polish",
"Treatments",
"Tools",
"Removers",
"Sun",
"Skincare",
"Face",
"Anti-Aging,Anti Aging",
"Cleanser and Exfoliant",
"Moisturizer",
"Night Cream",
"Mask",
"Face Oil",
"Serum",
"Toner",
"Mist",
"SPF",
"Eyes",
"Lips",
"Neck and Decollete",
"Sunless Tanning",
"Tools and Devices",
"Face",
"Hair",
"Body",
"Wellness"];

var sport = ["Sport",
"All Sportswear",
"Accessories",
"Boots",
"Dresses",
"Jumpsuits",
"Knitwear",
"Leggings",
"Leotards",
"Outerwear",
"Pants",
"Shoes",
"Shorts",
"Skirts",
"Sneakers",
"Sports Bras",
"Supplements",
"Sweatshirts",
"Swimwear",
"Tops",
"Après Sport,Apres Sport",
"Accessories",
"Jackets",
"Pants",
"Sneakers",
"Supplements",
"Sweatshirts",
"Tops",
"Equestrian",
"Gym and Cross Train",
"Jackets",
"Leggings",
"Shorts",
"Sneakers",
"Sports Bras",
"Tops",
"Outdoor",
"Run",
"Accessories",
"Jackets",
"Leggings",
"Shorts",
"Sneakers",
"Sports Bras",
"Tops",
"Ski",
"Accessories",
"Baselayer",
"Boots",
"Leggings",
"Outerwear",
"Pants",
"Swim and Surf",
"Coverups",
"Rashguards",
"Swimwear",
"Tennis",
"Accessories",
"Dresses",
"Jackets and Vests",
"Skirts",
"Sneakers",
"Sports Bras",
"Tops",
"Yoga and Dance",
"Accessories",
"Leggings",
"Leotards",
"Pants",
"Shoes",
"Shorts",
"Sports Bras",
"Tops",
"Yoga Mats"];

var whatToWear = ["What to Wear",
"For a date",
"Accessories",
"Clothing",
"For the weekend",
"Clothing",
"Accessories",
"For work",
"Clothing",
"Accessories"];

var winterShop = ["Winter Shop",
"Coats and Jackets",
"Sweaters and Knits",
"Pants and Skirts",
"Footwear",
"Ski and Snow",
"Cashmere",
"Winter Accessories",
"Winter Beauty"];

var vacationShop = ["Vacation Shop",
"Beach Getaway",
"Accessories",
"Sandals",
"Coverups",
"Swimwear",
"Ski Chic",
"In Flight",
"Accessories",
"Clothing",
"Beauty Essentials",
"category Gifts",
"Under 150",
"Under 250",
"Over 500",
"Bags and Wallets",
"Bags",
"Wallets",
"Beauty and Fragrance",
"Can't Go Wrong,Cant Go Wrong",
"Cashmere Gifts",
"Exclusives and Gift Boxes",
"For the Home",
"Lingerie and Sleepwear",
"Travel Gifts",
"Watches and Jewelry"];


  //console.log(finalName);
  var compteur =0;

  for (var i=0;i<clothing.length; i++)
  {
    if (finalName == clothing[i])
    {
      fatherCategory = "Clothing";
      compteur = compteur +1; 
    }
  }


if (compteur==0)
{
  for (var i=0;i<shoes.length; i++)
  {
    if (finalName == shoes[i])
    {
      fatherCategory = "Shoes";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{
  for (var i=0;i<bags.length; i++)
  {
    if (finalName == bags[i])
    {
      fatherCategory = "Bags";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{
  for (var i=0;i<accessories.length; i++)
  {
    if (finalName == accessories[i])
    {
      fatherCategory = "Accessories";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{

  for (var i=0;i<lingerie.length; i++)
  {
    if (finalName == lingerie[i])
    {
      fatherCategory = "Lingerie";
      compteur = compteur +1;
    }
  }

}

if (compteur==0)
{

  for (var i=0;i<beauty.length; i++)
  {
    if (finalName == beauty[i])
    {
      fatherCategory = "Beauty";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{

  for (var i=0;i<sport.length; i++)
  {
    if (finalName == sport[i])
    {
      fatherCategory = "Sport";
      compteur = compteur +1;
    }
  }

}

if (compteur==0)
{

for (var i=0;i<vacationShop.length; i++)
  {
    if (finalName == vacationShop[i])
    {
      fatherCategory = "Vacation Shop";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{


for (var i=0;i<whatToWear.length; i++)
  {
    if (finalName == whatToWear[i])
    {
      fatherCategory = "What to Wear";
      compteur = compteur +1;
    }
  }

}


if (compteur==0)
{

for (var i=0;i<winterShop.length; i++)
  {
    if (finalName == winterShop[i])
    {
      fatherCategory = "Winter Shop";
      compteur = compteur +1;
    }
  }
}

//console.log("the father category is "+fatherCategory);



    var sizeObj = JSON.parse(fs.readFileSync('sizes.json', 'utf8'));
    for (var key in sizeObj)
    {
     
      for (var innerKey in sizeObj[key])
      {
        for (var secondKey in sizeObj[key][innerKey])
        {
          if (secondKey == "id" && sizeObj[key][innerKey][secondKey] == fatherCategory)
          {
             for (var secondKey in sizeObj[key][innerKey])
            {
               if (secondKey == "sizes")
               {
                for (var thirdKey in sizeObj[key][innerKey][secondKey])
                {
                  for (var fourthKey in sizeObj[key][innerKey][secondKey][thirdKey])
                  {
                    if (fourthKey == "name" && sizeObj[key][innerKey][secondKey][thirdKey][fourthKey] == finalValue)
                    {
                       for (var fourthKey in sizeObj[key][innerKey][secondKey][thirdKey])
                          {

                            if (fourthKey == "id")
                            {
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



if (currencyCounter==1)
{
  var priceMin = firstLimit*100;
}

if (currencyCounter ==2)
{
  if (firstLimit > secondLimit)
  {
    var priceMin = secondLimit*100;
    var priceMax = firstLimit*100;
  }
  else {
    var priceMax = secondLimit*100;
    var priceMin = firstLimit*100;
  }
}

//console.log("PriceMin is "+priceMin+" and priceMax is "+priceMax+"\n");

//===========================Check which URL parameters are defined=====================

urlArr[0]="brandIds";
urlArr[1]="categoryIds";
urlArr[2]="colourIds";
urlArr[3]="priceMax";
urlArr[4]="priceMin";
urlArr[5]="saleableStandardSizes";
urlArr[6]="sort";

urlArrValue[0]=BrandId;
urlArrValue[1]=finalCategoryId;
urlArrValue[2]=ColourId;
urlArrValue[3]=priceMax;
urlArrValue[4]=priceMin;
urlArrValue[5]=size;
urlArrValue[6]=sort;

for (var i=0; i<7; i++)
{
  if (urlArrValue[i])
  {
     urlArrFinal.push(urlArr[i], urlArrValue[i]);
  }
}

//==========================Craft the Url used in the API call==================================

var url ="http://api.net-a-porter.com:80/NAP/GB/60/0/pids?";
for (var i=0; i<urlArrFinal.length; i++)
{
  if (i==0)
    {var url = url +urlArrFinal[i]+"="+urlArrFinal[i+1];}
  else 
{var url = url + "&"+urlArrFinal[i]+"="+urlArrFinal[i+1];}
i=i+1;
}
var url = url + "&visibility=visible"
//console.log(url);

//=================================Execute API calls=======================

console.log("\n"+"■━━━━━■");
console.log("Results")
console.log("■━━━━━■"+"\n");

var urlCall = url;  
var result;                                   
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
     
     console.log(body);

  }
})





	



   
   