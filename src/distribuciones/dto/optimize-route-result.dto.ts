import { Field, ObjectType, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class OptimizeRouteResult {
  @Field()
  mensaje: string;

  @Field(() => [OptimizeRouteCluster])
  resultado: OptimizeRouteCluster[];
}

@ObjectType()
export class OptimizeRouteCluster {
  @Field(() => Int)
  cluster: number;

  @Field(() => [String])
  secuencia: string[];

  @Field(() => Float)
  distancia: number;
}
