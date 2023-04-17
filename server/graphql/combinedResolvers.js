import busResolvers from './coordinates/resolvers';
import coordinatesResolvers from './bus/resolvers';
import { dateScalarType } from './scalars';

export default [dateScalarType, busResolvers, coordinatesResolvers];
