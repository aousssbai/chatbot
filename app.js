
function Parser()
{


//==============================Variable declarations===========================================
var fs = require("fs");
var jsonfile = require('jsonfile')
var Client = require('node-rest-client').Client;
var client = new Client();
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
var urlViewValue=[];
var urlView = [];
var urlViewFinal = [];

var fatherCategory;
var secondFather;
var request = require('request');
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


//=========================================================================================================================================================================================================================================================================================================================================================


var dresses1 = ["Dresses",
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
"Work"];

var evening1 = ["Evening",
"Dresses",
"Jackets",
"Jumpsuits",
"Pants",
"Skirts",
"Tops"];

var jackets1 = ["Jackets",
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
"Vests and Gilets"];

var jeans1 = ["Jeans",
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
"Shorts"];

var jumpsuits1 = ["Jumpsuits",
"Evening",
"Full Length",
"Playsuits"];

var knitwear1 = ["Knitwear",
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
"Turtleneck"];

var pants1 = ["Pants",
"Cropped",
"Culottes",
"Flared",
"Leather",
"Leggings",
"Skinny Leg",
"Straight Leg",
"Tapered",
"Track Pants",
"Wide Leg"];

var shorts1 =["Shorts",
"Short and Mini",
"Knee Length",
"Denim"];

var skrits1 = ["Skirts",
"Mini",
"Knee Length",
"Midi",
"Maxi",
"Denim",
"Leather",
"Pencil",
"Pleated",
"Statement",
"Wrap"];

var suits1 = ["Suits"];

var tops1=["Tops",
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

var beachwear1 =["Beachwear","One-Piece,One Piece","Bikinis","Bikini Tops","Bikini Bottoms","Bikini Sets","Coverups","Beach Dresses","Kaftans and Sarongs"];
var bridal1 =["Bridal","Dresses","Skirts","Tops"]; 
var coats1=["Coats","Capes","Double Breasted","Down Coats","Fur and Shearling","Knee Length","Long","Parkas","Short","Trench Coats"];
var denim1 =["Denim",
"Dresses",
"Jackets",
"Jumpsuits",
"Pants",
"Shorts",
"Skirts",
"Tops"];

var boots1 =["Boots",
"Ankle Boots",
"Knee Boots",
"Over the Knee",
"Platform Boots",
"Rain Boots",
"Shearling",
"Flat",
"Mid Heel",
"High Heel"];

var blockHeels1 = ["Block Heels",
"Pumps",
"Sandals"];

var eveningShoes1 = ["Evening Shoes"];
var espadrilles1 = ["Espadrilles"];
var flatforms1 = ["Flatforms"];
var flatShoes1 =["Flat Shoes",
"Ballet Flats",
"Brogues",
"Loafers",
"Pointed-Toe Flats,Pointed Toe Flats",
"Sandals",
"Slippers"];

var pumps1 =["Pumps",
"High Heel",
"Mid Heel",
"Kitten Heel",
"Flat",
"Platforms",
"Bridal"];
var sandals1 =["Sandals",
"High Heel",
"Mid Heel",
"Flat",
"Bridal",
"Mules",
"Platforms",
"Simple",
"Slides",
"Statement",
"Wedges"];

var sneakers1 =["Sneakers",
"High Top",
"Low Top",
"Sport",
"Slip-On,Slip On"];

var backPacks1 =[
"Backpacks"];

var clutchBags1 =["Clutch Bags",
"Box",
"Novelty",
"Pouch"];

var eveningBags1 = ["Evening Bags"];

var luggageAndTravel1 = ["Luggage and Travel",
"Suitcases",
"Holdall",
"Rolling"];

var miniBags1 = ["Mini Bags",
"Shoulder Bags",
"Tote Bags"];

var shoulderBags1 = ["Shoulder Bags",
"Chain Strap",
"Cross Body",
"Drawstring",
"Structured"];

var topHandled1 = ["Top Handle"];

var toteBags1 = ["Tote Bags",
"Shoulder Strap",
"Beach"];

var bagAccessories1 = ["Bag Accessories",
"Bag Charms",
"Bag Straps"];

var jewelryAndWatches1 = ["Jewelry and Watches",
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
"Fine Watches"];

var fineWatches = ["Fine Watches"];

var beachAccessories1 = ["Beach Accessories"];

var beatuyCases1=["Beauty Cases"];

var belts1=["Belts",
"Skinny",
"Wide",
"Waist"];

var bridalAccessories1 =["Bridal Accessories"];
var books1=["Books"];

var clothingPatches1=["Clothing Patches"];

var fineJewelry1=["Fine Jewelry"];
var gloves1=["Gloves",
"Leather"];

var hairAccessroies1=["Hair Accessories",
"Headbands",
"Hairclips",
"Headpieces"];

var hats1=["Hats",
"Beanies",
"Berets",
"Caps",
"Fedoras",
"Sunhats"];

var homewar1=["Homeware",
"Candles",
"Clothing Care",
"Eye Masks and Pillowcases",
"Room Fragrance",
"Towels"];

var jewelry1=["Jewelry"];
var keychains1=["Keychains"];
var opticals1=["Opticals"];
var porterMagazine1=["PORTER Magazine"];
var pouches1=["Pouches"];
var scarves1=["Scarves",
"Wraps",
"Silk",
"Printed",
"Skinny"];

var stationery1=["Stationery"];
var sunglasses1=["Sunglasses",
"Aviator",
"Cat-Eye,Cat Eye",
"D-Frame,D Frame",
"Round Frame",
"Square Frame"];

var technology1=["Technology",
"Headphones",
"iPhone 5 Cases",
"iPhone 6 Cases",
"iPhone 6 Plus Cases",
"Tablet Cases",
"iPhone 7 Cases"];

var travel1=["Travel"];
var umbrellas1=["Umbrellas"];
var wallets1=["Wallets",
"Cardholders",
"Wallets"];
var watches1=["Watches"];

var bodysuits1 = ["Bodysuits"];

var bras1=["Bras",
"Balconette Bras",
"Contour Bras",
"Maternity",
"Multiway Bras",
"Plunge Bras",
"Push Up Bras",
"Soft Cup Bras",
"Sports Bras",
"Strapless Bras",
"Underwired Bras"];

var bridalLingerie1=["Bridal Lingerie",
"Bridal",
"Hosiery",
"Lingerie Accessories",
"Shapewear"];

var briefs1=["Briefs",
"Briefs",
"Thongs",
"High Waisted",
"Shorts"];

var camisolesAndChemises1=["Camisoles and Chemises",
"Camisoles",
"Chemises",
"Slips"];

var corsetry1=["Corsetry"];

var hosiery1=["Hosiery",
"Socks",
"Tights",
"Stockings"];

var lingerieAccessories1=["Lingerie Accessories"];
var loungeWear1 =["Loungewear"];
var robes1=["Robes",
"Short Robes",
"Long Robes"];

var shapeWear1=["Shapewear",
"Bodysuits",
"Briefs and Shorts",
"Slips",
"Tops"];

var sleepWear1=["Sleepwear",
"Camisoles and Chemises",
"Pajamas",
"Nightdresses",
"Playsuits"];

var suspenderBelts1=["Suspender Belts"];

var batHAndBody1 = ["Bath and Body",
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
"Supplements"];

var beautySets1=["Beauty Sets",
"Bath and Body",
"Haircare",
"Makeup",
"Nails",
"Skincare"];

var candles1=["Candles",
"Room Fragrance"];

var cosmeticCases1=["Cosmetics Cases"];

var fragrance1=["Fragrance",
"Discovery Sets",
"Travel and Refills"];

var haircare1=["Haircare",
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
"Brushes"];

var makeup1=["Makeup",
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
"Sets"];

var nails1=["Nails",
"Polish",
"Treatments",
"Tools",
"Removers"];

var sun1=["Sun"];

var skinCare1=["Skincare",
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
"Sunless Tanning"];

var toolsAndDevices1=["Tools and Devices",
"Face",
"Hair",
"Body"];

var wellness1=["Wellness"];

var allSportswear1 = ["All Sportswear",
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
"Tops"];

var apresSport1=["Après Sport,Apres Sport",
"Accessories",
"Jackets",
"Pants",
"Sneakers",
"Supplements",
"Sweatshirts",
"Tops"];

var equestrian1=["Equestrian"];

var gymAndCrossTrain1=["Gym and Cross Train",
"Jackets",
"Leggings",
"Shorts",
"Sneakers",
"Sports Bras",
"Tops"];

var outdoor1=["Outdoor"];
var run1=["Run",
"Accessories",
"Jackets",
"Leggings",
"Shorts",
"Sneakers",
"Sports Bras",
"Tops"];

var ski1=["Ski",
"Accessories",
"Baselayer",
"Boots",
"Leggings",
"Outerwear",
"Pants"];

var swimAndSurf1=["Swim and Surf",
"Coverups",
"Rashguards",
"Swimwear"];

var tennis1=["Tennis",
"Accessories",
"Dresses",
"Jackets and Vests",
"Skirts",
"Sneakers",
"Sports Bras",
"Tops"];

var yogaAndDance1=["Yoga and Dance",
"Accessories",
"Leggings",
"Leotards",
"Pants",
"Shoes",
"Shorts",
"Sports Bras",
"Tops",
"Yoga Mats"];

var forADate1 = ["For a date",
"Accessories",
"Clothing"];

var forTheWeekend1=["For the weekend",
"Clothing",
"Accessories"];
var forWork1=["For work",
"Clothing",
"Accessories"];

var coatsandjackets1 = ["Coats and Jackets"];
var sweaterandknits1 = ["Sweaters and Knits"];
var pantsAndSkirts1 = ["Pants and Skirts"];
var footwear1 = ["Footwear"];
var skiandSnow1 = ["Ski and Snow"];
var cashmere1 = ["Cashmere"];
var winterAccessories1 = ["Winter Accessories"];
var winterBeauty1 = ["Winter Beauty"];

var beachgetaway1 = ["Beach Getaway",
"Accessories",
"Sandals",
"Coverups",
"Swimwear"];

var skiChic1=["Ski Chic"];
var inFlight1=["In Flight",
"Accessories",
"Clothing"];
var BeautyEssentials1=["Beauty Essentials"];

var under1501=["Under 150"];
var under2501=["Under 250"];
var over5001=["Over 500"];
var bagsandwallets=["Bags and Wallets",
"Bags",
"Wallets"];

var beautyandFragrance1=["Beauty and Fragrance"];
var cantgowrong1=["Can't Go Wrong,Cant Go Wrong"];
var casmeregifts=["Cashmere Gifts"];
var exclusivesandgiftboxes=["Exclusives and Gift Boxes"];
var forthehome=["For the Home"];
var lingerieandsleepwear=["Lingerie and Sleepwear"];
var travelgifts=["Travel Gifts"];
var watchesandjewelry=["Watches and Jewelry"];

//================================================


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
  var brandName = finalValue;
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
if (finalEntity == "product_sort")
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


if (finalEntity=="product_colour")
{
  var colourName = finalValue;
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

     //console.log("The colour id is "+ColourId+"\n");  

}

//======================Get the ID the category(ies)=========================================
  
if (finalEntity=="product_category") 
{
  var categoryName = finalValue;
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
  var category_typeName = finalValue;
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
  var category_type_specificName = finalValue;
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
      finalCategoryId = categoryId;
      finalLayer = 2;
      
     }
     
     else {
      finalCategoryId = categoryId;
       finalLayer = 1;
      


     };
     //console.log("the final id of the category is "+ finalCategoryId+"\n");
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
       finalLayer = 1;
      

     }
     
     else {finalCategoryId = categoryId;
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
      finalLayer = 2;
     
     }
     
     else {finalCategoryId = category_typeId;
      finalLayer = 3;
      
     
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
       finalLayer = 1;
      
      //console.log("the final id of the category is "+ finalCategoryId+"\n");
     }

     else if (counter2 == 1)
     {
         finalCategoryId = category_type_specificId;
          finalLayer = 2;
      
         //console.log("the final id of the category is "+ finalCategoryId+"\n");
     }

     else if (counter3 == 1)
     {
           finalCategoryId = category_type_specificId
            finalLayer = 1;
      
          // console.log("the final id of the category is "+ finalCategoryId+"\n");

     }
     
     else {finalCategoryId = category_type_specificId;
       finalLayer = 3;
      
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

else {};

//======================================Define the father category==========================

//console.log("the final category is "+finalCategoryId);



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
                                //console.log("the final Category name is  "+ finalName+"\n");
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







urlView[0]="navlevel3";
urlView[1]="designerfilter";
urlView[2]="colourfilter";
urlView[3]="sizefilter";
urlView[4]="sortorder";


urlViewValue[0]=category_type_specificName;
urlViewValue[1]=BrandId;
urlViewValue[2]=ColourId;
urlViewValue[3]=size;
urlViewValue[4]=sort;

for (var i=0; i<5; i++)
{
  if (urlViewValue[i])
  {

     urlViewFinal.push(urlView[i], urlViewValue[i]);
  }
}

//console.log(urlViewFinal);



//==========================Craft the Url used in the API call==================================

var url ="http://api.net-a-porter.com:80/NAP/GB/300/0/pids?";
for (var i=0; i<urlArrFinal.length; i++)
{
  if (i==0)
    {var url = url +urlArrFinal[i]+"="+urlArrFinal[i+1];}
  else 
{var url = url + "&"+urlArrFinal[i]+"="+urlArrFinal[i+1];}
i=i+1;
}
var url = url + "&visibility=visible"
console.log(url);

//===================================find the father category==========================================
//console.log("the final layer is "+finalLayer);



if (finalLayer ==1)
{
   var fatherCategoryUrl = categoryName;
   //console.log("the father category is "+fatherCategoryUrl);
}

if (finalLayer==2)
{
   var compteur =0;

  for (var i=0;i<clothing.length; i++)
  {
    if (category_typeName == clothing[i])
    {
      fatherCategoryUrl = "Clothing";
      compteur = compteur +1; 
    }
  }


if (compteur==0)
{
  for (var i=0;i<shoes.length; i++)
  {
    if (category_typeName == shoes[i])
    {
      fatherCategoryUrl = "Shoes";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{
  for (var i=0;i<bags.length; i++)
  {
    if (category_typeName == bags[i])
    {
      fatherCategoryUrl = "Bags";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{
  for (var i=0;i<accessories.length; i++)
  {
    if (category_typeName == accessories[i])
    {
      fatherCategoryUrl = "Accessories";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{

  for (var i=0;i<lingerie.length; i++)
  {
    if (category_typeName == lingerie[i])
    {
      fatherCategoryUrl = "Lingerie";
      compteur = compteur +1;
    }
  }

}

if (compteur==0)
{

  for (var i=0;i<beauty.length; i++)
  {
    if (category_typeName == beauty[i])
    {
      fatherCategoryUrl = "Beauty";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{

  for (var i=0;i<sport.length; i++)
  {
    if (category_typeName == sport[i])
    {
      fatherCategoryUrl = "Sport";
      compteur = compteur +1;
    }
  }

}

if (compteur==0)
{

for (var i=0;i<vacationShop.length; i++)
  {
    if (category_typeName == vacationShop[i])
    {
      fatherCategoryUrl = "Vacation Shop";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{


for (var i=0;i<whatToWear.length; i++)
  {
    if (category_typeName == whatToWear[i])
    {
      fatherCategoryUrl = "What to Wear";
      compteur = compteur +1;
    }
  }

}


if (compteur==0)
{

for (var i=0;i<winterShop.length; i++)
  {
    if (category_typeName == winterShop[i])
    {
      fatherCategoryUrl = "Winter Shop";
      compteur = compteur +1;
    }
  }
}

//console.log("the father category is "+fatherCategoryUrl);

}

if (finalLayer == 3)
{
  var compteur =0;

  for (var i=0;i<clothing.length; i++)
  {
    if (category_type_specificName == clothing[i])
    {
      fatherCategoryUrl = "Clothing";
      compteur = compteur +1; 
    }
  }


if (compteur==0)
{
  for (var i=0;i<shoes.length; i++)
  {
    if (category_type_specificName == shoes[i])
    {
      fatherCategoryUrl = "Shoes";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{
  for (var i=0;i<bags.length; i++)
  {
    if (category_type_specificName == bags[i])
    {
      fatherCategoryUrl = "Bags";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{
  for (var i=0;i<accessories.length; i++)
  {
    if (category_type_specificName == accessories[i])
    {
      fatherCategoryUrl = "Accessories";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{

  for (var i=0;i<lingerie.length; i++)
  {
    if (category_type_specificName == lingerie[i])
    {
      fatherCategoryUrl = "Lingerie";
      compteur = compteur +1;
    }
  }

}

if (compteur==0)
{

  for (var i=0;i<beauty.length; i++)
  {
    if (category_type_specificName == beauty[i])
    {
      fatherCategoryUrl = "Beauty";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{

  for (var i=0;i<sport.length; i++)
  {
    if (category_type_specificName == sport[i])
    {
      fatherCategoryUrl = "Sport";
      compteur = compteur +1;
    }
  }

}

if (compteur==0)
{

for (var i=0;i<vacationShop.length; i++)
  {
    if (category_type_specificName == vacationShop[i])
    {
      fatherCategoryUrl = "Vacation Shop";
      compteur = compteur +1;
    }
  }
}

if (compteur==0)
{


for (var i=0;i<whatToWear.length; i++)
  {
    if (category_type_specificName == whatToWear[i])
    {
      fatherCategoryUrl = "What to Wear";
      compteur = compteur +1;
    }
  }

}


if (compteur==0)
{

for (var i=0;i<winterShop.length; i++)
  {
    if (category_type_specificName == winterShop[i])
    {
      fatherCategoryUrl = "Winter Shop";
      compteur = compteur +1;
    }
  }
}

//console.log("the father category is "+fatherCategoryUrl);

}
//==============================Find the second father category=========================================

if (finalLayer==1)
{
secondFather="";
}
if (finalLayer==2)
{
  secondFather="";
}
if (finalLayer==3)
{

//=============================if clothing=========================================

if (fatherCategoryUrl=="Clothing")
{
  var compteur =0;

  for (var i=0; i<beachwear1.length; i++)
  {
    if (category_type_specificName==beachwear1[i])
    {
       secondFather=beachwear1[0];
       compteur=compteur+1;
    }

  }





if (compteur==0){
  for (var i=0; i<dresses1.length; i++)
  {
    if (category_type_specificName==dresses1[i])
    {
       secondFather=dresses1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<evening1.length; i++)
  {
    if (category_type_specificName==evening1[i])
    {
       secondFather=evening1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<jackets1.length; i++)
  {
    if (category_type_specificName==jackets1[i])
    {
       secondFather=jackets1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<jeans1.length; i++)
  {
    if (category_type_specificName==jeans1[i])
    {
       secondFather=jeans1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<jumpsuits1.length; i++)
  {
    if (category_type_specificName==jumpsuits1[i])
    {
       secondFather=jumpsuits1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<knitwear1.length; i++)
  {
    if (category_type_specificName==knitwear1[i])
    {
       secondFather=knitwear1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<pants1.length; i++)
  {
    if (category_type_specificName==pants1[i])
    {
       secondFather=pants1[0];
       compteur=compteur+1;
    }

  }
  }

if (compteur==0){
  for (var i=0; i<shorts1.length; i++)
  {
    if (category_type_specificName==shorts1[i])
    {
       secondFather=shorts1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<skrits1.length; i++)
  {
    if (category_type_specificName==skrits1[i])
    {
       secondFather=skrits1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<suits1.length; i++)
  {
    if (category_type_specificName==suits1[i])
    {
       secondFather=suits1[0];
       compteur=compteur+1;
    }

  }
  }

  if (compteur==0){
  for (var i=0; i<bridal1.length; i++)
  {
    if (category_type_specificName==bridal1[i])
    {
       secondFather=bridal1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<coats1.length; i++)
  {
    if (category_type_specificName==coats1[i])
    {
       secondFather=coats1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<denim1.length; i++)
  {
    if (category_type_specificName==denim1[i])
    {
       secondFather=denim1[0];
       compteur=compteur+1;
    }

  }
  }

  if (compteur==0){
  for (var i=0; i<tops1.length; i++)
  {
    if (category_type_specificName==tops1[i])
    {
       secondFather=tops1[0];
       compteur=compteur+1;
    }

  }
  }
}




if (fatherCategoryUrl=="Shoes")
{
  var compteur=0;

for (var i=0; i<boots1.length; i++)
  {
    if (category_type_specificName==boots1[i])
    {
       secondFather=boots1[0];
       compteur=compteur+1;
    }

  }


if (compteur==0){
  for (var i=0; i<blockHeels1.length; i++)
  {
    if (category_type_specificName==blockHeels1[i])
    {
       secondFather=blockHeels1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<eveningShoes1.length; i++)
  {
    if (category_type_specificName==eveningShoes1[i])
    {
       secondFather=eveningShoes1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<espadrilles1.length; i++)
  {
    if (category_type_specificName==espadrilles1[i])
    {
       secondFather=espadrilles1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<flatforms1.length; i++)
  {
    if (category_type_specificName==flatforms1[i])
    {
       secondFather=flatforms1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<flatShoes1.length; i++)
  {
    if (category_type_specificName==flatShoes1[i])
    {
       secondFather=flatShoes1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<pumps1.length; i++)
  {
    if (category_type_specificName==pumps1[i])
    {
       secondFather=pumps1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<sandals1.length; i++)
  {
    if (category_type_specificName==sandals1[i])
    {
       secondFather=sandals1[0];
       compteur=compteur+1;
    }

  }
  }


if (compteur==0){
  for (var i=0; i<sneakers1.length; i++)
  {
    if (category_type_specificName==sneakers1[i])
    {
       secondFather=sneakers1[0];
       compteur=compteur+1;
    }

  }
  }



}

if (fatherCategoryUrl== "Bags")
{

var compteur =0;

  for (var i=0; i<backPacks1.length; i++)
  {
    if (category_type_specificName==backPacks1[i])
    {
       secondFather=backPacks1[0];
       compteur=compteur+1;
    }

  }


if (compteur==0){
  for (var i=0; i<clutchBags1.length; i++)
  {
    if (category_type_specificName==clutchBags1[i])
    {
       secondFather=clutchBags1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<eveningBags1.length; i++)
  {
    if (category_type_specificName==eveningBags1[i])
    {
       secondFather=eveningBags1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<miniBags1.length; i++)
  {
    if (category_type_specificName==miniBags1[i])
    {
       secondFather=miniBags1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<shoulderBags1.length; i++)
  {
    if (category_type_specificName==shoulderBags1[i])
    {
       secondFather=shoulderBags1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<topHandled1.length; i++)
  {
    if (category_type_specificName==topHandled1[i])
    {
       secondFather=topHandled1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<toteBags1.length; i++)
  {
    if (category_type_specificName==toteBags1[i])
    {
       secondFather=toteBags1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<bagAccessories1.length; i++)
  {
    if (category_type_specificName==bagAccessories1[i])
    {
       secondFather=bagAccessories1[0];
       compteur=compteur+1;
    }

  }
}



}

if (fatherCategoryUrl == "Accessories")
{

var compteur =0;

  for (var i=0; i<jewelryAndWatches1.length; i++)
  {
    if (category_type_specificName==jewelryAndWatches1[i])
    {
       secondFather=jewelryAndWatches1[0];
       compteur=compteur+1;
    }

  }


if (compteur==0){
  for (var i=0; i<fineWatches.length; i++)
  {
    if (category_type_specificName==fineWatches[i])
    {
       secondFather=fineWatches[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<beachAccessories1.length; i++)
  {
    if (category_type_specificName==beachAccessories1[i])
    {
       secondFather=beachAccessories1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<beatuyCases1.length; i++)
  {
    if (category_type_specificName==beatuyCases1[i])
    {
       secondFather=beatuyCases1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<bridalAccessories1.length; i++)
  {
    if (category_type_specificName==bridalAccessories1[i])
    {
       secondFather=bridalAccessories1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<belts1.length; i++)
  {
    if (category_type_specificName==belts1[i])
    {
       secondFather=belts1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<books1.length; i++)
  {
    if (category_type_specificName==books1[i])
    {
       secondFather=books1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<clothingPatches1.length; i++)
  {
    if (category_type_specificName==clothingPatches1[i])
    {
       secondFather=clothingPatches1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<fineJewelry1.length; i++)
  {
    if (category_type_specificName==fineJewelry1[i])
    {
       secondFather=fineJewelry1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<hairAccessroies1.length; i++)
  {
    if (category_type_specificName==hairAccessroies1[i])
    {
       secondFather=hairAccessroies1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<hats1.length; i++)
  {
    if (category_type_specificName==hats1[i])
    {
       secondFather=hats1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<homewar1.length; i++)
  {
    if (category_type_specificName==homewar1[i])
    {
       secondFather=homewar1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<jewelry1.length; i++)
  {
    if (category_type_specificName==jewelry1[i])
    {
       secondFather=jewelry1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<keychains1.length; i++)
  {
    if (category_type_specificName==keychains1[i])
    {
       secondFather=keychains1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<opticals1.length; i++)
  {
    if (category_type_specificName==opticals1[i])
    {
       secondFather=opticals1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<porterMagazine1.length; i++)
  {
    if (category_type_specificName==porterMagazine1[i])
    {
       secondFather=porterMagazine1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<pouches1.length; i++)
  {
    if (category_type_specificName==pouches1[i])
    {
       secondFather=pouches1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<scarves1.length; i++)
  {
    if (category_type_specificName==scarves1[i])
    {
       secondFather=scarves1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<stationery1.length; i++)
  {
    if (category_type_specificName==stationery1[i])
    {
       secondFather=stationery1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<sunglasses1.length; i++)
  {
    if (category_type_specificName==sunglasses1[i])
    {
       secondFather=sunglasses1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<technology1.length; i++)
  {
    if (category_type_specificName==technology1[i])
    {
       secondFather=technology1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<travel1.length; i++)
  {
    if (category_type_specificName==travel1[i])
    {
       secondFather=travel1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<umbrellas1.length; i++)
  {
    if (category_type_specificName==umbrellas1[i])
    {
       secondFather=umbrellas1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<wallets1.length; i++)
  {
    if (category_type_specificName==wallets1[i])
    {
       secondFather=wallets1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<watches1.length; i++)
  {
    if (category_type_specificName==watches1[i])
    {
       secondFather=watches1[0];
       compteur=compteur+1;
    }

  }
}





}

if (fatherCategoryUrl == "Lingerie")
{

var compteur =0;

  for (var i=0; i<bodysuits1.length; i++)
  {
    if (category_type_specificName==bodysuits1[i])
    {
       secondFather=bodysuits1[0];
       compteur=compteur+1;
    }

  }


if (compteur==0){
  for (var i=0; i<bras1.length; i++)
  {
    if (category_type_specificName==bras1[i])
    {
       secondFather=bras1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<bridalLingerie1.length; i++)
  {
    if (category_type_specificName==bridalLingerie1[i])
    {
       secondFather=bridalLingerie1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<briefs1.length; i++)
  {
    if (category_type_specificName==briefs1[i])
    {
       secondFather=briefs1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<camisolesAndChemises1.length; i++)
  {
    if (category_type_specificName==camisolesAndChemises1[i])
    {
       secondFather=camisolesAndChemises1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<corsetry1.length; i++)
  {
    if (category_type_specificName==corsetry1[i])
    {
       secondFather=corsetry1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<lingerieAccessories1.length; i++)
  {
    if (category_type_specificName==lingerieAccessories1[i])
    {
       secondFather=lingerieAccessories1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<loungeWear1.length; i++)
  {
    if (category_type_specificName==loungeWear1[i])
    {
       secondFather=loungeWear1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<robes1.length; i++)
  {
    if (category_type_specificName==robes1[i])
    {
       secondFather=robes1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<shapeWear1.length; i++)
  {
    if (category_type_specificName==shapeWear1[i])
    {
       secondFather=shapeWear1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<sleepWear1.length; i++)
  {
    if (category_type_specificName==sleepWear1[i])
    {
       secondFather=sleepWear1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<suspenderBelts1.length; i++)
  {
    if (category_type_specificName==suspenderBelts1[i])
    {
       secondFather=suspenderBelts1[0];
       compteur=compteur+1;
    }

  }
}


}

if (fatherCategoryUrl == "Beauty")
{
var compteur =0;

  for (var i=0; i<batHAndBody1.length; i++)
  {
    if (category_type_specificName==batHAndBody1[i])
    {
       secondFather=batHAndBody1[0];
       compteur=compteur+1;
    }

  }


if (compteur==0){
  for (var i=0; i<beautySets1.length; i++)
  {
    if (category_type_specificName==beautySets1[i])
    {
       secondFather=beautySets1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<candles1.length; i++)
  {
    if (category_type_specificName==candles1[i])
    {
       secondFather=candles1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<cosmeticCases1.length; i++)
  {
    if (category_type_specificName==cosmeticCases1[i])
    {
       secondFather=cosmeticCases1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<fragrance1.length; i++)
  {
    if (category_type_specificName==fragrance1[i])
    {
       secondFather=fragrance1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<haircare1.length; i++)
  {
    if (category_type_specificName==haircare1[i])
    {
       secondFather=haircare1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<makeup1.length; i++)
  {
    if (category_type_specificName==makeup1[i])
    {
       secondFather=makeup1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<nails1.length; i++)
  {
    if (category_type_specificName==nails1[i])
    {
       secondFather=nails1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<sun1.length; i++)
  {
    if (category_type_specificName==sun1[i])
    {
       secondFather=sun1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<skinCare1.length; i++)
  {
    if (category_type_specificName==skinCare1[i])
    {
       secondFather=skinCare1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<toolsAndDevices1.length; i++)
  {
    if (category_type_specificName==toolsAndDevices1[i])
    {
       secondFather=toolsAndDevices1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<wellness1.length; i++)
  {
    if (category_type_specificName==wellness1[i])
    {
       secondFather=wellness1[0];
       compteur=compteur+1;
    }

  }
}

}

if (fatherCategoryUrl == "Sport")
{
var compteur =0;

  for (var i=0; i<allSportswear1.length; i++)
  {
    if (category_type_specificName==allSportswear1[i])
    {
       secondFather=allSportswear1[0];
       compteur=compteur+1;
    }

  }


if (compteur==0){
  for (var i=0; i<apresSport1.length; i++)
  {
    if (category_type_specificName==apresSport1[i])
    {
       secondFather=apresSport1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<equestrian1.length; i++)
  {
    if (category_type_specificName==equestrian1[i])
    {
       secondFather=equestrian1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<gymAndCrossTrain1.length; i++)
  {
    if (category_type_specificName==gymAndCrossTrain1[i])
    {
       secondFather=gymAndCrossTrain1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<outdoor1.length; i++)
  {
    if (category_type_specificName==outdoor1[i])
    {
       secondFather=outdoor1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<run1.length; i++)
  {
    if (category_type_specificName==run1[i])
    {
       secondFather=run1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<ski1.length; i++)
  {
    if (category_type_specificName==ski1[i])
    {
       secondFather=ski1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<swimAndSurf1.length; i++)
  {
    if (category_type_specificName==swimAndSurf1[i])
    {
       secondFather=swimAndSurf1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<tennis1.length; i++)
  {
    if (category_type_specificName==tennis1[i])
    {
       secondFather=tennis1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<yogaAndDance1.length; i++)
  {
    if (category_type_specificName==yogaAndDance1[i])
    {
       secondFather=yogaAndDance1[0];
       compteur=compteur+1;
    }

  }
}


}

if (fatherCategoryUrl == "What to Wear")
{
var compteur =0;

  for (var i=0; i<forADate1.length; i++)
  {
    if (category_type_specificName==forADate1[i])
    {
       secondFather=forADate1[0];
       compteur=compteur+1;
    }

  }


if (compteur==0){
  for (var i=0; i<forTheWeekend1.length; i++)
  {
    if (category_type_specificName==forTheWeekend1[i])
    {
       secondFather=forTheWeekend1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<forWork1.length; i++)
  {
    if (category_type_specificName==forWork1[i])
    {
       secondFather=forWork1[0];
       compteur=compteur+1;
    }

  }
}

}

if (fatherCategoryUrl == "Winter Shop")
{
var compteur =0;

  for (var i=0; i<coatsandjackets1.length; i++)
  {
    if (category_type_specificName==coatsandjackets1[i])
    {
       secondFather=coatsandjackets1[0];
       compteur=compteur+1;
    }

  }


if (compteur==0){
  for (var i=0; i<sweaterandknits1.length; i++)
  {
    if (category_type_specificName==sweaterandknits1[i])
    {
       secondFather=sweaterandknits1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<pantsAndSkirts1.length; i++)
  {
    if (category_type_specificName==pantsAndSkirts1[i])
    {
       secondFather=pantsAndSkirts1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<footwear1.length; i++)
  {
    if (category_type_specificName==footwear1[i])
    {
       secondFather=footwear1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<skiandSnow1.length; i++)
  {
    if (category_type_specificName==skiandSnow1[i])
    {
       secondFather=skiandSnow1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<cashmere1.length; i++)
  {
    if (category_type_specificName==cashmere1[i])
    {
       secondFather=cashmere1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<winterAccessories1.length; i++)
  {
    if (category_type_specificName==winterAccessories1[i])
    {
       secondFather=winterAccessories1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<winterBeauty1.length; i++)
  {
    if (category_type_specificName==winterBeauty1[i])
    {
       secondFather=winterBeauty1[0];
       compteur=compteur+1;
    }

  }
}


}

if (fatherCategoryUrl == "Vacation Shop")
{
var compteur =0;

  for (var i=0; i<beachgetaway1.length; i++)
  {
    if (category_type_specificName==beachgetaway1[i])
    {
       secondFather=beachgetaway1[0];
       compteur=compteur+1;
    }

  }


if (compteur==0){
  for (var i=0; i<skiChic1.length; i++)
  {
    if (category_type_specificName==skiChic1[i])
    {
       secondFather=skiChic1[0];
       compteur=compteur+1;
    }

  }
}

if (compteur==0){
  for (var i=0; i<inFlight1.length; i++)
  {
    if (category_type_specificName==inFlight1[i])
    {
       secondFather=inFlight1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<beautyEssentials1.length; i++)
  {
    if (category_type_specificName==beautyEssentials1[i])
    {
       secondFather=beautyEssentials1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<under1501.length; i++)
  {
    if (category_type_specificName==under1501[i])
    {
       secondFather=under1501[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<under2501.length; i++)
  {
    if (category_type_specificName==under2501[i])
    {
       secondFather=under2501[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<over5001.length; i++)
  {
    if (category_type_specificName==over5001[i])
    {
       secondFather=over5001[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<bagsandwallets.length; i++)
  {
    if (category_type_specificName==bagsandwallets[i])
    {
       secondFather=bagsandwallets[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<beautyandFragrance1.length; i++)
  {
    if (category_type_specificName==beautyandFragrance1[i])
    {
       secondFather=beautyandFragrance1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<cantgowrong1.length; i++)
  {
    if (category_type_specificName==cantgowrong1[i])
    {
       secondFather=cantgowrong1[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<casmeregifts.length; i++)
  {
    if (category_type_specificName==casmeregifts[i])
    {
       secondFather=casmeregifts[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<exclusivesandgiftboxes.length; i++)
  {
    if (category_type_specificName==exclusivesandgiftboxes[i])
    {
       secondFather=exclusivesandgiftboxes[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<forthehome.length; i++)
  {
    if (category_type_specificName==forthehome[i])
    {
       secondFather=forthehome[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<lingerieandsleepwear.length; i++)
  {
    if (category_type_specificName==lingerieandsleepwear[i])
    {
       secondFather=lingerieandsleepwear[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<travelgifts.length; i++)
  {
    if (category_type_specificName==travelgifts[i])
    {
       secondFather=travelgifts[0];
       compteur=compteur+1;
    }

  }
}


if (compteur==0){
  for (var i=0; i<watchesandjewelry.length; i++)
  {
    if (category_type_specificName==watchesandjewelry[i])
    {
       secondFather=watchesandjewelry[0];
       compteur=compteur+1;
    }

  }
}




}

}


//console.log("the second father is "+secondFather);

//============================Craft the ViewAll url==============================================

var viewAllurl = "";



if (category_type_specificId)
{
  var view = "https://www.net-a-porter.com/gb/en/d/shop/"+fatherCategoryUrl+"/"+secondFather+"?";
}

if (category_typeId && ! category_type_specificId)
{
  var view = "https://www.net-a-porter.com/gb/en/d/shop/"+fatherCategoryUrl+"/"+category_typeName+"?";
}

if (categoryId && !category_typeId && ! category_type_specificId)
{
  var view = "https://www.net-a-porter.com/gb/en/d/shop/"+categoryName+"?";

}



if (categoryId || category_typeId || category_type_specificId )
{
   for (var i=0; i<urlViewFinal.length; i++)
   {
    if (i==0)
    {

         view = view +urlViewFinal[i]+"="+urlViewFinal[i+1];
         viewAllurl = view
        
    }

   else {
         viewAllurl = viewAllurl + "&"+urlViewFinal[i]+"="+urlViewFinal[i+1];
       }
      
   i=i+1;
}


   }

else {


if (ColourId && BrandId)
{
  var view = "https://www.net-a-porter.com/gb/en/Shop/";
  viewAllurl = view+"Designers/"+brandName+"?colourFilter="+colourName;
}




}

console.log(viewAllurl);



//=================================Execute API calls=======================

console.log("\n"+"■━━━━━■");
console.log("Results")
console.log("■━━━━━■"+"\n");

var file = 'finalResult.json';
  fs.truncate(file,0, function(err) {
  
})

var urlCall = url;  
               
client.get(url, function (data, response) { 
var list = data.pids;
console.log("the number of results is: "+list.length);
//=========================If the answer s empty======================
if (list.length==0)
{
  var obj = {
  

  "viewAllurl": {
    "url": ""
  },

  "products": []
}
  var file = 'finalResult.json';
  jsonfile.writeFileSync(file, obj,{flag: 'a'}, function(err) {
});

}
//=======================otherwise============================================
else 
{

  if (list.length <10)
{
  var limit =list.length;
}
else 
{
  var limit =10;
}
var obj = {
  

  "viewAllurl": {
    "url": ""
  },

  "products": []
}

for (var i=0; i<limit; i++)
{

var infoUrl = "http://api.net-a-porter.com:80/NAP/GB/en/summarise/"+list[i];

client.get(infoUrl, function (data, response) { 

  

  obj.viewAllurl.url = viewAllurl;
 var pictureUrl = "cache.net-a-porter.com/images/products/"+ data.id+"/"+data.id +"_in_l.jpg";
  data.images.urlTemplate = pictureUrl;
  
  var a =1;
  i=i-a;
  a=a-1;
  obj.products[9-i]= data;
  file = 'finalResult.json';
  jsonfile.writeFileSync(file, obj, function(err) {
});
  


  
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
   
