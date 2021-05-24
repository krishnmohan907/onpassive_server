const { Model } = require('objection')
class Student extends Model {
    static get tableName() {
        return 'employee';
    }
    static get idColumn() {
        return 'Emp_id  '
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                Emp_id : { type: 'integer' },
                Full_name: { type: 'string' },
                job_Title: { type: 'string' },
                Departement: { type: 'string' },
                Location: { type: 'string' },
                Age: { type: 'Number' },
                Salary: { type: 'Number' },
            }
        }
    }
}
module.exports = Student