import {Model} from 'sequelize'
export abstract class BaseModel extends Model {
    static setRelations: Function

    abstract build(sequelize: any): void
}