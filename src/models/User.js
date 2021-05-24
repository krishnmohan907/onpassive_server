const { Model } = require('objection')
class User extends Model {
    static get tableName() {
        return 'userregistration';
    }
    static get idColumn() {
        return 'user_id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' }
            }
        }
    }
}
module.exports = User