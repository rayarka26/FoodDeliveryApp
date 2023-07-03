const mongoose = require('mongoose');

const mongourl = 'mongodb+srv://rayarka26:sarmilaray@cluster0.5phitsv.mongodb.net/GoFood?retryWrites=true&w=majority';
// const mongourl = 'mongodb+srv://rayarka26:sarmilaray@cluster0.5phitsv.mongodb.net/GoFood??retryWrites=true&w=majority'
const mongoDB = async () => {
    try {
      await mongoose.connect(mongourl);
      console.log('Connected!');
      const fetched_data = await mongoose.connection.db.collection("fooditems");
       fetched_data.find({}).toArray(async function(err,data){
        const foodcategory = await mongoose.connection.db.collection("foodcategory");
        foodcategory.find({}).toArray(function(err,catData){
          if(err) console.log(err);
          else {global.fooditems = data;
          global.foodcategory = catData;}
        })
      })
        // const foodcategory = await mongoose.connection.db.collection("foodcategory");
                                                                        //  foodcategory

        // const Catdata = foodcategory.find({}).toArray();
            // global.fooditems = data;
            // global.foodcategory = Catdata;
      // global.fooditems = data;
      // console.log(global.fooditems);
    } catch (error) {
      console.log('err: ', error);
    }
  };


module.exports = mongoDB;