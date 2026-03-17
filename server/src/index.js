require('dotenv/config');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pinoHttp = require('pino-http');
const { logger } = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');
const { prisma } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 4000;

// ============================================
// GLOBAL MIDDLEWARE
// ============================================

// Security headers
app.use(helmet());

// CORS — only allow frontend origin
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Request logging
app.use(pinoHttp({ logger }));

// ============================================
// WEBHOOK ROUTE — must come BEFORE express.json()
// Stripe needs the raw body for signature verification
// ============================================
const webhookRoutes = require('./routes/webhook.routes');
app.use('/api/webhooks', webhookRoutes);

// ============================================
// BODY PARSING (after webhook route)
// ============================================
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// General API rate limiting
app.use('/api/', apiLimiter);

// ============================================
// API ROUTES
// ============================================

// Public routes
const menuRoutes = require('./routes/menu.routes');
const orderRoutes = require('./routes/order.routes');
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Auth routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Admin routes
const adminMenuRoutes = require('./routes/admin.menu.routes');
const adminCustomisationRoutes = require('./routes/admin.customisation.routes');
const adminOrdersRoutes = require('./routes/admin.orders.routes');
const adminPromotionsRoutes = require('./routes/admin.promotions.routes');
const adminStaffRoutes = require('./routes/admin.staff.routes');
const uploadRoutes = require('./routes/upload.routes');
app.use('/api/admin/menu', adminMenuRoutes);
app.use('/api/admin/customisations', adminCustomisationRoutes);
app.use('/api/admin/orders', adminOrdersRoutes);
app.use('/api/admin/promotions', adminPromotionsRoutes);
app.use('/api/admin/staff', adminStaffRoutes);
app.use('/api/admin/upload', uploadRoutes);

// Kitchen routes
const kitchenRoutes = require('./routes/kitchen.routes');
app.use('/api/kitchen', kitchenRoutes);

// ============================================
// HEALTH CHECK
// ============================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', code: 'NOT_FOUND' });
});

// Global error handler
app.use(errorHandler);

// ============================================
// START SERVER
// ============================================

async function start() {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Database connected');

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    logger.error({ err }, 'Failed to start server');
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received. Shutting down...');
  await prisma.$disconnect();
  process.exit(0);
});

start();
