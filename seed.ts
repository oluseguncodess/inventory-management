// seed.ts
// command to use to initialize seed with sequlize --> node --env-file=.env --experimental-strip-types seed.ts
import { Sequelize, DataTypes } from 'sequelize';
import { randomUUID } from 'node:crypto';

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  logging: false,
});

async function main() {
  try {
    console.log('🔌 Connecting...');
    await sequelize.authenticate();

    // 1. Model Definition
    const Product = sequelize.define('Product', {
      id: { 
        type: DataTypes.STRING, 
        primaryKey: true, 
        allowNull: false 
      },
      userId: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: true },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      lowStockAt: {type: DataTypes.INTEGER, allowNull: false}
      // Note: We do NOT need to define createdAt/updatedAt here
      // because timestamps: true handles them automatically.
    }, {
      tableName: 'Product',
      timestamps: true,        // <--- ENABLE AUTO DATES
      createdAt: 'createdAt',  // Point to exact Prisma column name
      updatedAt: 'updatedAt'   // Point to exact Prisma column name
    });

    console.log('🌱 Generating data...');
    const demoUserId = process.env.SEED_PHRASE;

    const categories = ['Electronics', 'Furniture', 'Accessories', 'Office Supplies', 'Toys', 'Eggs'];

    const productsData = Array.from({ length: 25 }).map((_, i) => ({
      id: randomUUID(),
      userId: demoUserId,
      name: `Product ${1 + i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      // We removed the manual dates here. Sequelize will add them automatically now.
    }));

    await Product.bulkCreate(productsData);
    console.log('✅ Seeding complete!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
}

main();