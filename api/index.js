//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Diet, Recipe } = require('./src/models/Diet.js');

const createTable = function(db, name){
    const newDiet = db.create({
        name: name
    })
    return newDiet;
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3002, () => {
    createTable(conn.models.Diet, "vegetarian");
    createTable(conn.models.Diet, "vegan");
    createTable(conn.models.Diet, "glutenFree");
    console.log('%s listening at 3002'); // eslint-disable-line no-console
  });
});
