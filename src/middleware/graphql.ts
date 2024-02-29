// graphqlSchema.ts
import { 
  GraphQLObjectType, 
  GraphQLSchema, 
  GraphQLList, 
  GraphQLNonNull, 
  GraphQLString, 
  GraphQLID,
  GraphQLInputObjectType,
} from 'graphql';
import { TaskModel, Task } from '../interfaces/taskinterface';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

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
  subscription: RootSubscription,
});
