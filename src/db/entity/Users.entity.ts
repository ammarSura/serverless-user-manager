import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Users {
  @PrimaryGeneratedColumn("increment")
  userId: number

  @Column()
  phoneNumber: string
  

  @Column()
  fname: string

  @Column()
  lname: string
}
