import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class UserCreateCalendarWeekdayInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  abbr?: string

  @Field({ nullable: true }) 
  label?: string

  @Field({ nullable: true }) 
  value?: string

}
