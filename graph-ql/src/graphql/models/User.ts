import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PrimaryGeneratedColumn } from "typeorm";
import { UserSetting } from "./UserSetting";

@ObjectType()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    username:string;

    @Field()
    email:string;

    @Field()
    password:string

    @Field({nullable:true})
    settings?:UserSetting
}