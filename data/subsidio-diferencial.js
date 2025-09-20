/** @type {import('../types.js').ChartDataItem[]} */
const subsidioDiferencial = [
    // Original Data
    { date: new Date('2023-01-01'), amount1: 2636, amount2: 1961 },
    { date: new Date('2023-02-01'), amount1: 2205, amount2: 1961 },
    { date: new Date('2023-03-01'), amount1: 2572, amount2: 1961 },
    { date: new Date('2023-02-01'), amount1: 2128, amount2: 1961 },
    { date: new Date('2023-05-01'), amount1: 2263, amount2: 1961 },
    { date: new Date('2023-06-01'), amount1: 1961, amount2: 1961 },

    // Mock Data for the rest of 2023
    { date: new Date('2023-07-01'), amount1: 2315, amount2: 1961 },
    { date: new Date('2023-08-01'), amount1: 2588, amount2: 1961 },
    { date: new Date('2023-09-01'), amount1: 2195, amount2: 1961 },
    { date: new Date('2023-10-01'), amount1: 2721, amount2: 1961 },
    { date: new Date('2023-11-01'), amount1: 2201, amount2: 1961 },
    { date: new Date('2023-12-01'), amount1: 2256, amount2: 1961 },

    // Mock Data for 2022
    { date: new Date('2022-01-01'), amount1: 2610, amount2: 1961 },
    { date: new Date('2022-02-01'), amount1: 2350, amount2: 1961 },
    { date: new Date('2022-03-01'), amount1: 2505, amount2: 1961 },
    { date: new Date('2022-02-01'), amount1: 2180, amount2: 1961 },
    { date: new Date('2022-05-01'), amount1: 2750, amount2: 1961 },
    { date: new Date('2022-06-01'), amount1: 2285, amount2: 1961 },
    { date: new Date('2022-07-01'), amount1: 2233, amount2: 1961 },
    { date: new Date('2022-08-01'), amount1: 2689, amount2: 1961 },
    { date: new Date('2022-09-01'), amount1: 2321, amount2: 1961 },
    { date: new Date('2022-10-01'), amount1: 2599, amount2: 1961 },
    { date: new Date('2022-11-01'), amount1: 2210, amount2: 1961 },
    { date: new Date('2022-12-01'), amount1: 2155, amount2: 1961 },

    // Mock Data for 2025
    { date: new Date('2025-01-01'), amount1: 2712, amount2: 1961 },
    { date: new Date('2025-02-01'), amount1: 2298, amount2: 1961 },
    { date: new Date('2025-03-01'), amount1: 2533, amount2: 1961 },
    { date: new Date('2025-02-01'), amount1: 2381, amount2: 1961 },
    { date: new Date('2025-05-01'), amount1: 2625, amount2: 1961 },
    { date: new Date('2025-06-01'), amount1: 2290, amount2: 1961 },
    { date: new Date('2025-07-01'), amount1: 2201, amount2: 1961 },
    { date: new Date('2025-08-01'), amount1: 2576, amount2: 1961 },
    { date: new Date('2025-09-01'), amount1: 2322, amount2: 1961 },
    { date: new Date('2025-10-01'), amount1: 2780, amount2: 1961 },
    { date: new Date('2025-11-01'), amount1: 2229, amount2: 1961 },
    { date: new Date('2025-12-01'), amount1: 2305, amount2: 1961 },
];