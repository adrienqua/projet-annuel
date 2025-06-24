import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {
    await prisma.manufacturer.createMany({
        data: [
            { name: 'Intel', website: 'https://www.intel.com' },
            { name: 'AMD', website: 'https://www.amd.com' },
            { name: 'NVIDIA', website: 'https://www.nvidia.com' },
        ],
    })

    await prisma.componentType.createMany({
        data: [{ name: 'CPU' }, { name: 'GPU' }, { name: 'RAM' }, { name: 'Motherboard' }],
    })

    await prisma.component.createMany({
        data: [
            {
                release_date: new Date('2021-03-30'),
                specs: { cores: 8, threads: 16, base_clock_GHz: 3.5, tdp_W: 125 },
                oc_profiles: { turbo_clock_GHz: 5.3 },
                name: 'Intel Core i9-11900K',
                type_id: 1,
                manufacturer_id: 1,
            },
            {
                release_date: new Date('2020-11-25'),
                specs: { cores: 12, threads: 24, base_clock_GHz: 3.7, tdp_W: 105 },
                oc_profiles: { boost_clock_GHz: 4.8 },
                name: 'AMD Ryzen 9 5900X',
                type_id: 1,
                manufacturer_id: 2,
            },
            {
                release_date: new Date('2020-09-17'),
                specs: { memory_GB: 10, base_clock_MHz: 1440, boost_clock_MHz: 1710 },
                oc_profiles: { overclock_core_MHz: 1800 },
                name: 'NVIDIA GeForce RTX 3080',
                type_id: 2,
                manufacturer_id: 3,
            },
            {
                release_date: new Date('2018-01-10'),
                specs: { capacity_GB: 16, speed_MHz: 3200, type: 'DDR4' },
                oc_profiles: { overclock_XMP_profile: { speed_MHz: 3600, voltage_V: 1.35 } },
                name: 'Corsair Vengeance LPX 16GB',
                type_id: 3,
                manufacturer_id: 1,
            },
            {
                release_date: new Date('2021-01-15'),
                specs: { chipset: 'Z590', form_factor: 'ATX', socket: 'LGA1200' },
                oc_profiles: {},
                name: 'ASUS ROG Strix Z590-E Gaming',
                type_id: 4,
                manufacturer_id: 1,
            },
        ],
    })

    await prisma.compatibility.createMany({
        data: [
            { component_a_id: 1, component_b_id: 5, compatible: true },
            { component_a_id: 2, component_b_id: 5, compatible: true },
            { component_a_id: 3, component_b_id: 5, compatible: true },
            { component_a_id: 4, component_b_id: 5, compatible: true },
            { component_a_id: 5, component_b_id: 1, compatible: true },
            { component_a_id: 5, component_b_id: 2, compatible: true },
            { component_a_id: 5, component_b_id: 3, compatible: true },
            { component_a_id: 5, component_b_id: 4, compatible: true },
        ],
    })

    await prisma.vendor.createMany({
        data: [
            { name: 'Amazon', website: 'https://www.amazon.com' },
            { name: 'Newegg', website: 'https://www.newegg.com' },
        ],
    })

    await prisma.vendorComponent.createMany({
        data: [
            {
                in_stock: true,
                last_checked: new Date(),
                product_url: 'https://www.amazon.com/intel-i9-11900k/dp/B08X68S6DD',
                vendor_id: 1,
                component_id: 1,
            },
            {
                in_stock: true,
                last_checked: new Date(),
                product_url: 'https://www.newegg.com/intel-core-i9-11900k/p/N82E16819118204',
                vendor_id: 2,
                component_id: 1,
            },
            {
                in_stock: true,
                last_checked: new Date(),
                product_url: 'https://www.amazon.com/amd-ryzen-9-5900x/dp/B08164VTWH',
                vendor_id: 1,
                component_id: 2,
            },
            {
                in_stock: false,
                last_checked: new Date(),
                product_url: 'https://www.newegg.com/amd-ryzen-9-5900x/p/N82E16819113668',
                vendor_id: 2,
                component_id: 2,
            },
            {
                in_stock: false,
                last_checked: new Date(),
                product_url: 'https://www.amazon.com/nvidia-rtx-3080/dp/B08HR6ZBYJ',
                vendor_id: 1,
                component_id: 3,
            },
            {
                in_stock: false,
                last_checked: new Date(),
                product_url: 'https://www.newegg.com/nvidia-geforce-rtx-3080/p/N82E16814137560',
                vendor_id: 2,
                component_id: 3,
            },
            {
                in_stock: true,
                last_checked: new Date(),
                product_url: 'https://www.amazon.com/corsair-vengeance-lpx-16gb/dp/B0143UM4TC',
                vendor_id: 1,
                component_id: 4,
            },
            {
                in_stock: true,
                last_checked: new Date(),
                product_url: 'https://www.newegg.com/corsair-16gb-2x8gb/p/N82E16820236574',
                vendor_id: 2,
                component_id: 4,
            },
            {
                in_stock: true,
                last_checked: new Date(),
                product_url: 'https://www.amazon.com/asus-rog-strix-z590-e-gaming/dp/B08P3QZ4YQ',
                vendor_id: 1,
                component_id: 5,
            },
            {
                in_stock: false,
                last_checked: new Date(),
                product_url:
                    'https://www.newegg.com/asus-rog-strix-z590-e-gaming/p/N82E16813119214',
                vendor_id: 2,
                component_id: 5,
            },
        ],
    })

    await prisma.priceHistory.createMany({
        data: [
            {
                recorded_at: new Date(Date.now() - 2 * 24 * 3600 * 1000),
                price: 539.99,
                vendor_component_id: 1,
            },
            { recorded_at: new Date(), price: 529.99, vendor_component_id: 1 },
            {
                recorded_at: new Date(Date.now() - 1 * 24 * 3600 * 1000),
                price: 539.99,
                vendor_component_id: 2,
            },
            { recorded_at: new Date(), price: 549.99, vendor_component_id: 2 },
            {
                recorded_at: new Date(Date.now() - 5 * 24 * 3600 * 1000),
                price: 569.99,
                vendor_component_id: 3,
            },
            {
                recorded_at: new Date(Date.now() - 1 * 24 * 3600 * 1000),
                price: 559.99,
                vendor_component_id: 3,
            },
            { recorded_at: new Date(), price: 579.99, vendor_component_id: 4 },
            {
                recorded_at: new Date(Date.now() - 3 * 24 * 3600 * 1000),
                price: 699.99,
                vendor_component_id: 5,
            },
            {
                recorded_at: new Date(Date.now() - 1 * 24 * 3600 * 1000),
                price: 719.99,
                vendor_component_id: 5,
            },
            {
                recorded_at: new Date(Date.now() - 2 * 24 * 3600 * 1000),
                price: 899.99,
                vendor_component_id: 6,
            },
            {
                recorded_at: new Date(Date.now() - 10 * 24 * 3600 * 1000),
                price: 79.99,
                vendor_component_id: 7,
            },
            {
                recorded_at: new Date(Date.now() - 1 * 24 * 3600 * 1000),
                price: 75.99,
                vendor_component_id: 7,
            },
            { recorded_at: new Date(), price: 76.99, vendor_component_id: 8 },
            {
                recorded_at: new Date(Date.now() - 7 * 24 * 3600 * 1000),
                price: 299.99,
                vendor_component_id: 9,
            },
            {
                recorded_at: new Date(Date.now() - 2 * 24 * 3600 * 1000),
                price: 289.99,
                vendor_component_id: 9,
            },
            { recorded_at: new Date(), price: 309.99, vendor_component_id: 10 },
        ],
    })

    await prisma.user.createMany({
        data: [
            {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000),
                name: 'Admin1',
                email: 'admin1@test.com',
                role: 'ADMIN',
                password: await bcrypt.hash('admin', 12),
            },
            {
                created_at: new Date(Date.now() - 60 * 24 * 3600 * 1000),
                name: 'Admin2',
                email: 'admin2@test.com',
                role: 'ADMIN',
                password: await bcrypt.hash('admin', 12),
            },
            {
                created_at: new Date(Date.now() - 45 * 24 * 3600 * 1000),
                name: 'Admin3',
                email: 'admin3@test.com',
                role: 'ADMIN',
                password: await bcrypt.hash('admin', 12),
            },
        ],
    })

    await prisma.build.createMany({
        data: [
            {
                created_at: new Date(Date.now() - 1 * 24 * 3600 * 1000),
                price: 2500,
                user_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                name: 'Gaming Rig - Mai 2025',
            },
            {
                created_at: new Date(Date.now() - 15 * 24 * 3600 * 1000),
                price: 1500,
                user_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                name: 'Workstation - Avril 2025',
            },
        ],
    })

    await prisma.buildItem.createMany({
        data: [
            { quantity: 1, price_each: 529.99, build_id: 1, component_id: 1 },
            { quantity: 1, price_each: 719.99, build_id: 1, component_id: 3 },
            { quantity: 2, price_each: 76.99, build_id: 1, component_id: 4 },
            { quantity: 1, price_each: 289.99, build_id: 1, component_id: 5 },
            { quantity: 1, price_each: 559.99, build_id: 2, component_id: 2 },
            { quantity: 2, price_each: 75.99, build_id: 2, component_id: 4 },
            { quantity: 1, price_each: 289.99, build_id: 2, component_id: 5 },
        ],
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
