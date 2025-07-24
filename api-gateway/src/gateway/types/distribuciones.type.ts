import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class DistribucionesType {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    organizacionId: string;

    @Field(() => String)
    donanteId: string;

    @Field(() => Float, { nullable: true })
    cantidad: number;

    @Field(() => [String])
    productos: string[];
}
