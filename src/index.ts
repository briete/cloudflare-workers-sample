import {Hono} from 'hono';
import {logger} from 'hono/logger';
// import {} from 'hono/validator';
import {jwt} from 'hono/jwt';
import {D1QB} from 'workers-qb';

export interface Env {
  DB: D1Database;
  SECRET: string;
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

interface CreateUserBody {
  username: string;
  email: string;
  groupId: string;
}

app.post('/api/users', async c => {
  try {
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
  } catch (e) {
    console.error(e);
    throw e;
  }
});

export default app;
