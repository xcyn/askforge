/**
 * AskForge 品牌标：黄底圆角矩形 + 白色五角星 SVG。
 * size 控制像素边长；装饰性，aria-hidden。
 */
export function BrandLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ display: 'block', flexShrink: 0 }}
    >
      <rect width="32" height="32" rx="8" fill="#e8b20a" />
      <path
        d="M16 6.2 L18.35 13.05 L25.6 13.05 L19.72 17.3 L21.98 24.2 L16 19.95 L10.02 24.2 L12.28 17.3 L6.4 13.05 L13.65 13.05 Z"
        fill="#fff"
      />
    </svg>
  )
}
