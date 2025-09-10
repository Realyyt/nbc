# NBTA Affiliate System

## Overview

The NBTA Affiliate System is a comprehensive solution that allows individuals to become affiliates and earn commissions by promoting NBTA's vocational training courses. The system includes application management, affiliate dashboards, commission tracking, and admin management tools.

## Features

### For Affiliates
- **Application Process**: Easy-to-use application form with comprehensive information collection
- **Affiliate Dashboard**: Real-time tracking of earnings, referrals, and performance metrics
- **Unique Affiliate Codes**: Each affiliate gets a unique 8-character code for tracking
- **Commission Tracking**: Automatic calculation and tracking of 10% commission on course enrollments
- **Simplified Payment**: Bank account details for direct transfers (no PayPal required)
- **Marketing Tools**: Shareable affiliate links and promotional materials

### For Administrators
- **Application Review**: Comprehensive admin panel for reviewing affiliate applications
- **Affiliate Management**: Monitor and manage active affiliates
- **Commission Oversight**: Track all referral activities and commission payouts
- **Email Notifications**: Automated email system for application updates and approvals

### For Students
- **Affiliate Code Integration**: Students can register using affiliate codes
- **No Discounts**: Students pay full price, affiliates earn commission from profits
- **Seamless Experience**: Registration process remains unchanged for students

## System Architecture

### Frontend Components

#### Pages
- `AffiliateApplication.tsx` - Application form for potential affiliates
- `AffiliateApplicationSuccess.tsx` - Success page after application submission
- `AffiliateDashboard.tsx` - Main dashboard for approved affiliates
- `AdminAffiliates.tsx` - Admin panel for managing affiliates and applications

#### Services
- `affiliateService.ts` - API service for all affiliate-related operations
- `brevoService.ts` - Email service with affiliate-specific templates

#### Types
- `AffiliateApplication` - Application data structure
- `Affiliate` - Affiliate profile and statistics
- `AffiliateReferral` - Referral tracking data
- `AffiliateStats` - Performance metrics
- `AffiliateWithdrawal` - Payment request data

### Backend API Endpoints (To be implemented)

#### Affiliate Applications
```
POST /affiliates/applications - Submit new application
GET /affiliates/applications/status/:email - Check application status
```

#### Affiliate Management
```
GET /affiliates/profile - Get affiliate profile
PUT /affiliates/payment-info - Update payment information
GET /affiliates/stats - Get affiliate statistics
```

#### Referrals
```
GET /affiliates/referrals - Get referral list
GET /affiliates/validate-code/:code - Validate affiliate code
POST /affiliates/track-referral - Track new referral
```

#### Withdrawals
```
POST /affiliates/withdrawals - Request withdrawal
GET /affiliates/withdrawals - Get withdrawal history
```

#### Admin Endpoints
```
GET /admin/affiliates/applications - Get all applications
PUT /admin/affiliates/applications/:id/review - Review application
GET /admin/affiliates - Get all affiliates
PUT /admin/affiliates/:id/status - Update affiliate status
PUT /admin/affiliates/withdrawals/:id/process - Process withdrawal
```

## User Flow

### 1. Affiliate Application Process
1. User visits `/affiliate-application`
2. Fills out comprehensive application form
3. Submits application (sends confirmation email)
4. Admin reviews application in admin panel
5. Admin approves/rejects with reason
6. System sends approval/rejection email
7. If approved, affiliate receives unique code and dashboard access

### 2. Affiliate Promotion Process
1. Affiliate shares their unique link: `/register?ref=AFFILIATE_CODE`
2. Student clicks link and registers with affiliate code
3. System validates affiliate code
4. Student completes registration (no discount applied)
5. System tracks referral and calculates commission
6. Affiliate receives notification of new referral
7. Commission is added to affiliate's pending balance

