import { ImageResponse } from 'next/og';

export const alt = 'MOVETRA Digital Solution — Website & Aplikasi untuk Pertumbuhan Bisnis';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{width:'100%',height:'100%',display:'flex',position:'relative',overflow:'hidden',background:'#061f2c',color:'white',fontFamily:'Arial, sans-serif',padding:'72px'}}>
      <div style={{position:'absolute',width:520,height:520,borderRadius:520,right:-100,top:-170,border:'85px solid rgba(77,215,128,.12)'}} />
      <div style={{position:'absolute',width:260,height:260,borderRadius:260,right:155,bottom:-95,background:'rgba(77,215,128,.12)'}} />
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',zIndex:2}}>
        <div style={{display:'flex',alignItems:'center',gap:18}}>
          <div style={{width:58,height:58,borderRadius:15,background:'#27c56c',display:'flex',alignItems:'center',justifyContent:'center',fontSize:31,fontWeight:800}}>M</div>
          <div style={{display:'flex',flexDirection:'column'}}><b style={{fontSize:29,letterSpacing:2}}>MOVETRA</b><span style={{fontSize:12,letterSpacing:6,color:'#64dc91'}}>DIGITAL SOLUTION</span></div>
        </div>
        <div style={{display:'flex',flexDirection:'column',maxWidth:900}}>
          <span style={{fontSize:17,letterSpacing:5,color:'#64dc91',fontWeight:700}}>PARTNER DIGITAL UNTUK BISNIS MODERN</span>
          <div style={{fontSize:68,lineHeight:1.06,letterSpacing:-3,marginTop:20,fontWeight:700}}>Website dan aplikasi yang mendorong pertumbuhan.</div>
          <div style={{fontSize:22,color:'#b8cec6',marginTop:24}}>Strategi · Desain · Teknologi · Dukungan</div>
        </div>
      </div>
    </div>,
    size,
  );
}
