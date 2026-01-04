import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupUnverifiedUsers() {
  try {
    console.log('🧹 Starting cleanup of unverified users...');

    // Find all unverified users
    const unverifiedUsers = await prisma.user.findMany({
      where: {
        emailVerified: false,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    console.log(`Found ${unverifiedUsers.length} unverified users:`);
    unverifiedUsers.forEach(user => {
      console.log(`  - ${user.email} (Created: ${user.createdAt})`);
    });

    if (unverifiedUsers.length === 0) {
      console.log('✅ No unverified users to clean up!');
      return;
    }

    // Ask for confirmation (in a real script, you'd use readline)
    console.log('\n⚠️  Delete these users? This action cannot be undone!');
    console.log('💡 Run this script with --confirm flag to proceed\n');

    // Check if --confirm flag is present
    if (process.argv.includes('--confirm')) {
      // Delete all sessions for these users first
      const userIds = unverifiedUsers.map(u => u.id);

      const deletedSessions = await prisma.session.deleteMany({
        where: {
          userId: {
            in: userIds,
          },
        },
      });
      console.log(`🗑️  Deleted ${deletedSessions.count} sessions`);

      // Delete the users
      const deletedUsers = await prisma.user.deleteMany({
        where: {
          emailVerified: false,
        },
      });

      console.log(`✅ Successfully deleted ${deletedUsers.count} unverified users!`);
    } else {
      console.log('❌ Cleanup cancelled. Add --confirm flag to proceed.');
    }
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup
cleanupUnverifiedUsers();
