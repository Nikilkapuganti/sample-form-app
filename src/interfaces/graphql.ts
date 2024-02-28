// graphqlSchema.ts
import { 
  GraphQLObjectType, 
  GraphQLSchema, 
  GraphQLList, 
  GraphQLNonNull, 
  GraphQLString, 
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';
import { TaskModel, Task } from './taskinterface';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    dueDate: { type: new GraphQLNonNull(GraphQLString) },
    assignee: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: async () => await TaskModel.find(),
    },
  },
});

const TaskInputType = new GraphQLInputObjectType({
  name: 'TaskInput',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    dueDate: { type: new GraphQLNonNull(GraphQLString) },
    assignee: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addTask: {
      type: TaskType,
      args: {
        taskInput: { type: TaskInputType },
      },
      resolve: async (_, { taskInput }) => {
        const task = new TaskModel(taskInput);
        const savedTask = await task.save();
        pubsub.publish('taskAdded', { taskAdded: savedTask });
        return savedTask;
      },
    },
    updateTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        taskInput: { type: TaskInputType },
      },
      resolve: async (_, { id, taskInput }) => {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, taskInput, { new: true });
        pubsub.publish('taskUpdated', { taskUpdated: updatedTask });
        return updatedTask;
      },
    },
    deleteTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { id }) => {
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        pubsub.publish('taskDeleted', { taskDeleted: deletedTask });
        return deletedTask;
      },
    },
  },
});

const TASK_ADDED = 'TASK_ADDED';
const TASK_UPDATED = 'TASK_UPDATED';
const TASK_DELETED = 'TASK_DELETED';

const RootSubscription = new GraphQLObjectType({
  name: 'RootSubscriptionType',
  fields: {
    taskAdded: {
      type: TaskType,
      resolve: (payload) => payload.taskAdded,
      subscribe: () => pubsub.asyncIterator([TASK_ADDED]),
    },
    taskUpdated: {
      type: TaskType,
      resolve: (payload) => payload.taskUpdated,
      subscribe: () => pubsub.asyncIterator([TASK_UPDATED]),
    },
    taskDeleted: {
      type: TaskType,
      resolve: (payload) => payload.taskDeleted,
      subscribe: () => pubsub.asyncIterator([TASK_DELETED]),
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubscription,
});
