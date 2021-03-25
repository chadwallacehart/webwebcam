

/*
Source: https://github.com/chuckfairy/VanillaQR.js

    MIT License

    Copyright (c) 2016 chuck fairy

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE
*/
function VanillaQR(r){var e=this;r="object"==typeof r?r:{},e.revision=3,e.imageTypes={bmp:"image/bmp",gif:"image/gif",jpeg:"image/jpeg",jpg:"image/jpg",png:"image/png","svg+xml":"image/svg+xml",tiff:"image/tiff",webp:"image/webp","x-icon":"image/x-icon"},e.toTable=r.toTable,e.domElement=e.toTable?document.createElement("div"):document.createElement("canvas"),e.url=r.url||"",e.size=r.size||280,e.qrc=!1,e.colorLight=r.colorLight||"#fff",e.colorDark=r.colorDark||"#000",e.ecclevel=r.ecclevel||1,e.noBorder=r.noBorder,e.borderSize=r.borderSize||4;var o,a,n,t,i,l,f,c=[],d=[],s=[],v=[],g=[],m=[],u=function(r,e){var o;r>e&&(o=r,r=e,e=o),o=e,o*=e,o+=e,o>>=1,o+=r,v[o]=1},h=function(r,e){var o;for(s[r+n*e]=1,o=-2;o<2;o++)s[r+o+n*(e-2)]=1,s[r-2+n*(e+o+1)]=1,s[r+2+n*(e+o)]=1,s[r+o+1+n*(e+2)]=1;for(o=0;o<2;o++)u(r-1,e+o),u(r+1,e-o),u(r-o,e-1),u(r+o,e+1)},p=function(r){for(;r>=255;)r-=255,r=(r>>8)+(255&r);return r},b=function(r,e,o,a){var n,t,i,l=VanillaQR.gexp,f=VanillaQR.glog;for(n=0;n<a;n++)c[o+n]=0;for(n=0;n<e;n++){if(i=f[c[r+n]^c[o]],255!=i)for(t=1;t<a;t++)c[o+t-1]=c[o+t]^l[p(i+m[a-t])];else for(t=o;t<o+a;t++)c[t]=c[t+1];c[o+a-1]=255==i?0:l[p(i+m[0])]}},R=function(r,e){var o;return r>e&&(o=r,r=e,e=o),o=e,o+=e*e,o>>=1,o+=r,v[o]},Q=function(r){var e,o,a,t;switch(r){case 0:for(o=0;o<n;o++)for(e=0;e<n;e++)e+o&1||R(e,o)||(s[e+o*n]^=1);break;case 1:for(o=0;o<n;o++)for(e=0;e<n;e++)1&o||R(e,o)||(s[e+o*n]^=1);break;case 2:for(o=0;o<n;o++)for(a=0,e=0;e<n;e++,a++)3==a&&(a=0),a||R(e,o)||(s[e+o*n]^=1);break;case 3:for(t=0,o=0;o<n;o++,t++)for(3==t&&(t=0),a=t,e=0;e<n;e++,a++)3==a&&(a=0),a||R(e,o)||(s[e+o*n]^=1);break;case 4:for(o=0;o<n;o++)for(a=0,t=o>>1&1,e=0;e<n;e++,a++)3==a&&(a=0,t=!t),t||R(e,o)||(s[e+o*n]^=1);break;case 5:for(t=0,o=0;o<n;o++,t++)for(3==t&&(t=0),a=0,e=0;e<n;e++,a++)3==a&&(a=0),(e&o&1)+!(!a|!t)||R(e,o)||(s[e+o*n]^=1);break;case 6:for(t=0,o=0;o<n;o++,t++)for(3==t&&(t=0),a=0,e=0;e<n;e++,a++)3==a&&(a=0),(e&o&1)+(a&&a==t)&1||R(e,o)||(s[e+o*n]^=1);break;case 7:for(t=0,o=0;o<n;o++,t++)for(3==t&&(t=0),a=0,e=0;e<n;e++,a++)3==a&&(a=0),(a&&a==t)+(e+o&1)&1||R(e,o)||(s[e+o*n]^=1)}},V=function(r){var e,o=0;for(e=0;e<=r;e++)g[e]>=5&&(o+=VanillaQR.N1+g[e]-5);for(e=3;e<r-1;e+=2)g[e-2]==g[e+2]&&g[e+2]==g[e-1]&&g[e-1]==g[e+1]&&3*g[e-1]==g[e]&&(0==g[e-3]||e+3>r||3*g[e-3]>=4*g[e]||3*g[e+3]>=4*g[e])&&(o+=VanillaQR.N3);return o},k=function(){var r,e,o,a,t,i=0,l=0;for(e=0;e<n-1;e++)for(r=0;r<n-1;r++)(s[r+n*e]&&s[r+1+n*e]&&s[r+n*(e+1)]&&s[r+1+n*(e+1)]||!(s[r+n*e]||s[r+1+n*e]||s[r+n*(e+1)]||s[r+1+n*(e+1)]))&&(i+=VanillaQR.N2);for(e=0;e<n;e++){for(g[0]=0,o=a=r=0;r<n;r++)(t=s[r+n*e])==a?g[o]++:g[++o]=1,a=t,l+=a?1:-1;i+=V(o)}l<0&&(l=-l);var f=l,c=0;for(f+=f<<2,f<<=1;f>n*n;)f-=n*n,c++;for(i+=c*VanillaQR.N4,r=0;r<n;r++){for(g[0]=0,o=a=e=0;e<n;e++)(t=s[r+n*e])==a?g[o]++:g[++o]=1,a=t;i+=V(o)}return i};e.genframe=function(r){var e,g,V,x,C,w,E,N,T=VanillaQR.eccblocks,y=VanillaQR.gexp,z=VanillaQR.glog;x=r.length,a=0;do if(a++,V=4*(o-1)+16*(a-1),t=T[V++],i=T[V++],l=T[V++],f=T[V],V=l*(t+i)+i-3+(a<=9),x<=V)break;while(a<40);for(n=17+4*a,C=l+(l+f)*(t+i)+i,x=0;x<C;x++)d[x]=0;for(c=r.slice(0),x=0;x<n*n;x++)s[x]=0;for(x=0;x<(n*(n+1)+1)/2;x++)v[x]=0;for(x=0;x<3;x++){for(V=0,g=0,1==x&&(V=n-7),2==x&&(g=n-7),s[g+3+n*(V+3)]=1,e=0;e<6;e++)s[g+e+n*V]=1,s[g+n*(V+e+1)]=1,s[g+6+n*(V+e)]=1,s[g+e+1+n*(V+6)]=1;for(e=1;e<5;e++)u(g+e,V+1),u(g+1,V+e+1),u(g+5,V+e),u(g+e+1,V+5);for(e=2;e<4;e++)s[g+e+n*(V+2)]=1,s[g+2+n*(V+e+1)]=1,s[g+4+n*(V+e)]=1,s[g+e+1+n*(V+4)]=1}if(a>1)for(x=VanillaQR.adelta[a],g=n-7;;){for(e=n-7;e>x-3&&(h(e,g),!(e<x));)e-=x;if(g<=x+9)break;g-=x,h(6,g),h(g,6)}for(s[8+n*(n-8)]=1,g=0;g<7;g++)u(7,g),u(n-8,g),u(7,g+n-7);for(e=0;e<8;e++)u(e,7),u(e+n-8,7),u(e,n-8);for(e=0;e<9;e++)u(e,8);for(e=0;e<8;e++)u(e+n-8,8),u(8,e);for(g=0;g<7;g++)u(8,g+n-7);for(e=0;e<n-14;e++)1&e?(u(8+e,6),u(6,8+e)):(s[8+e+6*n]=1,s[6+n*(8+e)]=1);if(a>6)for(x=VanillaQR.vpat[a-7],V=17,e=0;e<6;e++)for(g=0;g<3;g++,V--)1&(V>11?a>>V-12:x>>V)?(s[5-e+n*(2-g+n-11)]=1,s[2-g+n-11+n*(5-e)]=1):(u(5-e,2-g+n-11),u(2-g+n-11,5-e));for(g=0;g<n;g++)for(e=0;e<=g;e++)s[e+n*g]&&u(e,g);for(C=c.length,w=0;w<C;w++)d[w]=c.charCodeAt(w);if(c=d.slice(0),e=l*(t+i)+i,C>=e-2&&(C=e-2,a>9&&C--),w=C,a>9){for(c[w+2]=0,c[w+3]=0;w--;)x=c[w],c[w+3]|=255&x<<4,c[w+2]=x>>4;c[2]|=255&C<<4,c[1]=C>>4,c[0]=64|C>>12}else{for(c[w+1]=0,c[w+2]=0;w--;)x=c[w],c[w+2]|=255&x<<4,c[w+1]=x>>4;c[1]|=255&C<<4,c[0]=64|C>>4}for(w=C+3-(a<10);w<e;)c[w++]=236,c[w++]=17;for(m[0]=1,w=0;w<f;w++){for(m[w+1]=1,E=w;E>0;E--)m[E]=m[E]?m[E-1]^y[p(z[m[E]]+w)]:m[E-1];m[0]=y[p(z[m[0]]+w)]}for(w=0;w<=f;w++)m[w]=z[m[w]];for(V=e,g=0,w=0;w<t;w++)b(g,l,V,f),g+=l,V+=f;for(w=0;w<i;w++)b(g,l+1,V,f),g+=l+1,V+=f;for(g=0,w=0;w<l;w++){for(E=0;E<t;E++)d[g++]=c[w+E*l];for(E=0;E<i;E++)d[g++]=c[t*l+w+E*(l+1)]}for(E=0;E<i;E++)d[g++]=c[t*l+w+E*(l+1)];for(w=0;w<f;w++)for(E=0;E<t+i;E++)d[g++]=c[e+w+E*f];for(c=d,e=g=n-1,V=C=1,N=(l+f)*(t+i)+i,w=0;w<N;w++)for(x=c[w],E=0;E<8;E++,x<<=1){128&x&&(s[e+n*g]=1);do C?e--:(e++,V?0!=g?g--:(e-=2,V=!V,6==e&&(e--,g=9)):g!=n-1?g++:(e-=2,V=!V,6==e&&(e--,g-=8))),C=!C;while(R(e,g))}for(c=s.slice(0),x=0,g=3e4,V=0;V<8&&(Q(V),e=k(),e<g&&(g=e,x=V),7!=x);V++)s=c.slice(0);for(x!=V&&Q(x),g=VanillaQR.fmtword[x+(o-1<<3)],V=0;V<8;V++,g>>=1)1&g&&(s[n-1-V+8*n]=1,V<6?s[8+n*V]=1:s[8+n*(V+1)]=1);for(V=0;V<7;V++,g>>=1)1&g&&(s[8+n*(n-7+V)]=1,V?s[6-V+8*n]=1:s[7+8*n]=1);return s},e.init=function(){o=e.ecclevel;var r=e.genframe(e.url);e.toTable?e.tableWrite(r,n):e.canvasWrite(r,n)},e.init()}VanillaQR.prototype={canvasWrite:function(r,e){var o=this;if(!o.qrc&&(o.qrc=o.getContext(o.domElement),!o.qrc))return o.toTable=!0,o.domElement=document.createElement("div"),void o.tableWrite(r,e);var a=o.size,n=o.qrc;n.lineWidth=1;var t=a;t/=e+10,t=Math.round(t-.5);var i=4;o.noBorder?(n.canvas.width=n.canvas.height=t*e,i=0):n.canvas.width=n.canvas.height=a,n.clearRect(0,0,a,a),n.fillStyle=o.colorLight,n.fillRect(0,0,t*(e+8),t*(e+8)),n.fillStyle=o.colorDark;for(var l=0;l<e;l++)for(var f=0;f<e;f++)r[f*e+l]&&n.fillRect(t*(i+l),t*(i+f),t,t)},tableWrite:function(r,e){var o=this,a="border:0;border-collapse:collapse;",n=Math.round(this.size/e-3.5)+"px",t=e+(o.noBorder?0:2*o.borderSize),i=o.borderSize,l="width:"+n+";height:"+n+";",f=o.colorLight,c=o.colorDark,d=document.createElement("table");d.style.cssText=a;for(var s=document.createElement("tr"),v=document.createElement("td"),g=function(){return v.cloneNode()},m=function(){var r=g();return r.style.cssText=l+"background:"+c,r},u=function(){var r=g();return r.style.cssText=l+"background:"+f,r},h=function(r){for(var e=r.firstChild,a=0;a<o.borderSize;a++){for(var n=s.cloneNode(),i=0;i<t;i++){var l=u();n.appendChild(l)}r.appendChild(n),r.insertBefore(n.cloneNode(!0),e)}},p=function(r){for(var e=r.firstChild,o=0;o<i;o++)r.insertBefore(u(),e),r.appendChild(u())},b=0;b<e;b++){var R=s.cloneNode();d.appendChild(R);for(var Q=0;Q<e;Q++)if(1===r[b*e+Q]){var V=m();R.appendChild(V)}else{var k=u();R.appendChild(k)}o.noBorder||p(R)}o.noBorder||h(d),o.domElement.innerHTML="",o.domElement.appendChild(d)},getContext:function(r){return r.getContext&&r.getContext("2d")?r.getContext("2d"):(console.log("Browser does not have 2d Canvas support"),!1)},toImage:function(r){if(this.qrc){var e=this.imageTypes[r];if(!e)throw new Error(r+" is not a valid image type ");var o=new Image;return o.src=this.domElement.toDataURL(e),o}}},VanillaQR.adelta=[0,11,15,19,23,27,31,16,18,20,22,24,26,28,20,22,24,24,26,28,28,22,24,24,26,26,28,28,24,24,26,26,26,28,28,24,26,26,26,28,28],VanillaQR.vpat=[3220,1468,2713,1235,3062,1890,2119,1549,2344,2936,1117,2583,1330,2470,1667,2249,2028,3780,481,4011,142,3098,831,3445,592,2517,1776,2234,1951,2827,1070,2660,1345,3177],VanillaQR.fmtword=[30660,29427,32170,30877,26159,25368,27713,26998,21522,20773,24188,23371,17913,16590,20375,19104,13663,12392,16177,14854,9396,8579,11994,11245,5769,5054,7399,6608,1890,597,3340,2107],VanillaQR.eccblocks=[1,0,19,7,1,0,16,10,1,0,13,13,1,0,9,17,1,0,34,10,1,0,28,16,1,0,22,22,1,0,16,28,1,0,55,15,1,0,44,26,2,0,17,18,2,0,13,22,1,0,80,20,2,0,32,18,2,0,24,26,4,0,9,16,1,0,108,26,2,0,43,24,2,2,15,18,2,2,11,22,2,0,68,18,4,0,27,16,4,0,19,24,4,0,15,28,2,0,78,20,4,0,31,18,2,4,14,18,4,1,13,26,2,0,97,24,2,2,38,22,4,2,18,22,4,2,14,26,2,0,116,30,3,2,36,22,4,4,16,20,4,4,12,24,2,2,68,18,4,1,43,26,6,2,19,24,6,2,15,28,4,0,81,20,1,4,50,30,4,4,22,28,3,8,12,24,2,2,92,24,6,2,36,22,4,6,20,26,7,4,14,28,4,0,107,26,8,1,37,22,8,4,20,24,12,4,11,22,3,1,115,30,4,5,40,24,11,5,16,20,11,5,12,24,5,1,87,22,5,5,41,24,5,7,24,30,11,7,12,24,5,1,98,24,7,3,45,28,15,2,19,24,3,13,15,30,1,5,107,28,10,1,46,28,1,15,22,28,2,17,14,28,5,1,120,30,9,4,43,26,17,1,22,28,2,19,14,28,3,4,113,28,3,11,44,26,17,4,21,26,9,16,13,26,3,5,107,28,3,13,41,26,15,5,24,30,15,10,15,28,4,4,116,28,17,0,42,26,17,6,22,28,19,6,16,30,2,7,111,28,17,0,46,28,7,16,24,30,34,0,13,24,4,5,121,30,4,14,47,28,11,14,24,30,16,14,15,30,6,4,117,30,6,14,45,28,11,16,24,30,30,2,16,30,8,4,106,26,8,13,47,28,7,22,24,30,22,13,15,30,10,2,114,28,19,4,46,28,28,6,22,28,33,4,16,30,8,4,122,30,22,3,45,28,8,26,23,30,12,28,15,30,3,10,117,30,3,23,45,28,4,31,24,30,11,31,15,30,7,7,116,30,21,7,45,28,1,37,23,30,19,26,15,30,5,10,115,30,19,10,47,28,15,25,24,30,23,25,15,30,13,3,115,30,2,29,46,28,42,1,24,30,23,28,15,30,17,0,115,30,10,23,46,28,10,35,24,30,19,35,15,30,17,1,115,30,14,21,46,28,29,19,24,30,11,46,15,30,13,6,115,30,14,23,46,28,44,7,24,30,59,1,16,30,12,7,121,30,12,26,47,28,39,14,24,30,22,41,15,30,6,14,121,30,6,34,47,28,46,10,24,30,2,64,15,30,17,4,122,30,29,14,46,28,49,10,24,30,24,46,15,30,4,18,122,30,13,32,46,28,48,14,24,30,42,32,15,30,20,4,117,30,40,7,47,28,43,22,24,30,10,67,15,30,19,6,118,30,18,31,47,28,34,34,24,30,20,61,15,30],VanillaQR.glog=[255,0,1,25,2,50,26,198,3,223,51,238,27,104,199,75,4,100,224,14,52,141,239,129,28,193,105,248,200,8,76,113,5,138,101,47,225,36,15,33,53,147,142,218,240,18,130,69,29,181,194,125,106,39,249,185,201,154,9,120,77,228,114,166,6,191,139,98,102,221,48,253,226,152,37,179,16,145,34,136,54,208,148,206,143,150,219,189,241,210,19,92,131,56,70,64,30,66,182,163,195,72,126,110,107,58,40,84,250,133,186,61,202,94,155,159,10,21,121,43,78,212,229,172,115,243,167,87,7,112,192,247,140,128,99,13,103,74,222,237,49,197,254,24,227,165,153,119,38,184,180,124,17,68,146,217,35,32,137,46,55,63,209,91,149,188,207,205,144,135,151,178,220,252,190,97,242,86,211,171,20,42,93,158,132,60,57,83,71,109,65,162,31,45,67,216,183,123,164,118,196,23,73,236,127,12,111,246,108,161,59,82,41,157,85,170,251,96,134,177,187,204,62,90,203,89,95,176,156,169,160,81,11,245,22,235,122,117,44,215,79,174,213,233,230,231,173,232,116,214,244,234,168,80,88,175],VanillaQR.gexp=[1,2,4,8,16,32,64,128,29,58,116,232,205,135,19,38,76,152,45,90,180,117,234,201,143,3,6,12,24,48,96,192,157,39,78,156,37,74,148,53,106,212,181,119,238,193,159,35,70,140,5,10,20,40,80,160,93,186,105,210,185,111,222,161,95,190,97,194,153,47,94,188,101,202,137,15,30,60,120,240,253,231,211,187,107,214,177,127,254,225,223,163,91,182,113,226,217,175,67,134,17,34,68,136,13,26,52,104,208,189,103,206,129,31,62,124,248,237,199,147,59,118,236,197,151,51,102,204,133,23,46,92,184,109,218,169,79,158,33,66,132,21,42,84,168,77,154,41,82,164,85,170,73,146,57,114,228,213,183,115,230,209,191,99,198,145,63,126,252,229,215,179,123,246,241,255,227,219,171,75,150,49,98,196,149,55,110,220,165,87,174,65,130,25,50,100,200,141,7,14,28,56,112,224,221,167,83,166,81,162,89,178,121,242,249,239,195,155,43,86,172,69,138,9,18,36,72,144,61,122,244,245,247,243,251,235,203,139,11,22,44,88,176,125,250,233,207,131,27,54,108,216,173,71,142,0],VanillaQR.N1=3,VanillaQR.N2=3,VanillaQR.N3=40,VanillaQR.N4=10;