### 3. Commission Payment Process
1. Affiliate provides bank account details in payment settings
2. System tracks all referrals and calculates commissions
3. Admin reviews affiliate earnings in admin panel
4. Admin processes bank transfer to affiliate's account manually
5. Admin updates payment status in system
6. Affiliate receives payment confirmation email

## Database Schema (Recommended)

### Affiliate Applications
```sql
CREATE TABLE affiliate_applications (
  id UUID PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50) NOT NULL,
  website VARCHAR(255),
  audience_size INTEGER NOT NULL,
  audience_description TEXT NOT NULL,
  motivation TEXT NOT NULL,
  social_media_handles JSONB,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  reviewed_by UUID,
  reviewed_at TIMESTAMP,
  rejection_reason TEXT
);
```

### Affiliates
```sql
CREATE TABLE affiliates (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  application_id UUID REFERENCES affiliate_applications(id),
  affiliate_code VARCHAR(8) UNIQUE NOT NULL,
  commission_rate DECIMAL(5,2) DEFAULT 0.10,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  total_referrals INTEGER DEFAULT 0,
  active_referrals INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  joined_at TIMESTAMP DEFAULT NOW(),
  last_activity_at TIMESTAMP DEFAULT NOW(),
  payment_info JSONB
);
```

### Affiliate Referrals
```sql
CREATE TABLE affiliate_referrals (
  id UUID PRIMARY KEY,
  affiliate_id UUID REFERENCES affiliates(id),
  referred_user_id UUID REFERENCES users(id),
  referred_user_email VARCHAR(255) NOT NULL,
  referred_user_name VARCHAR(255) NOT NULL,
  course_id VARCHAR(255) NOT NULL,
  course_title VARCHAR(255) NOT NULL,
  course_price DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  payment_status VARCHAR(20) DEFAULT 'pending',
  paid_at TIMESTAMP
);
```



## Email Templates

The system includes comprehensive email templates for:

1. **Application Confirmation** - Sent when application is submitted
2. **Approval Notification** - Sent when application is approved
3. **Rejection Notification** - Sent when application is rejected
4. **New Referral Alert** - Sent when affiliate gets a new referral
5. **Withdrawal Updates** - Sent for withdrawal status changes

## Security Considerations

1. **Affiliate Code Validation** - Server-side validation of all affiliate codes
2. **Commission Calculation** - Server-side calculation to prevent manipulation
3. **Payment Verification** - Admin approval required for all withdrawals
4. **Rate Limiting** - Prevent abuse of affiliate code validation
5. **Audit Trail** - Log all affiliate-related activities

## Configuration

### Environment Variables
```env
VITE_API_URL=http://localhost:3000/api
VITE_BREVO_API_KEY=your_brevo_api_key
```

### Commission Settings
- Default commission rate: 10%
- Commission calculation: 10% of course price
- Payment method: Bank transfer only
- Payment processing: Manual by admin
- Payment frequency: As determined by admin

## Deployment Considerations

1. **Database Migration** - Run schema migrations before deployment
2. **Email Service** - Configure Brevo API key for email notifications
3. **Manual Payment Processing** - Admin handles all payments manually
4. **Monitoring** - Set up monitoring for affiliate system performance
5. **Backup** - Regular backups of affiliate data

## Future Enhancements

1. **Multi-tier Commission** - Different rates for different affiliate levels
2. **Promotional Materials** - Automated generation of marketing materials
3. **Analytics Dashboard** - Advanced analytics and reporting
4. **Mobile App** - Native mobile app for affiliate management
5. **Social Media Integration** - Direct social media sharing capabilities
6. **Automated Payouts** - Automated payment processing
7. **Affiliate Training** - Built-in training and onboarding system

## Support

For technical support or questions about the affiliate system, contact:
- Email: affiliates@nbta.com.ng
- Technical Documentation: [Link to docs]
- Admin Panel: `/admin/affiliates`

## License

This affiliate system is proprietary to NBTA Academy and is not for public distribution.
