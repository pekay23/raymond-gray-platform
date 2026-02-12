import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next-auth's getServerSession to return null (unauthenticated)
vi.mock('next-auth', () => ({
    getServerSession: vi.fn(() => Promise.resolve(null)),
}));

// Mock the auth options
vi.mock('@/lib/auth', () => ({
    authOptions: {},
}));

// Mock Prisma to avoid real DB calls
vi.mock('@/lib/prisma', () => ({
    prisma: {
        inquiry: {
            findUnique: vi.fn(),
            update: vi.fn(),
            create: vi.fn(),
        },
        user: {
            findMany: vi.fn(),
        },
    },
}));

beforeEach(() => {
    vi.clearAllMocks();
});

// ── Auth Guard Tests ────────────────────────────────────────

describe('Auth Guards — Unauthenticated requests return 401', () => {
    it('POST /api/technician/complete-job → 401', async () => {
        const { POST } = await import(
            '@/app/api/technician/complete-job/route'
        );
        const req = new Request('http://localhost/api/technician/complete-job', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId: 'test', code: '0000' }),
        });

        const res = await POST(req);
        expect(res.status).toBe(401);

        const body = await res.json();
        expect(body.error).toBe('Unauthorized');
    });

    it('PATCH /api/admin/inquiries/[id]/assign → 401', async () => {
        const { PATCH } = await import(
            '@/app/api/admin/inquiries/[id]/assign/route'
        );
        const req = new Request('http://localhost/api/admin/inquiries/123/assign', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ technicianId: 'test' }),
        });

        const res = await PATCH(req, { params: Promise.resolve({ id: '123' }) });
        expect(res.status).toBe(401);

        const body = await res.json();
        expect(body.error).toBe('Unauthorized');
    });

    it('GET /api/admin/technicians → 401', async () => {
        const { GET } = await import('@/app/api/admin/technicians/route');

        const res = await GET();
        expect(res.status).toBe(401);

        const body = await res.json();
        expect(body.error).toBe('Unauthorized');
    });

    it('POST /api/confirm-arrival → 401', async () => {
        const { POST } = await import('@/app/api/confirm-arrival/route');
        const req = new Request('http://localhost/api/confirm-arrival', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                workOrder: 'WO-001',
                code: '1234',
                latitude: 0,
                longitude: 0,
            }),
        });

        const res = await POST(req);
        expect(res.status).toBe(401);

        const body = await res.json();
        expect(body.error).toBe('Unauthorized');
    });
});

// ── Validation Tests ────────────────────────────────────────

describe('Input Validation — Bad data returns 400', () => {
    it('POST /api/contact with empty body → 400', async () => {
        const { POST } = await import('@/app/api/contact/route');
        const req = new Request('http://localhost/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        });

        const res = await POST(req);
        expect(res.status).toBe(400);

        const body = await res.json();
        expect(body.error).toBeDefined();
    });

    it('POST /api/contact with invalid email → 400', async () => {
        const { POST } = await import('@/app/api/contact/route');
        const req = new Request('http://localhost/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: 'not-an-email',
                message: 'Test message',
            }),
        });

        const res = await POST(req);
        expect(res.status).toBe(400);
    });
});

// ── Rate Limit Tests ────────────────────────────────────────

describe('Rate Limiting', () => {
    it('rateLimit blocks after max requests', async () => {
        // Use a fresh import to avoid cross-test state
        const { rateLimit } = await import('@/lib/rate-limit');
        const testKey = `test-${Date.now()}`;

        for (let i = 0; i < 5; i++) {
            const result = rateLimit(testKey, { max: 5, windowMs: 60000 });
            expect(result.success).toBe(true);
        }

        // 6th request should be blocked
        const blocked = rateLimit(testKey, { max: 5, windowMs: 60000 });
        expect(blocked.success).toBe(false);
        expect(blocked.remaining).toBe(0);
    });
});
