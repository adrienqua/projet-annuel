export function computeCPUScore(details: any): number {
    return (
        (details.cores || 0) * 2 +
        (details.threads || 0) * 1.5 +
        (details.base_clock_GHz || 0) * 10 -
        (details.tdp_W || 0) * 0.5
    )
}

export function computeGPUScore(details: any): number {
    return (
        (details.vram_GB || 0) * 4 +
        (details.base_clock_MHz || 0) * 0.02 -
        (details.tdp_W || 0) * 0.3
    )
}

export function computeRAMScore(details: any): number {
    return (
        (details.capacity_GB || 0) * 2 +
        (details.speed_MHz || 0) * 0.01 -
        (details.latency_CL || 0) * 0.5
    )
}

export function computeStorageScore(details: any): number {
    return (
        (details.capacity_GB || 0) * 0.5 +
        (details.read_speed_MBps || 0) * 0.02 +
        (details.write_speed_MBps || 0) * 0.015
    )
}
