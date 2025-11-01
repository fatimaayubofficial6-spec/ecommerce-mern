#!/bin/bash

echo "🔍 ShopSwift Setup Verification"
echo "================================"
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "  ✅ Node.js installed: $NODE_VERSION"
else
    echo "  ❌ Node.js not found. Please install Node.js v14 or higher."
fi

# Check npm
echo ""
echo "✓ Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "  ✅ npm installed: $NPM_VERSION"
else
    echo "  ❌ npm not found. Please install npm."
fi

# Check MongoDB
echo ""
echo "✓ Checking MongoDB..."
if command -v mongo &> /dev/null || command -v mongosh &> /dev/null; then
    echo "  ✅ MongoDB CLI found"
else
    echo "  ⚠️  MongoDB CLI not found. You can use MongoDB Atlas instead."
fi

# Check backend files
echo ""
echo "✓ Checking backend files..."
if [ -f "backend/server.js" ] && [ -f "backend/package.json" ]; then
    echo "  ✅ Backend files present"
else
    echo "  ❌ Backend files missing"
fi

# Check frontend files
echo ""
echo "✓ Checking frontend files..."
if [ -f "frontend/src/App.js" ] && [ -f "frontend/package.json" ]; then
    echo "  ✅ Frontend files present"
else
    echo "  ❌ Frontend files missing"
fi

# Check environment files
echo ""
echo "✓ Checking environment configuration..."
if [ -f "backend/.env" ]; then
    echo "  ✅ backend/.env exists"
    if grep -q "MONGO_URI=mongodb" backend/.env 2>/dev/null; then
        echo "  ✅ MONGO_URI configured"
    else
        echo "  ⚠️  MONGO_URI needs configuration"
    fi
    if grep -q "STRIPE_SECRET_KEY=sk_" backend/.env 2>/dev/null; then
        echo "  ✅ STRIPE_SECRET_KEY configured"
    else
        echo "  ⚠️  STRIPE_SECRET_KEY needs configuration"
    fi
else
    echo "  ⚠️  backend/.env not found (copy from .env.example)"
fi

if [ -f "frontend/.env" ]; then
    echo "  ✅ frontend/.env exists"
    if grep -q "REACT_APP_STRIPE_PUBLIC_KEY=pk_" frontend/.env 2>/dev/null; then
        echo "  ✅ REACT_APP_STRIPE_PUBLIC_KEY configured"
    else
        echo "  ⚠️  REACT_APP_STRIPE_PUBLIC_KEY needs configuration"
    fi
else
    echo "  ⚠️  frontend/.env not found (copy from .env.example)"
fi

# Check node_modules
echo ""
echo "✓ Checking dependencies..."
if [ -d "backend/node_modules" ]; then
    echo "  ✅ Backend dependencies installed"
else
    echo "  ⚠️  Backend dependencies not installed. Run: cd backend && npm install"
fi

if [ -d "frontend/node_modules" ]; then
    echo "  ✅ Frontend dependencies installed"
else
    echo "  ⚠️  Frontend dependencies not installed. Run: cd frontend && npm install"
fi

echo ""
echo "================================"
echo "📋 Summary"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Configure .env files if needed (see QUICK_START.md)"
echo "2. Install dependencies: npm run install-all"
echo "3. Seed database: cd backend && npm run seed"
echo "4. Start app: npm run dev"
echo ""
echo "📚 Documentation available:"
echo "  - START_HERE.md - Begin here!"
echo "  - QUICK_START.md - 5-minute setup"
echo "  - SETUP.md - Detailed instructions"
echo "  - API.md - API documentation"
echo ""
