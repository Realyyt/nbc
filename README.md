# 🌟 NBC Affiliate System - World-Class Affiliate Management Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/nbc/affiliate-system)
[![Security](https://img.shields.io/badge/Security-A+%20Grade-brightgreen.svg)](https://securityheaders.com/)

> **Enterprise-grade affiliate management system with seamless database connectivity, world-class security, and production-ready deployment.**

## 🚀 **Features**

### ✨ **Core Affiliate System**
- **Application Management**: Streamlined affiliate application process
- **Approval Workflow**: Admin dashboard for reviewing and approving affiliates
- **Unique Affiliate Codes**: Automatic generation of referral codes
- **Commission Tracking**: Real-time earnings and referral monitoring
- **Payment Management**: Secure bank detail collection and manual processing

### 🔒 **Enterprise Security**
- **JWT Authentication**: Secure token-based authentication for admin and affiliates
- **Role-Based Access Control**: Separate admin and affiliate dashboards
- **Rate Limiting**: Protection against abuse and DDoS attacks
- **Security Headers**: Helmet.js integration with comprehensive security policies
- **CORS Protection**: Configurable cross-origin resource sharing

### 🏗️ **Production Architecture**
- **Full-Stack Solution**: React frontend + Node.js backend + SQLite database
- **Docker Support**: Containerized deployment with Docker Compose
- **Nginx Integration**: Reverse proxy with SSL termination and caching
- **Health Monitoring**: Built-in health checks and monitoring endpoints
- **Scalable Design**: Horizontal and vertical scaling capabilities

### 📊 **Performance & Monitoring**
- **Database Optimization**: Indexed queries and connection pooling
- **Compression**: Gzip compression for optimal bandwidth usage
- **Caching Strategy**: Redis integration for session and data caching
- **Logging**: Structured logging with rotation and monitoring
- **Metrics**: Performance tracking and error monitoring

## 🛠️ **Technology Stack**

### **Frontend**
- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors

### **Backend**
- **Node.js 18+** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **SQLite3** - Lightweight, serverless database
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing and verification

### **Infrastructure**
- **Docker** - Containerization platform
- **Nginx** - Reverse proxy and load balancer
- **Redis** - In-memory data structure store
- **PM2** - Process manager for Node.js applications

## 📦 **Quick Start**

### **Prerequisites**
```bash
# Node.js 18+ and npm 8+
node --version
npm --version

# Docker (optional, for production)
docker --version
docker-compose --version
```

### **Installation**
```bash
# Clone the repository
git clone https://github.com/nbc/affiliate-system.git
cd affiliate-system

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your configuration

# Start development servers
npm run dev:full
```

### **Development**
```bash
# Frontend development (http://localhost:5173)
npm run dev

# Backend development (http://localhost:3001)
npm run server

# Full-stack development
npm run dev:full

# Build for production
npm run build
```

## 🚀 **Production Deployment**

### **Docker Deployment (Recommended)**
```bash
# Build and deploy
npm run deploy:prod

# Check status
npm run docker:compose:logs

# Stop services
npm run docker:compose:down
```

### **Manual Deployment**
```bash
# Install production dependencies
npm ci --only=production

# Build frontend
npm run build

# Start production server
npm start
```

### **Environment Configuration**
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRES_IN=24h
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=https://yourdomain.com
ADMIN_URL=https://admin.yourdomain.com
```

## 📚 **API Documentation**

### **Authentication Endpoints**
```http
POST /api/auth/admin/login     # Admin login
POST /api/auth/affiliate/login # Affiliate login
```

### **Affiliate Management**
```http
POST   /api/affiliates/applications     # Submit application
GET    /api/affiliates/applications     # Get applications (admin)
PUT    /api/affiliates/applications/:id # Review application (admin)
GET    /api/affiliates/profile          # Get affiliate profile
PUT    /api/affiliates/payment-info     # Update payment info
```

### **Referral Tracking**
```http
POST /api/affiliates/track-referral     # Track new referral
GET  /api/affiliates/referrals         # Get referral list
GET  /api/affiliates/stats             # Get affiliate statistics
```

### **Admin Operations**
```http
GET  /api/admin/affiliates             # Get all affiliates
GET  /api/admin/affiliates/applications # Get all applications
PUT  /api/admin/affiliates/applications/:id/review # Review application
GET  /api/admin/dashboard/stats        # Get dashboard statistics
```

## 🏗️ **System Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React)       │◄──►│   (Express)     │◄──►│   (SQLite)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
   │   Nginx     │       │   JWT Auth  │       │   Data      │
   │   (SSL)     │       │   Validation│       │   Backup    │
   └─────────────┘       └─────────────┘       └─────────────┘
```

## 🔒 **Security Features**

### **Authentication & Authorization**
- JWT-based authentication with configurable expiration
- Role-based access control (Admin vs Affiliate)
- Secure password hashing with bcryptjs
- Token refresh and rotation capabilities

### **API Security**
- Rate limiting with configurable thresholds
- CORS protection with domain validation
- Input validation and sanitization
- SQL injection prevention
- XSS protection headers

### **Data Protection**
- Encrypted password storage
- Secure session management
- Audit logging for admin actions
- Data backup and recovery procedures

## 📊 **Performance Features**

### **Database Optimization**
- Indexed queries for fast data retrieval
- Connection pooling for efficient resource usage
- Query optimization and caching
- Regular database maintenance

### **Frontend Performance**
- Code splitting and lazy loading
- Optimized bundle size
- Static asset caching
- Progressive Web App capabilities

### **Backend Performance**
- Request compression (Gzip)
- Response caching strategies
- Asynchronous processing
- Load balancing support

## 🔍 **Monitoring & Logging**

### **Health Checks**
```bash
# API health endpoint
curl https://yourdomain.com/api/health

# Docker health checks
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### **Logging System**
- Structured JSON logging
- Log rotation and archiving
- Error tracking and alerting
- Performance metrics collection

### **Metrics Dashboard**
- Request/response times
- Error rates and types
- Database performance
- System resource usage

## 🚨 **Backup & Recovery**

### **Automated Backups**
```bash
# Create database backup
npm run backup

# Restore from backup
npm run restore:backup
```

### **Disaster Recovery**
- Automated backup scheduling
- Point-in-time recovery
- Data validation procedures
- Rollback strategies

## 📈 **Scaling & Maintenance**

### **Horizontal Scaling**
- Load balancer configuration
- Multiple API instances
- Database clustering
- Session sharing strategies

### **Vertical Scaling**
- Resource monitoring
- Performance tuning
- Memory optimization
- CPU utilization tracking

### **Maintenance Procedures**
- Security updates
- Dependency management
- Database maintenance
- Performance optimization

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Server Won't Start**
```bash
# Check logs
npm run docker:compose:logs

# Verify environment
cat .env

# Check port availability
netstat -tulpn | grep :3001
```

#### **Database Issues**
```bash
# Check database file
ls -la data/

# Verify permissions
chmod 644 data/affiliate_system.db

# Test database connection
node -e "const sqlite3 = require('sqlite3'); const db = new sqlite3.Database('./data/affiliate_system.db'); console.log('DB connected');"
```

#### **Email Issues**
```bash
# Test email configuration
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});
transporter.verify().then(console.log).catch(console.error);
"
```

## 📚 **Documentation**

- [🚀 Deployment Guide](./DEPLOYMENT.md)
- [🔌 API Documentation](./API.md)
- [🗄️ Database Schema](./DATABASE.md)
- [🔒 Security Guidelines](./SECURITY.md)
- [📊 Performance Guide](./PERFORMANCE.md)

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### **Development Setup**
```bash
# Fork and clone
git clone https://github.com/yourusername/affiliate-system.git

