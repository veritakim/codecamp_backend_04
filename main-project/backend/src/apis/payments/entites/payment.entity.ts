import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entites/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column(() => String)
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  // @Column({ default: '신용카드' })
  // @Field(() => String)
  // paymentMethod: string;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  status: string;
}
