const {forwardTo} = require('prisma-binding');

const Query = {
    //this is where database calls go regardless of db backend (which is prisma)
    // async items(parent, args, ctx, info){
    //     const items = await ctx.db.query.items();
    //     return items;
    // }
    //use below if going to be exactly like strict db call
    //good to use when setting up, before needing to set up custom logic
    items: forwardTo('db'),
};

module.exports = Query;
