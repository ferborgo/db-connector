import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Tweet } from "./Tweet";

@Entity({ name: 'pictures' })
export class Picture {
    
    @PrimaryColumn()
    id: string;

    @Column()
    url: string;

    @Column()   
    alt: string

    @ManyToOne(() => Tweet, (tweet) => tweet.pictures)
    tweet: Tweet
}