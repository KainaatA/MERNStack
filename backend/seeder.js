import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'
import users from './data/user.js';
import products from './data/products.js';
import User from './models/instructorModel.js';


dotenv.config({path: './config.env'})

// const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
const DB = 'mongodb+srv://hamzaali:HVQRumv4BZ5Axf3Q@cluster0.vattp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true}).then((con)=>{
  console.log(con.connections);
  console.log('DB connection successful');
});


const destroyData = async () => {
    try {
       await Order.deleteMany();
       await Product.deleteMany();
       await User.deleteMany();


      await Product.insertMany(sampleProducts);
      console.log('Data Imported');

      process.exit();
    }

    catch (err){
    console.log(`${err}.red.inverse`);
    process.exit(1);
    }
}


const importData = async () => {
    try {
       await Order.deleteMany();
       await Product.deleteMany();
       await User.deleteMany();

      const createdUsers= await User.insertMany(users);

      const adminUser = createdUsers[0]._id;

      const sampleProducts = products.map((product)=> {
        return {...product, user: adminUser}
      })
      await Product.insertMany(sampleProducts);
      console.log('Data Imported'.green.inverse);

      process.exit();
    }

    catch (err){
    console.log(`${err}`.red.inverse);
    process.exit(1);
    }
};

// console.log(pr);
if(process.argv[2] === '-d'){
    destroyData()
} else {
    importData()
}

console.log(process.argv[1]);