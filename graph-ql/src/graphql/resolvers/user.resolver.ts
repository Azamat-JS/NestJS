import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { User } from "../models/User";
import { mockUsers } from "src/__mocks__/mockUsers";

@Resolver()
export class UserResolver {

    @Query(() => [User])
    getUser(){
        return mockUsers;
    }

    @Query((returns) => User, {nullable:true})
    getUserById(@Args('id', {type: () => Int}) id: number){
        return mockUsers.find(user => user.id === id);
}
}