import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AwardType } from 'src/enums/award-type.enum';

@Entity({ name: 'awards' })
export class Award {
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column()
    AwardName: string;

    @Column()
    AwardImage: string;

    @Column()
    Point: number;

    @Column({
        type: 'enum',
        enum: AwardType,
    })
    AwardType: AwardType;

    @Column()
    CreatedAt: number;
}
