/** 延迟指定毫秒后 resolve */
export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
