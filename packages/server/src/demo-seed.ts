import type { FastifyBaseLogger } from 'fastify';
import type { UnitOfWork } from '@harness-nexus/core';
import { generateId, hashPassword } from './infra/crypto.js';

/**
 * Demo overlay — boots the public demo instance (DEMO_MODE=true) with the
 * admin seat already claimed. See DEMO.md.
 *
 * The register route mints a bootstrap admin only when the users table is
 * empty (modules/auth.ts). Seeding ONE disabled `admin` row therefore keeps
 * every future registrant a plain `user`, and the account itself can never
 * log in: its password is a discarded one-shot random, and even a holder of
 * it would hit the post-verify status check (403 ACCOUNT_DISABLED).
 */
export async function seedDemo(uow: UnitOfWork, log: FastifyBaseLogger): Promise<void> {
  if ((await uow.users.count()) > 0) return;
  const now = new Date().toISOString();
  await uow.users.save({
    id: generateId(),
    username: 'admin',
    passwordHash: await hashPassword(`${generateId()}${generateId()}`),
    role: 'admin',
    status: 'disabled',
    createdAt: now,
    updatedAt: now,
  });
  log.info('demo seed: disabled admin seat claimed (DEMO_MODE)');
}
