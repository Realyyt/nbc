# 🚀 NBC Affiliate System - Production Deployment Guide

## 🌟 **Overview**
This guide covers deploying the NBC Affiliate System to production with enterprise-grade security, performance, and scalability.

## 📋 **Prerequisites**
- Node.js 18+ and npm 8+
- Docker and Docker Compose
- SSL certificates for HTTPS
- Domain name configured
- Email service credentials (Gmail, SendGrid, etc.)

## 🏗️ **Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx (SSL)   │───▶│  Affiliate API  │───▶│   SQLite DB     │
│   (Port 80/443) │    │   (Port 3001)   │    │   (Persistent)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
   │ Rate Limiting│       │ JWT Auth    │       │ Data Backup │
   │ Security    │       │ Validation  │       │ Monitoring  │
   └─────────────┘       └─────────────┘       └─────────────┘
```

## 🚀 **Quick Deployment**

### 1. **Environment Setup**
```bash
# Copy environment template
cp env.example .env

# Edit environment variables
nano .env
```

**Required Environment Variables:**
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRES_IN=24h
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=NBTA Affiliate System <noreply@nbta.com.ng>
FRONTEND_URL=https://yourdomain.com
ADMIN_URL=https://admin.yourdomain.com
```

### 2. **Docker Deployment**
```bash
# Build and deploy
npm run deploy:prod

# Check status
npm run docker:compose:logs

# Stop services
npm run docker:compose:down
```

### 3. **Manual Deployment**
```bash
# Install dependencies
npm ci --only=production

# Build frontend
npm run build

# Start server
npm start
```

## 🔒 **Security Configuration**

### **JWT Security**
- Use strong, random JWT secrets (32+ characters)
- Set appropriate expiration times
- Implement refresh token rotation

### **Rate Limiting**
- API endpoints: 10 requests/second
- Authentication: 5 requests/minute
- Customizable per endpoint

### **CORS Configuration**
- Restrict to production domains only
- Disable credentials for public endpoints
- Validate origin headers

### **Security Headers**
- Helmet.js for security headers
- Content Security Policy (CSP)
- XSS Protection
- Frame Options

## 📊 **Performance Optimization**

### **Database Optimization**
- SQLite with proper indexing
- Connection pooling
- Query optimization
- Regular VACUUM operations

### **Caching Strategy**
- Redis for session storage
- Static asset caching
- API response caching
- Database query caching

### **Compression**
- Gzip compression enabled
- Brotli support (optional)
- Static asset optimization

## 🔍 **Monitoring & Logging**

### **Health Checks**
```bash
# API health check
curl https://yourdomain.com/health

# Docker health check
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### **Logging**
- Structured JSON logging
- Log rotation
- Error tracking
- Performance metrics

### **Metrics**
- Request/response times
- Error rates
- Database performance
- Memory usage

## 📈 **Scaling Considerations**

### **Horizontal Scaling**
- Load balancer configuration
- Multiple API instances
- Database clustering
- Session sharing

### **Vertical Scaling**
- Resource monitoring
- Performance tuning
- Database optimization
- Memory management

## 🚨 **Backup & Recovery**

### **Database Backup**
```bash
# Create backup
cp data/affiliate_system.db backups/affiliate_system_$(date +%Y%m%d_%H%M%S).db

# Automated backup script
npm run backup
```

### **Disaster Recovery**
- Regular backup testing
- Recovery procedures
- Data validation
- Rollback strategies

## 🔧 **Maintenance**

### **Regular Tasks**
- Security updates
- Dependency updates
- Database maintenance
- Log rotation
- Performance monitoring

### **Update Procedures**
```bash
# Pull latest changes
git pull origin main

# Rebuild and redeploy
npm run deploy:prod

# Verify deployment
npm run test:api
```

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

## 📚 **Additional Resources**

### **Documentation**
- [API Documentation](./API.md)
- [Database Schema](./DATABASE.md)
- [Security Guidelines](./SECURITY.md)

### **Support**
- GitHub Issues
- Documentation Wiki
- Community Forum

## 🎯 **Production Checklist**

- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Database backed up
- [ ] Security headers enabled
- [ ] Rate limiting configured
- [ ] Monitoring setup
- [ ] Backup procedures tested
- [ ] Performance tested
- [ ] Security audit completed
- [ ] Documentation updated

## 🚀 **Deployment Commands Reference**

```bash
# Development
npm run dev:full          # Start dev server + backend
npm run server            # Start backend only

# Production
npm run deploy:prod       # Full production deployment
npm run docker:compose    # Start with Docker Compose
npm run docker:compose:down # Stop services

# Maintenance
npm run migrate           # Run database migrations
npm run seed              # Seed database
npm run backup            # Create backup
npm run test:api          # Test API health
```

---

**🎉 Congratulations!** Your NBC Affiliate System is now production-ready with enterprise-grade security, performance, and scalability.

