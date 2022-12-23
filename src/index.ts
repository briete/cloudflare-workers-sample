import {Hono} from 'hono';
import {logger} from 'hono/logger';
// import {} from 'hono/validator';
import {jwt} from 'hono/jwt';
import {D1QB, FetchTypes} from 'workers-qb';

export interface Env {
  DB: D1Database;
  SECRET: string;
}

interface CreateUserBody {
  username: string;
  email: string;
  groupId: string;
}

const app = new Hono<{Bindings: Env}>();

app.use(logger());
app.use('/auth/*', async (c, next) => {
  const auth = jwt({
    secret: c.env.SECRET,
  });
  return auth(c, next);
});

app.get('/', c => c.text('Hello World!!!'));

app.post('/api/users', async c => {
  console.log('c', c);

  const body = await c.req.json<CreateUserBody>();

  const qb = new D1QB(c.env.DB);
  const inserted = await qb.insert({
    tableName: 'users',
    data: {
      username: body.username,
      email: body.email,
      group_id: body.groupId,
    },
  });
  return c.json(inserted);
});

app.get('/api/users/:id', async c => {
  console.log('c', c);

  const {id} = c.req.param();
  const qb = new D1QB(c.env.DB);
  const fetched = await qb.execute({
    query:
      'SELECT users.id, users.username, users.email, groups.groupname FROM users JOIN groups ON users.id = groups.id WHERE users.id = ?1',
    arguments: [id],
    fetchType: FetchTypes.ONE,
  });

  console.log('fetched', fetched);
  return c.json(fetched);
});

export default app;
