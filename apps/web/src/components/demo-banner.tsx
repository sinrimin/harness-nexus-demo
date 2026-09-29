import { useState } from 'react';
import { useI18n } from '@/i18n';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

/**
 * Demo overlay (the harness-nexus-demo fork only) — see DEMO.md. Compiled
 * into every build but inert unless VITE_DEMO_MODE=1 was baked at build
 * time: upstream builds render nothing from these components and pay only
 * the string table. Build-time vars come from demo-images.yml.
 */
const DEMO = import.meta.env.VITE_DEMO_MODE === '1';
const REPO = import.meta.env.VITE_DEMO_REPO ?? '';
const SHA = import.meta.env.VITE_GIT_SHA ?? '';
const ACK_KEY = 'hnx.demo-ack';

function repoUrl(): string {
  return SHA ? `${REPO}/tree/${SHA}` : REPO;
}

function shaShort(): string {
  return SHA ? `@ ${SHA.slice(0, 7)}` : '';
}

/**
 * Thin always-on strip: one line, four facts, one link. In-flow inside the
 * shell; the auth pages wrap it in a fixed top band (they render outside the
 * shell).
 */
export function DemoStrip() {
  const { t } = useI18n();
  if (!DEMO) return null;
  return (
    <div
      data-region="demo-strip"
      className="flex flex-wrap items-center gap-x-3 gap-y-0.5 border-b bg-background px-4 py-1.5 text-xs text-muted-foreground"
    >
      <span className="font-medium text-foreground">{t('demo.strip')}</span>
      {REPO ? (
        <a
          href={repoUrl()}
          target="_blank"
          rel="noreferrer"
          className="text-signal underline-offset-2 hover:underline"
        >
          {t('demo.stripLink')}
          {shaShort()}
        </a>
      ) : null}
    </div>
  );
}

/** First-visit modal: the full notice, acknowledged once per browser. */
export function DemoGate() {
  const { t } = useI18n();
  const [open, setOpen] = useState(
    DEMO && typeof localStorage !== 'undefined' && !localStorage.getItem(ACK_KEY),
  );
  if (!DEMO) return null;
  const ack = () => {
    try {
      localStorage.setItem(ACK_KEY, '1');
    } catch {
      // Private mode etc. — the notice just reappears next visit.
    }
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : ack())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('demo.modalTitle')}</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-3 text-left">
              <p>{t('demo.modalP1')}</p>
              <p>{t('demo.modalP2')}</p>
              <p>{t('demo.modalP3')}</p>
              <p>
                {t('demo.modalP4')}{' '}
                {REPO ? (
                  <a
                    href={repoUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-signal underline underline-offset-2"
                  >
                    {REPO}
                    {shaShort() ? ` ${shaShort().trim()}` : ''}
                  </a>
                ) : null}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={ack}>{t('demo.modalAck')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
