import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tweet } from "./Tweet";
import { User } from "./User";

@Entity({ name: 'likes' })
export class Like {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public tweetId!: string

    @Column()
    public userId!: string

    @Column({default: Date.now().toString()})
    public created_at?: string

    @ManyToOne(() => Tweet, (tweet) => tweet.like)
    public tweet!: Tweet

    @ManyToOne(() => User, (user) => user.like)
    public user!: User
}