import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class RutasOptimasType {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    secuencia: string;

    @Field(() => Float)
    distancia: number;

    @Field(() => String)
    distribucionId: string;
}
