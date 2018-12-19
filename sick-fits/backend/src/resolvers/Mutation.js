const Mutations = {
    async createItem(parent, args, ctx, info){
        //TODO: check if logged in
        const item = await ctx.db.mutation.createItem({
            data:{
                ...args //spread all object properties
            }
        }, info); //info passes query so database can return the item after creating

        return item; //return item after promise resolved
    }
};

module.exports = Mutations;
