import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Like } from "./Like";
import { Picture } from "./Picture";
import { User } from "./User";

@Entity({ name: 'tweets' })
export class Tweet {
    
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    content: string;

    @Column({
        default: Date.now().toString()
    })   
    created_at?: string

    @Column({
        default: 0
    })
    likes_count?: number

    @Column({
        default: 0
    })
    comments_count?: number

    @ManyToOne(() => User, (user) => user.tweets)
    user?: User

    @OneToMany(() => Picture, (picture) => picture.tweet)
    pictures?: Picture[]

    @OneToMany(() => Like, (like) => like.tweet)
    like?: Like;
}
