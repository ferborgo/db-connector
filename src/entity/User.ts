import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, PrimaryColumn, JoinTable, ManyToMany } from "typeorm"
import { Like } from "./Like"
import { Tweet } from "./Tweet"

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id?: string

    @Column()
    username: string

    @Column()
    screen_name: string

    @Column()
    biography: string

    @Column({
        default: Date.now().toString()
    })
    created_at?: string

    @OneToMany(() => Tweet, (tweet) => tweet.user, {cascade: true})
    tweets?: Tweet[]

    @OneToMany(() => Like, (like) => like.user, {cascade: true})
    like?: Like;
}
