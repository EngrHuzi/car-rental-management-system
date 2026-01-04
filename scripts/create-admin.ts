import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('👤 Creating admin demo user...');

    const email = 'admin@rental.com';
    const password = 'admin123';

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('⚠️  Admin user already exists!');
      console.log(`📧 Email: ${existingUser.email}`);
      console.log(`✅ Verified: ${existingUser.emailVerified}`);

      // Update to verified if not already
      if (!existingUser.emailVerified) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            emailVerified: true,
            verificationToken: null,
            verificationExpires: null,
          },
        });
        console.log('✅ Updated user to verified status');
      }
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user with verified email
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        emailVerified: true, // Pre-verified for demo
        verificationToken: null,
        verificationExpires: null,
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Demo Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Verified: ✅ Yes`);
    console.log('\n🔐 You can now login with these credentials!\n');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
