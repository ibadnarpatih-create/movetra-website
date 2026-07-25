import type { Config } from 'tailwindcss';
export default { content:['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],theme:{extend:{colors:{navy:'#071a2f',emerald:'#0b8f4d',mint:'#dff7e9'},fontFamily:{sans:['var(--font-manrope)']}}},plugins:[]} satisfies Config;
