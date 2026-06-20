export interface JChartPoint   { label: string; value: number }
export interface JDonutSegment { label: string; value: number; color?: string }
export interface JRadarAxis    { label: string; value: number; max?: number }
export type JSparkTrend       = 'auto' | 'up' | 'down' | 'flat'
export type JChartOrientation  = 'vertical' | 'horizontal'
