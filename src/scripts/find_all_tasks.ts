import Knex from 'knex'
import { Task } from '../db/models/task'
import { TasksRepository } from '../tasks/tasks.repository'
import dbconfig from '../db/knexfile'

const knexConnection = Knex(dbconfig)
Task.knex(knexConnection)
const taskRepo = new TasksRepository(Task)

taskRepo.findAll('1bf3b8ec-bdce-4276-99f6-41eaf3533d1d').then((data) => {
	console.log(data)
})
console.log("toto")
