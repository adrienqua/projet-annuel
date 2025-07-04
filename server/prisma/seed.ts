import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {
    await prisma.manufacturer.createMany({
        data: [
            { id: 1, name: 'Intel', website: 'https://www.intel.com' },
            { id: 2, name: 'AMD', website: 'https://www.amd.com' },
            { id: 3, name: 'NVIDIA', website: 'https://www.nvidia.com' },
            { id: 4, name: 'Crucial', website: 'https://www.crucial.com' },
            { id: 5, name: 'Samsung', website: 'https://www.samsung.com/semiconductor/' },
            { id: 6, name: 'Noctua', website: 'https://noctua.at' },
            { id: 7, name: 'BeQuiet', website: 'https://www.bequiet.com' },
            { id: 8, name: 'Lian Li', website: 'https://lian-li.com' },
            { id: 9, name: 'Seasonic', website: 'https://seasonic.com' },
            { id: 10, name: 'Fractal Design', website: 'https://www.fractal-design.com' },
            { id: 11, name: 'Phanteks', website: 'https://www.phanteks.com' },
            { id: 12, name: 'ASUS', website: 'https://www.asus.com' },
            { id: 13, name: 'MSI', website: 'https://www.msi.com' },
            { id: 14, name: 'Gigabyte', website: 'https://www.gigabyte.com' },
            { id: 15, name: 'G.SKILL', website: 'https://www.gskill.com' },
            { id: 16, name: 'Corsair', website: 'https://www.corsair.com' },
            { id: 17, name: 'Fractal Design', website: 'https://www.fractal-design.com' },
        ],
    })

    await prisma.componentType.createMany({
        data: [
            { id: 1, name: 'Processeur', reference: 'cpu', slug: 'processeur' },
            { id: 2, name: 'Carte Graphique', reference: 'gpu', slug: 'carte-graphique' },
            { id: 3, name: 'Mémoire vive', reference: 'ram', slug: 'memoire-vive' },
            { id: 4, name: 'Carte Mère', reference: 'motherboard', slug: 'carte-mere' },
            { id: 5, name: 'Ventirad', reference: 'cpuCooler', slug: 'ventirad' },
            { id: 6, name: 'Stockage', reference: 'storage', slug: 'stockage' },
            { id: 7, name: 'Boitier', reference: 'case', slug: 'boitier' },
            { id: 8, name: 'Alimentation', reference: 'powerSupply', slug: 'alimentation' },
            {
                id: 9,
                name: 'Ventilateurs de boitier',
                reference: 'caseFans',
                slug: 'ventilateurs-de-boitier',
            },
        ],
    })

    await prisma.component.createMany({
        data: [
            // CPUs
            {
                release_date: new Date('2023-04-06'),
                specs: { cores: 8, threads: 16, base_clock_GHz: 4.2, tdp_W: 120 },
                oc_profiles: { boost_clock_GHz: 5.0 },
                name: 'AMD Ryzen 7 7800X3D',
                type_id: 1,
                manufacturer_id: 2, // AMD
            },
            {
                release_date: new Date('2025-05-10'),
                specs: { cores: 12, threads: 24, base_clock_GHz: 4.4, tdp_W: 125 },
                oc_profiles: { boost_clock_GHz: 5.4 },
                name: 'AMD Ryzen 9 9800X3D',
                type_id: 1,
                manufacturer_id: 2, // AMD
            },
            {
                release_date: new Date('2023-10-17'),
                specs: { cores: 24, threads: 32, base_clock_GHz: 3.2, tdp_W: 125 },
                oc_profiles: { turbo_clock_GHz: 6.0 },
                name: 'Intel Core i9-14900K',
                type_id: 1,
                manufacturer_id: 1, // Intel
            },

            // GPUs
            {
                release_date: new Date('2022-11-16'),
                specs: { memory_GB: 16, base_clock_MHz: 2205, boost_clock_MHz: 2505 },
                oc_profiles: { overclock_core_MHz: 2700 },
                name: 'NVIDIA GeForce RTX 4080',
                type_id: 2,
                manufacturer_id: 3, // NVIDIA
            },
            {
                release_date: new Date('2025-06-01'),
                specs: { memory_GB: 24, base_clock_MHz: 2300, boost_clock_MHz: 2700 },
                oc_profiles: { overclock_core_MHz: 2900 },
                name: 'NVIDIA GeForce RTX 5090',
                type_id: 2,
                manufacturer_id: 3, // NVIDIA
            },
            {
                release_date: new Date('2022-12-13'),
                specs: { memory_GB: 24, base_clock_MHz: 1900, boost_clock_MHz: 2500 },
                oc_profiles: { overclock_core_MHz: 2700 },
                name: 'AMD Radeon RX 7900 XTX',
                type_id: 2,
                manufacturer_id: 2, // AMD
            },

            // RAM
            {
                release_date: new Date('2023-03-15'),
                specs: { capacity_GB: 64, speed_MHz: 6000, type: 'DDR5' },
                oc_profiles: {
                    overclock_XMP_profile: { speed_MHz: 6400, voltage_V: 1.35 },
                },
                name: 'G.SKILL Trident Z5 RGB 2x32GB DDR5-6400',
                type_id: 3,
                manufacturer_id: 15, // G.SKILL
            },
            {
                release_date: new Date('2024-02-01'),
                specs: { capacity_GB: 32, speed_MHz: 5600, type: 'DDR5' },
                oc_profiles: {
                    overclock_XMP_profile: { speed_MHz: 6000, voltage_V: 1.35 },
                },
                name: 'Corsair Vengeance 2x16GB DDR5-5600',
                type_id: 3,
                manufacturer_id: 16, // Corsair
            },
            {
                release_date: new Date('2022-05-10'),
                specs: { capacity_GB: 16, speed_MHz: 3200, type: 'DDR4' },
                oc_profiles: { overclock_XMP_profile: { speed_MHz: 3600, voltage_V: 1.35 } },
                name: 'Crucial Ballistix DDR4 2x8GB',
                type_id: 3,
                manufacturer_id: 4, // Crucial
            },

            // AMD Motherboards
            {
                release_date: new Date('2023-05-15'),
                specs: {
                    chipset: 'X670E',
                    socket: 'AM5',
                    form_factor: 'ATX',
                    memory_support: 'DDR5',
                    pcie_version: 'PCIe 5.0',
                },
                oc_profiles: {},
                name: 'ASUS ROG Crosshair X670E Hero',
                type_id: 4,
                manufacturer_id: 12, // ASUS
            },
            {
                release_date: new Date('2023-02-20'),
                specs: {
                    chipset: 'B650',
                    socket: 'AM5',
                    form_factor: 'mATX',
                    memory_support: 'DDR5',
                    pcie_version: 'PCIe 4.0',
                },
                oc_profiles: {},
                name: 'MSI MAG B650M Mortar WiFi',
                type_id: 4,
                manufacturer_id: 13, // MSI
            },
            {
                release_date: new Date('2022-10-10'),
                specs: {
                    chipset: 'X670',
                    socket: 'AM5',
                    form_factor: 'ATX',
                    memory_support: 'DDR5',
                    pcie_version: 'PCIe 5.0',
                },
                oc_profiles: {},
                name: 'Gigabyte X670 AORUS Elite AX',
                type_id: 4,
                manufacturer_id: 14, // Gigabyte
            },

            // Intel Motherboards
            {
                release_date: new Date('2022-11-01'),
                specs: {
                    chipset: 'Z790',
                    socket: 'LGA1700',
                    form_factor: 'ATX',
                    memory_support: 'DDR5',
                    pcie_version: 'PCIe 5.0',
                },
                oc_profiles: {},
                name: 'ASUS ROG Maximus Z790 Hero',
                type_id: 4,
                manufacturer_id: 12, // ASUS
            },
            {
                release_date: new Date('2023-01-12'),
                specs: {
                    chipset: 'B760',
                    socket: 'LGA1700',
                    form_factor: 'mATX',
                    memory_support: 'DDR5',
                    pcie_version: 'PCIe 4.0',
                },
                oc_profiles: {},
                name: 'MSI MAG B760M Mortar WiFi',
                type_id: 4,
                manufacturer_id: 13, // MSI
            },
            {
                release_date: new Date('2022-12-05'),
                specs: {
                    chipset: 'Z790',
                    socket: 'LGA1700',
                    form_factor: 'ATX',
                    memory_support: 'DDR5',
                    pcie_version: 'PCIe 5.0',
                },
                oc_profiles: {},
                name: 'Gigabyte Z790 AORUS Master',
                type_id: 4,
                manufacturer_id: 14, // Gigabyte
            },

            // CPU Coolers
            {
                release_date: new Date('2020-01-01'),
                specs: { type: 'Air', height_mm: 165, tdp_W: 250 },
                oc_profiles: {},
                name: 'Noctua NH-D15',
                type_id: 5,
                manufacturer_id: 6, // Noctua
            },
            {
                release_date: new Date('2018-06-10'),
                specs: { type: 'Air', height_mm: 162.8, tdp_W: 250 },
                oc_profiles: {},
                name: 'BeQuiet Dark Rock Pro 4',
                type_id: 5,
                manufacturer_id: 7, // BeQuiet
            },
            {
                release_date: new Date('2021-02-01'),
                specs: { type: 'Air', height_mm: 158, tdp_W: 220 },
                oc_profiles: {},
                name: 'Noctua NH-U12A',
                type_id: 5,
                manufacturer_id: 6, // Noctua
            },

            // Storage
            {
                release_date: new Date('2023-01-01'),
                specs: { capacity_GB: 2048, type: 'NVMe', read_MBps: 7450, write_MBps: 6900 },
                oc_profiles: {},
                name: 'Samsung 990 Pro 2TB NVMe',
                type_id: 6,
                manufacturer_id: 5, // Samsung
            },
            {
                release_date: new Date('2022-03-15'),
                specs: { capacity_GB: 1024, type: 'NVMe', read_MBps: 6600, write_MBps: 5000 },
                oc_profiles: {},
                name: 'Crucial P5 Plus 1TB NVMe',
                type_id: 6,
                manufacturer_id: 4, // Crucial
            },
            {
                release_date: new Date('2021-04-01'),
                specs: { capacity_GB: 1024, type: 'NVMe', read_MBps: 3500, write_MBps: 3000 },
                oc_profiles: {},
                name: 'Samsung 980 1TB NVMe',
                type_id: 6,
                manufacturer_id: 5, // Samsung
            },

            // Case
            {
                release_date: new Date('2022-03-01'),
                specs: {
                    form_factor: 'ATX',
                    material: 'Aluminum + Tempered Glass',
                    fan_support: 'Top/Side/Bottom',
                    compatible_psu_form_factors: ['ATX', 'SFX', 'SFX-L'],
                    compatible_motherboard_form_factors: ['Mini-ITX', 'Micro-ATX', 'ATX', 'E-ATX'],
                },
                oc_profiles: {},
                name: 'Lian Li O11 Dynamic EVO',
                type_id: 7,
                manufacturer_id: 8, // Lian Li
            },
            {
                release_date: new Date('2021-06-15'),
                specs: {
                    form_factor: 'ATX',
                    material: 'Steel + Tempered Glass',
                    fan_support: 'Front/Top/Rear',
                    compatible_psu_form_factors: ['ATX', 'SFX', 'SFX-L'],
                    compatible_motherboard_form_factors: ['Mini-ITX', 'Micro-ATX', 'ATX', 'E-ATX'],
                },
                oc_profiles: {},
                name: 'Fractal Design Meshify 2',
                type_id: 7,
                manufacturer_id: 10, // Fractal Design
            },
            {
                release_date: new Date('2023-09-10'),
                specs: {
                    form_factor: 'ATX',
                    material: 'Aluminum + Mesh Panels',
                    fan_support: 'Top/Front/Rear',
                    compatible_psu_form_factors: ['ATX', 'SFX', 'SFX-L'],
                    compatible_motherboard_form_factors: ['Mini-ITX', 'Micro-ATX', 'ATX', 'E-ATX'],
                },
                oc_profiles: {},
                name: 'Phanteks Eclipse P500A',
                type_id: 7,
                manufacturer_id: 11, // Phanteks
            },
            {
                release_date: new Date('2020-11-20'),
                specs: {
                    form_factor: 'ATX (Compact)',
                    material: 'Aluminum + Tempered Glass',
                    fan_support: 'Top/Bottom/Side/Rear',
                    compatible_psu_form_factors: ['SFX', 'SFX-L'],
                    compatible_motherboard_form_factors: ['Mini-ITX', 'Micro-ATX', 'ATX'],
                },
                oc_profiles: {},
                name: 'Lian Li O11 Dynamic Mini',
                type_id: 7,
                manufacturer_id: 8, // Lian Li
            },

            // Power Supplies
            {
                release_date: new Date('2022-07-10'),
                specs: {
                    wattage_W: 850,
                    efficiency_rating: '80+ Platinum',
                    modular: true,
                    form_factor: 'ATX',
                },
                oc_profiles: {},
                name: 'BeQuiet Straight Power 11 850W Platinum',
                type_id: 8,
                manufacturer_id: 7, // BeQuiet
            },
            {
                release_date: new Date('2021-09-01'),
                specs: {
                    wattage_W: 1000,
                    efficiency_rating: '80+ Titanium',
                    modular: true,
                    form_factor: 'ATX',
                },
                oc_profiles: {},
                name: 'Seasonic PRIME TX-1000',
                type_id: 8,
                manufacturer_id: 9, // Seasonic
            },
            {
                release_date: new Date('2023-05-01'),
                specs: {
                    wattage_W: 750,
                    efficiency_rating: '80+ Gold',
                    modular: true,
                    form_factor: 'ATX',
                },
                oc_profiles: {},
                name: 'BeQuiet Pure Power 12 M 750W',
                type_id: 8,
                manufacturer_id: 7, // BeQuiet
            },
            {
                release_date: new Date('2022-01-10'),
                specs: {
                    wattage_W: 650,
                    efficiency_rating: '80+ Gold',
                    modular: true,
                    form_factor: 'SFX',
                },
                oc_profiles: {},
                name: 'Fractal Design Ion SFX 650G',
                type_id: 8,
                manufacturer_id: 17, // Fractal Design
            },

            // Case Fans
            {
                release_date: new Date('2018-05-01'),
                specs: { size_mm: 120, rpm: 2000, noise_dBA: 22.6 },
                oc_profiles: {},
                name: 'Noctua NF-A12x25 PWM',
                type_id: 9,
                manufacturer_id: 6, // Noctua
            },
            {
                release_date: new Date('2017-06-01'),
                specs: { size_mm: 120, rpm: 1500, noise_dBA: 22.4 },
                oc_profiles: {},
                name: 'Noctua NF-F12 PWM',
                type_id: 9,
                manufacturer_id: 6, // Noctua
            },
            {
                release_date: new Date('2022-11-01'),
                specs: { size_mm: 120, rpm: 1600, noise_dBA: 18.9 },
                oc_profiles: {},
                name: 'BeQuiet Silent Wings 4 120mm PWM',
                type_id: 9,
                manufacturer_id: 7, // BeQuiet
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
