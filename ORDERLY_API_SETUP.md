# 🔑 Orderly Network API Setup Guide

## 📋 **Các bước setup API key cho Orderly Network**

### **Step 1: Tạo file .env.local**

Tạo file `.env.local` trong root directory của project:

```bash
# Orderly Network Configuration
ORDERLY_ENV=staging
ORDERLY_API_KEY=your_api_key_here
ORDERLY_SECRET=your_secret_here

# Current Environment
CURRENT_ENV=dev
HOST_NAME=http://localhost:3000
API_URL=https://api.orderly.org/v1/public
TOKEN_API_URL=https://interface.gateway.uniswap.org/v1/graphql
IMAGE_DOMAIN=
BROKER_ID=tcmp_staging
BROKER_NAME=Bazaarex_staging
NEXTWORK_URL=https://oss.orderly.network/

# Web3 Configuration
WALLET_CONNECT_PROJECT_ID=93dba83e8d9915dc6a65ffd3ecfd19fd
INFURA_ID=80633e48116943128cbab25e402764ab
```

### **Step 2: Lấy API Key từ Orderly Network**

#### **2.1. Đăng ký tài khoản Orderly Network**

1. Truy cập: https://orderly.network/
2. Click "Get Started" hoặc "Sign Up"
3. Đăng ký tài khoản với email
4. Verify email address

#### **2.2. Tạo API Key**

1. Đăng nhập vào dashboard
2. Vào **Settings** → **API Keys**
3. Click **"Create New API Key"**
4. Đặt tên cho API key (ví dụ: "TCMP DEX Trading")
5. Chọn permissions:
   - ✅ **Read** (để đọc data)
   - ✅ **Trade** (để thực hiện giao dịch)
   - ✅ **Withdraw** (để rút tiền)
6. Click **"Generate API Key"**
7. **Lưu lại API Key và Secret** (chỉ hiển thị 1 lần)

### **Step 3: Cấu hình Environment Variables**

#### **3.1. Development Environment (.env.local)**

```bash
# Staging/Testnet
ORDERLY_ENV=staging
ORDERLY_API_KEY=your_staging_api_key
ORDERLY_SECRET=your_staging_secret

# Hoặc Production
ORDERLY_ENV=prod
ORDERLY_API_KEY=your_production_api_key
ORDERLY_SECRET=your_production_secret
```

#### **3.2. Production Environment**

```bash
# Production
ORDERLY_ENV=prod
ORDERLY_API_KEY=your_production_api_key
ORDERLY_SECRET=your_production_secret
BROKER_ID=tcmp_prod
BROKER_NAME=Bazaarex_prod
```

### **Step 4: Cấu hình Environments**

#### **4.1. Staging Environment**

- **URL**: https://testnet-api-evm.orderly.org
- **WebSocket**: wss://testnet-ws-evm.orderly.org
- **Use case**: Testing, development

#### **4.2. Production Environment**

- **URL**: https://api-evm.orderly.org
- **WebSocket**: wss://ws-evm.orderly.org
- **Use case**: Live trading

### **Step 5: Test API Connection**

#### **5.1. Kiểm tra API Key**

```javascript
// Trong browser console
console.log("API Key:", process.env.ORDERLY_API_KEY);
console.log("Environment:", process.env.ORDERLY_ENV);
```

#### **5.2. Test API Call**

```javascript
// Test API connection
const testOrderlyAPI = async () => {
  try {
    const response = await fetch(
      "https://testnet-api-evm.orderly.org/v1/public/info"
    );
    const data = await response.json();
    console.log("Orderly API Response:", data);
  } catch (error) {
    console.error("API Error:", error);
  }
};

testOrderlyAPI();
```

### **Step 6: Security Best Practices**

#### **6.1. Environment Variables**

- ✅ Sử dụng `.env.local` cho development
- ✅ Sử dụng environment variables cho production
- ❌ Không commit API keys vào git
- ❌ Không hardcode API keys trong code

#### **6.2. API Key Permissions**

- ✅ Chỉ cấp quyền cần thiết
- ✅ Sử dụng staging key cho development
- ✅ Sử dụng production key cho live trading
- ❌ Không share API keys

#### **6.3. Network Security**

- ✅ Sử dụng HTTPS
- ✅ Validate API responses
- ✅ Handle API errors properly
- ❌ Không expose API keys trong client-side code

### **Step 7: Troubleshooting**

#### **7.1. Common Issues**

**Issue**: "Invalid API Key"

```bash
# Solution: Kiểm tra API key
1. Verify API key format
2. Check environment variables
3. Ensure API key is active
4. Check permissions
```

**Issue**: "Network Error"

```bash
# Solution: Kiểm tra network
1. Check internet connection
2. Verify API endpoints
3. Check firewall settings
4. Test with different network
```

**Issue**: "Permission Denied"

```bash
# Solution: Kiểm tra permissions
1. Check API key permissions
2. Verify account status
3. Check rate limits
4. Contact support if needed
```

#### **7.2. Debug Steps**

```javascript
// Debug API configuration
console.log("Orderly Config:", {
  env: process.env.ORDERLY_ENV,
  apiKey: process.env.ORDERLY_API_KEY ? "Set" : "Not set",
  secret: process.env.ORDERLY_SECRET ? "Set" : "Not set",
  brokerId: "tcmp",
});
```

### **Step 8. Production Deployment**

#### **8.1. Environment Variables**

```bash
# Production environment
ORDERLY_ENV=prod
ORDERLY_API_KEY=your_production_api_key
ORDERLY_SECRET=your_production_secret
```

#### **8.2. Security Checklist**

- [ ] API keys stored securely
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Error handling implemented
- [ ] Rate limiting configured
- [ ] Monitoring setup

### **Step 9. Monitoring & Maintenance**

#### **9.1. API Usage Monitoring**

- Monitor API calls
- Check rate limits
- Monitor errors
- Track performance

#### **9.2. Key Rotation**

- Rotate API keys regularly
- Update environment variables
- Test new keys before deployment
- Remove old keys

---

## 🎯 **Quick Start Checklist**

- [ ] Tạo file `.env.local`
- [ ] Lấy API key từ Orderly Network
- [ ] Cấu hình environment variables
- [ ] Test API connection
- [ ] Deploy to production
- [ ] Monitor API usage

---

_For more information, visit: https://docs.orderly.network/_