//Create qr object
//Minus the url, these are the defaults
let qr = new VanillaQR({

    //url: JSON.stringify({phonecam: id}),
    size: 300,

    colorLight: "#ffffff",
    colorDark: "#000000",

    //output to table or canvas
    toTable: false,

    //Ecc correction level 1-4
    ecclevel: 1,

    //Use a border or not
    noBorder: false,

    //Border size to output at
    borderSize: 4

});

//Canvas or table is stored in domElement property
document.getElementById('qr').appendChild(qr.domElement);

//You can recreate the qr code to a new url like so
//If you have appended the domElement it will change
/*
qr.url = JSON.stringify({phonecam: UUID});
qr.colorLight = "#0000000";
qr.colorDark = "#ffffff";
qr.init(); */



/**
 * Main logic
 */

let button = document.getElementById('newQr');
let idText = document.getElementById('peerIdText');
let enabledCheckbox = document.getElementById('enabledCheckbox');
let qrInfo = document.getElementById('qrInfo');
let peerStatus = document.getElementById('peerStatus');

const backgroundWindow = chrome.extension.getBackgroundPage();

// let peerId;

function updateId(){
    const id = backgroundWindow.newId();
    idText.innerText = id;
    qr.url = JSON.stringify({phonecam: id});
    qr.init();
}

enabledCheckbox.checked = backgroundWindow.enabled;
qrInfo.hidden = !enabledCheckbox.checked;
peerStatus.hidden = !enabledCheckbox.checked;

enabledCheckbox.onchange= (e)=>{
    let status = e.target.checked;
    qrInfo.hidden = !status;
    peerStatus.hidden = !enabledCheckbox.checked;
    console.log(`changed phonecam status to: ${status}`);
    backgroundWindow.enabledChange(status);
};

if(!backgroundWindow.peerId){
    console.info("No peerId found on backgroundWindow.peerId");
    updateId();
} else {
    idText.innerText = backgroundWindow.peerId;
    qr.url = JSON.stringify({phonecam: backgroundWindow.peerId});
    qr.init();
}


button.onclick = ()=> updateId();

/**
 *  Communicate with the tabs
 */
/*
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    port.postMessage({type: "request", id: tabs[0].id});
});

*/

