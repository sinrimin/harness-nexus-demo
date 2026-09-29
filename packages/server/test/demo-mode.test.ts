import { describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';
import { testConfig } from './helpers.js';

/**
 * Demo overlay — the public demo's admin seat is claimed at boot by a
 * DISABLED seeded account, so the first registrant is a plain user and the
 * admin surface stays unreachable. Upstream behavior (demoMode off) is
 * asserted first for contrast.
 */
describe('demo mode seed', () => {
  it('DEMO off (default): the first registrant still bootstraps as admin', async () => {
    const app = await buildApp(testConfig());
    const res = await app.inject({
      method: 'POST',
      url: '/api/auth/register',
      payload: { username: 'first', password: 'hunter2hunter2' },
    });
    expect(res.statusCode).toBe(201);
    expect(res.json().user.role).toBe('admin');
    await app.close();
  });

  it('DEMO on: the first registrant is a plain user; the admin seat is disabled', async () => {
    const app = await buildApp(testConfig({ demoMode: true }));

    const reg = await app.inject({
      method: 'POST',
      url: '/api/auth/register',
      payload: { username: 'visitor', password: 'hunter2hunter2' },
    });
    expect(reg.statusCode).toBe(201);
    expect(reg.json().user.role).toBe('user');

    // The seeded seat exists, is the only admin, and is disabled.
    const admin = await app.uow.users.findByUsername('admin');
    expect(admin?.role).toBe('admin');
    expect(admin?.status).toBe('disabled');

    // Nobody logs into it without the (discarded) one-shot password; whatever
    // is tried must fail closed.
    const login = await app.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: { username: 'admin', password: 'whatever-whatever' },
    });
    expect([401, 403]).toContain(login.statusCode);

    // The visitor cannot touch the admin surface.
    const token = reg.json().token as string;
    const users = await app.inject({
      method: 'GET',
      url: '/api/users',
      headers: { authorization: `Bearer ${token}` },
    });
    expect(users.statusCode).toBe(403);
    await app.close();
  });
});
