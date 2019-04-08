const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
    async createItem(parent, args, ctx, info){
        //TODO: check if logged in
        const item = await ctx.db.mutation.createItem({
            data:{
                ...args //spread all object properties
            }
        }, info); //info passes query so database can return the item after creating

        return item; //return item after promise resolved
    },
    updateItem(parent, args, ctx, info){
        //first take copy of the update
        const updates = {...args};
        //remove ID from updates, don't want to update the id ever
        delete updates.id;
        //run the update method
        //ctx is context of request, db is how to expose prisma db to ourselves, then either query or mutation, 
        //and then we have access to all mutations in generated file
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info);//info is how the update knows what to return, INFO will retain query
    },
    async deleteItem(parent, args, ctx, info){
        const where = {id: args.id};
        //1. find the item
        const item = await ctx.db.query.item({where}, `{id title}`); // passing raw graphql instead of info query from frontend
        //2. check if they own item or have permissions
        //TODO
        //3. delete it!
        return ctx.db.mutation.deleteItem({where}, info); //now we pass in query from frontend (in info parameter)
    },
    async signup(parent, args, ctx, info){
        args.email = args.email.toLowerCase();
        // hash their password
        const password = await bcrypt.hash(args.password, 10);
        //create user in DB
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: {set: ['USER']} //default permission, can edit as needed
            }
        }, info);
        //create JWT token and log in user
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        //set JWT as cookie on response, then every time click on pages cookie comes along
        ctx.response.cookie('token', token, {
            httpOnly: true, //cannot access token via JS
            maxAge: 1000 * 60 * 60 * 24 * 365, //1 year cookie
        });
        //finally return the user to the browser
        return user;
    }
};

module.exports = Mutations;
