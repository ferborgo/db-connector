import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tweet } from "./Tweet";
import { User } from "./User";

@Entity({ name: 'responses' })
export class Response {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public content: string

    @Column()
    public tweetId!: string

    @Column()
    public userId!: string

    @Column({ default: Date.now().toString() })
    public created_at?: string

    @ManyToOne(() => Tweet, (tweet) => tweet.like)
    public tweet!: Tweet

    @ManyToOne(() => User, (user) => user.like)
    public user!: User
}