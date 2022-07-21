import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@ObjectType()
export class Coffee {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  _id: string;

  @Column()
  @Field(() => String)
  menu: string;

  @Column()
  @Field(() => String)
  price: string;

  @Column()
  @Field(() => String)
  kcal: string;

  @Column()
  @Field(() => String)
  saturated_fat: string;

  @Column()
  @Field(() => String)
  protein: string;

  @Column()
  @Field(() => String)
  salt: string;

  @Column()
  @Field(() => String)
  sugar: string;

  @Column()
  @Field(() => String)
  caffeine: string;
}
