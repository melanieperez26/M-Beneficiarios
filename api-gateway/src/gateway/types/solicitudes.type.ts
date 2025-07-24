import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SolicitudesType {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    productos_necesitados: string;

    @Field(() => String)
    urgencia: string;

    @Field(() => ID)
    organizacionId: string;
}
