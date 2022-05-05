const mongoose = require("mongoose")


const pointSchema = new mongoose.Schema({
    timestamp:{
        type:Number
    },
    coords:{
        latitude:Number,
        longitude:Number,
        altitude:Number,
        accuracy:Number,
        heading:Number,
        speed:Number
        }
});

const trackSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        default:''
    },
    locations: [pointSchema]
})

mongoose.model('Track',trackSchema);


// {
//     "name":"Home to Office",
//     "locations":
//     [
//         {
//             "timestamp":12345,
//             "coords":{
//                 "latitude":1,
//                 "longitude":2,
//                 "altitude":3,
//                 "accuracy":4,
//                 "heading":5,
//                 "speed":6
//                 }
//         },
//          {
//             "timestamp":12345,
//             "coords":{
//                 "latitude":1,
//                 "longitude":2,
//                 "altitude":3,
//                 "accuracy":4,
//                 "heading":5,
//                 "speed":6
//                 }
//         }
//     ]
// }