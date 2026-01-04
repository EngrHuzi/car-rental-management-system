import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

// 136 vehicles across 39 brands
const vehicles = [
  // Toyota (8 models)
  { model: 'Camry', brand: 'Toyota', dailyPrice: 45.00 },
  { model: 'Corolla', brand: 'Toyota', dailyPrice: 35.00 },
  { model: 'RAV4', brand: 'Toyota', dailyPrice: 55.00 },
  { model: 'Highlander', brand: 'Toyota', dailyPrice: 65.00 },
  { model: 'Prius', brand: 'Toyota', dailyPrice: 40.00 },
  { model: 'Tacoma', brand: 'Toyota', dailyPrice: 70.00 },
  { model: 'Sienna', brand: 'Toyota', dailyPrice: 75.00 },
  { model: '4Runner', brand: 'Toyota', dailyPrice: 80.00 },

  // Honda (6 models)
  { model: 'Civic', brand: 'Honda', dailyPrice: 38.00 },
  { model: 'Accord', brand: 'Honda', dailyPrice: 48.00 },
  { model: 'CR-V', brand: 'Honda', dailyPrice: 52.00 },
  { model: 'Pilot', brand: 'Honda', dailyPrice: 68.00 },
  { model: 'Odyssey', brand: 'Honda', dailyPrice: 72.00 },
  { model: 'HR-V', brand: 'Honda', dailyPrice: 42.00 },

  // Ford (7 models)
  { model: 'F-150', brand: 'Ford', dailyPrice: 75.00 },
  { model: 'Explorer', brand: 'Ford', dailyPrice: 65.00 },
  { model: 'Mustang', brand: 'Ford', dailyPrice: 85.00 },
  { model: 'Escape', brand: 'Ford', dailyPrice: 50.00 },
  { model: 'Edge', brand: 'Ford', dailyPrice: 58.00 },
  { model: 'Ranger', brand: 'Ford', dailyPrice: 68.00 },
  { model: 'Expedition', brand: 'Ford', dailyPrice: 90.00 },

  // Chevrolet (6 models)
  { model: 'Silverado', brand: 'Chevrolet', dailyPrice: 72.00 },
  { model: 'Equinox', brand: 'Chevrolet', dailyPrice: 48.00 },
  { model: 'Malibu', brand: 'Chevrolet', dailyPrice: 42.00 },
  { model: 'Traverse', brand: 'Chevrolet', dailyPrice: 62.00 },
  { model: 'Tahoe', brand: 'Chevrolet', dailyPrice: 95.00 },
  { model: 'Colorado', brand: 'Chevrolet', dailyPrice: 65.00 },

  // Nissan (5 models)
  { model: 'Altima', brand: 'Nissan', dailyPrice: 40.00 },
  { model: 'Rogue', brand: 'Nissan', dailyPrice: 50.00 },
  { model: 'Sentra', brand: 'Nissan', dailyPrice: 35.00 },
  { model: 'Pathfinder', brand: 'Nissan', dailyPrice: 70.00 },
  { model: 'Frontier', brand: 'Nissan', dailyPrice: 62.00 },

  // Hyundai (5 models)
  { model: 'Elantra', brand: 'Hyundai', dailyPrice: 36.00 },
  { model: 'Sonata', brand: 'Hyundai', dailyPrice: 44.00 },
  { model: 'Tucson', brand: 'Hyundai', dailyPrice: 48.00 },
  { model: 'Santa Fe', brand: 'Hyundai', dailyPrice: 58.00 },
  { model: 'Palisade', brand: 'Hyundai', dailyPrice: 72.00 },

  // Mazda (4 models)
  { model: 'Mazda3', brand: 'Mazda', dailyPrice: 38.00 },
  { model: 'Mazda6', brand: 'Mazda', dailyPrice: 46.00 },
  { model: 'CX-5', brand: 'Mazda', dailyPrice: 52.00 },
  { model: 'CX-9', brand: 'Mazda', dailyPrice: 64.00 },

  // Volkswagen (4 models)
  { model: 'Jetta', brand: 'Volkswagen', dailyPrice: 39.00 },
  { model: 'Passat', brand: 'Volkswagen', dailyPrice: 47.00 },
  { model: 'Tiguan', brand: 'Volkswagen', dailyPrice: 53.00 },
  { model: 'Atlas', brand: 'Volkswagen', dailyPrice: 67.00 },

  // Subaru (4 models)
  { model: 'Outback', brand: 'Subaru', dailyPrice: 55.00 },
  { model: 'Forester', brand: 'Subaru', dailyPrice: 52.00 },
  { model: 'Crosstrek', brand: 'Subaru', dailyPrice: 46.00 },
  { model: 'Ascent', brand: 'Subaru', dailyPrice: 68.00 },

  // Jeep (5 models)
  { model: 'Wrangler', brand: 'Jeep', dailyPrice: 78.00 },
  { model: 'Grand Cherokee', brand: 'Jeep', dailyPrice: 72.00 },
  { model: 'Cherokee', brand: 'Jeep', dailyPrice: 58.00 },
  { model: 'Compass', brand: 'Jeep', dailyPrice: 48.00 },
  { model: 'Renegade', brand: 'Jeep', dailyPrice: 42.00 },

  // BMW (5 models)
  { model: '3 Series', brand: 'BMW', dailyPrice: 95.00 },
  { model: '5 Series', brand: 'BMW', dailyPrice: 115.00 },
  { model: 'X3', brand: 'BMW', dailyPrice: 105.00 },
  { model: 'X5', brand: 'BMW', dailyPrice: 125.00 },
  { model: 'X1', brand: 'BMW', dailyPrice: 88.00 },

  // Mercedes-Benz (4 models)
  { model: 'C-Class', brand: 'Mercedes-Benz', dailyPrice: 98.00 },
  { model: 'E-Class', brand: 'Mercedes-Benz', dailyPrice: 120.00 },
  { model: 'GLC', brand: 'Mercedes-Benz', dailyPrice: 108.00 },
  { model: 'GLE', brand: 'Mercedes-Benz', dailyPrice: 130.00 },

  // Audi (4 models)
  { model: 'A4', brand: 'Audi', dailyPrice: 92.00 },
  { model: 'A6', brand: 'Audi', dailyPrice: 112.00 },
  { model: 'Q5', brand: 'Audi', dailyPrice: 102.00 },
  { model: 'Q7', brand: 'Audi', dailyPrice: 122.00 },

  // Lexus (4 models)
  { model: 'ES', brand: 'Lexus', dailyPrice: 95.00 },
  { model: 'RX', brand: 'Lexus', dailyPrice: 105.00 },
  { model: 'NX', brand: 'Lexus', dailyPrice: 90.00 },
  { model: 'GX', brand: 'Lexus', dailyPrice: 115.00 },

  // Kia (5 models)
  { model: 'Forte', brand: 'Kia', dailyPrice: 35.00 },
  { model: 'Optima', brand: 'Kia', dailyPrice: 43.00 },
  { model: 'Sportage', brand: 'Kia', dailyPrice: 49.00 },
  { model: 'Sorento', brand: 'Kia', dailyPrice: 59.00 },
  { model: 'Telluride', brand: 'Kia', dailyPrice: 70.00 },

  // GMC (3 models)
  { model: 'Sierra', brand: 'GMC', dailyPrice: 76.00 },
  { model: 'Acadia', brand: 'GMC', dailyPrice: 64.00 },
  { model: 'Terrain', brand: 'GMC', dailyPrice: 54.00 },

  // Ram (2 models)
  { model: '1500', brand: 'Ram', dailyPrice: 74.00 },
  { model: '2500', brand: 'Ram', dailyPrice: 88.00 },

  // Dodge (3 models)
  { model: 'Charger', brand: 'Dodge', dailyPrice: 72.00 },
  { model: 'Challenger', brand: 'Dodge', dailyPrice: 82.00 },
  { model: 'Durango', brand: 'Dodge', dailyPrice: 68.00 },

  // Acura (3 models)
  { model: 'TLX', brand: 'Acura', dailyPrice: 75.00 },
  { model: 'RDX', brand: 'Acura', dailyPrice: 85.00 },
  { model: 'MDX', brand: 'Acura', dailyPrice: 95.00 },

  // Infiniti (3 models)
  { model: 'Q50', brand: 'Infiniti', dailyPrice: 78.00 },
  { model: 'QX50', brand: 'Infiniti', dailyPrice: 88.00 },
  { model: 'QX60', brand: 'Infiniti', dailyPrice: 98.00 },

  // Cadillac (3 models)
  { model: 'XT4', brand: 'Cadillac', dailyPrice: 85.00 },
  { model: 'XT5', brand: 'Cadillac', dailyPrice: 95.00 },
  { model: 'Escalade', brand: 'Cadillac', dailyPrice: 145.00 },

  // Lincoln (3 models)
  { model: 'Corsair', brand: 'Lincoln', dailyPrice: 88.00 },
  { model: 'Nautilus', brand: 'Lincoln', dailyPrice: 98.00 },
  { model: 'Aviator', brand: 'Lincoln', dailyPrice: 118.00 },

  // Volvo (3 models)
  { model: 'S60', brand: 'Volvo', dailyPrice: 82.00 },
  { model: 'XC60', brand: 'Volvo', dailyPrice: 92.00 },
  { model: 'XC90', brand: 'Volvo', dailyPrice: 112.00 },

  // Buick (3 models)
  { model: 'Encore', brand: 'Buick', dailyPrice: 46.00 },
  { model: 'Envision', brand: 'Buick', dailyPrice: 56.00 },
  { model: 'Enclave', brand: 'Buick', dailyPrice: 66.00 },

  // Chrysler (2 models)
  { model: 'Pacifica', brand: 'Chrysler', dailyPrice: 68.00 },
  { model: '300', brand: 'Chrysler', dailyPrice: 64.00 },

  // Mitsubishi (3 models)
  { model: 'Outlander', brand: 'Mitsubishi', dailyPrice: 44.00 },
  { model: 'Eclipse Cross', brand: 'Mitsubishi', dailyPrice: 42.00 },
  { model: 'Outlander Sport', brand: 'Mitsubishi', dailyPrice: 40.00 },

  // Genesis (3 models)
  { model: 'G70', brand: 'Genesis', dailyPrice: 88.00 },
  { model: 'G80', brand: 'Genesis', dailyPrice: 108.00 },
  { model: 'GV80', brand: 'Genesis', dailyPrice: 118.00 },

  // Porsche (2 models)
  { model: 'Macan', brand: 'Porsche', dailyPrice: 155.00 },
  { model: 'Cayenne', brand: 'Porsche', dailyPrice: 185.00 },

  // Land Rover (2 models)
  { model: 'Range Rover Evoque', brand: 'Land Rover', dailyPrice: 125.00 },
  { model: 'Range Rover Sport', brand: 'Land Rover', dailyPrice: 165.00 },

  // Jaguar (2 models)
  { model: 'F-PACE', brand: 'Jaguar', dailyPrice: 115.00 },
  { model: 'E-PACE', brand: 'Jaguar', dailyPrice: 95.00 },

  // Mini (2 models)
  { model: 'Cooper', brand: 'Mini', dailyPrice: 58.00 },
  { model: 'Countryman', brand: 'Mini', dailyPrice: 68.00 },

  // Tesla (4 models)
  { model: 'Model 3', brand: 'Tesla', dailyPrice: 95.00 },
  { model: 'Model Y', brand: 'Tesla', dailyPrice: 105.00 },
  { model: 'Model S', brand: 'Tesla', dailyPrice: 145.00 },
  { model: 'Model X', brand: 'Tesla', dailyPrice: 165.00 },

  // Alfa Romeo (2 models)
  { model: 'Giulia', brand: 'Alfa Romeo', dailyPrice: 92.00 },
  { model: 'Stelvio', brand: 'Alfa Romeo', dailyPrice: 102.00 },

  // Fiat (2 models)
  { model: '500X', brand: 'Fiat', dailyPrice: 38.00 },
  { model: '500L', brand: 'Fiat', dailyPrice: 36.00 },
];

async function main() {
  console.log('Starting database seed...');

  // Create default admin user
  const hashedPassword = await hashPassword('admin123');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@rental.com' },
    update: {},
    create: {
      email: 'admin@rental.com',
      password: hashedPassword,
    },
  });

  console.log(`✓ Created admin user: ${admin.email}`);

  // Create vehicles
  let createdVehicles = 0;
  for (const vehicle of vehicles) {
    await prisma.vehicle.upsert({
      where: { model_brand: { model: vehicle.model, brand: vehicle.brand } },
      update: {},
      create: vehicle,
    });
    createdVehicles++;
  }

  console.log(`✓ Created ${createdVehicles} vehicles`);

  // Count by brand
  const brands = await prisma.vehicle.groupBy({
    by: ['brand'],
    _count: {
      brand: true,
    },
  });

  console.log(`\n📊 Vehicles by brand:`);
  brands.forEach((b) => {
    console.log(`  ${b.brand}: ${b._count.brand} models`);
  });

  console.log(`\n✅ Database seeding completed successfully!`);
  console.log(`\n🔐 Default Login Credentials:`);
  console.log(`  Email: admin@rental.com`);
  console.log(`  Password: admin123`);
  console.log(`\n⚠️  Change the default password in production!`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
