import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class BoardListInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  position?: number

  @Field({ nullable: true })
  boardId?: string

}
