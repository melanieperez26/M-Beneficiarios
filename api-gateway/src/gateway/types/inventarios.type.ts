import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class InventariosType {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    organizacionId: string;

    @Field(() => String)
    producto: string;

    @Field(() => Float, { nullable: true })
    cantidad: number;

    @Field(() => String, { nullable: true })
    ultimoAbastecimiento: string;
}