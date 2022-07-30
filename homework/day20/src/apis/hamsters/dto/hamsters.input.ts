import { InputType, OmitType } from '@nestjs/graphql';
import { Hamster } from '../entites/hamster.entity';

@InputType()
export class HastersInput extends OmitType(Hamster, ['id'], InputType) {}