# Install dependencies
npm install

# Run tests
npm test

# Start development
npm run dev:full
```

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

### **Getting Help**
- 📖 [Documentation](./docs/)
- 🐛 [GitHub Issues](https://github.com/nbc/affiliate-system/issues)
- 💬 [Community Forum](https://community.nbc.com)
- 📧 [Email Support](mailto:support@nbc.com)

### **Commercial Support**
For enterprise support and custom development, contact us at [enterprise@nbc.com](mailto:enterprise@nbc.com)

## 🌟 **Why Choose NBC Affiliate System?**

### **✅ Production Ready**
- Enterprise-grade security
- Comprehensive testing
- Production deployment guides
- Performance optimization

### **✅ Developer Friendly**
- TypeScript support
- Modern React patterns
- Comprehensive documentation
- Easy development setup

### **✅ Scalable Architecture**
- Microservices ready
- Database optimization
- Caching strategies
- Load balancing support

### **✅ Security First**
- JWT authentication
- Rate limiting
- Security headers
- Input validation

---

**🎉 Ready to deploy your world-class affiliate system?** 

Start with our [Quick Start Guide](#quick-start) or jump straight to [Production Deployment](./DEPLOYMENT.md) for enterprise-grade deployment.

**Built with ❤️ by the NBC Team**

