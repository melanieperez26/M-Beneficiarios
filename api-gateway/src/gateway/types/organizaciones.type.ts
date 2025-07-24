import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class OrganizacionesType {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    nombre: string;

    @Field(() => Float, { nullable: true })
    lat: number;

    @Field(() => Float, { nullable: true })
    lng: number;

    @Field(() => Int)
    capacidad: number;

    @Field(() => ID)
    usuarioId: string;
}
