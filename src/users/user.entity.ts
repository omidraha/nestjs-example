import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column()
  givenName: string;

  @Column()
  familyName: string;

  @Column()
  email: string;

  @Column()
  department: string;

  @Column()
  employeeNumber: string;
}
