// Procedural sound: no network audio downloads, unlocked by a user gesture.
(() => {
  let enabled=true,ctx,master,tire,brake,squeal,tireFilter;
  function levels(speed,drifting,braking){const n=Math.max(0,Math.min(1,speed/330));return {tire:Math.pow(n,1.4)*(drifting?.16:.065),brake:braking?Math.pow(n,1.3)*.13:0,pitch:650+n*1150}}
  function init(){
    if(ctx)return true;const Audio=globalThis.AudioContext||globalThis.webkitAudioContext;if(!Audio)return false;
    ctx=new Audio();master=ctx.createGain();master.gain.value=enabled?.7:0;
    const limiter=ctx.createDynamicsCompressor();limiter.threshold.value=-14;limiter.ratio.value=8;master.connect(limiter);limiter.connect(ctx.destination);
    const buffer=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
    const noise=ctx.createBufferSource();noise.buffer=buffer;noise.loop=true;
    tireFilter=ctx.createBiquadFilter();tireFilter.type='bandpass';tireFilter.Q.value=.7;tire=ctx.createGain();tire.gain.value=0;noise.connect(tireFilter);tireFilter.connect(tire);tire.connect(master);
    const brakeFilter=ctx.createBiquadFilter();brakeFilter.type='bandpass';brakeFilter.frequency.value=2200;brakeFilter.Q.value=1.8;brake=ctx.createGain();brake.gain.value=0;noise.connect(brakeFilter);brakeFilter.connect(brake);brake.connect(master);
    squeal=ctx.createOscillator();squeal.type='triangle';const tone=ctx.createGain();tone.gain.value=.24;squeal.connect(tone);tone.connect(brake);noise.start();squeal.start();return true;
  }
  function unlock(){try{if(init()&&ctx.state==='suspended')ctx.resume().catch(()=>{})}catch{}}
  function stopMotion(){if(!ctx)return;for(const node of [tire,brake]){node.gain.cancelScheduledValues(ctx.currentTime);node.gain.setTargetAtTime(0,ctx.currentTime,.025)}}
  function setEnabled(value){enabled=!!value;if(enabled)unlock();if(master)master.gain.setTargetAtTime(enabled?.7:0,ctx.currentTime,.025);if(!enabled)stopMotion();return enabled}
  function update(speed,drifting,braking){if(!ctx||!enabled)return;const v=levels(speed,drifting,braking),t=ctx.currentTime;tire.gain.setTargetAtTime(v.tire,t,.06);brake.gain.setTargetAtTime(v.brake,t,.035);tireFilter.frequency.setTargetAtTime(450+Math.min(speed,330)*4,t,.08);squeal.frequency.setTargetAtTime(v.pitch,t,.05)}
  function ding(){if(!ctx||!enabled)return;const t=ctx.currentTime;for(const [frequency,delay]of [[1046.5,0],[1568,.055]]){const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.setValueAtTime(0,t+delay);gain.gain.linearRampToValueAtTime(.12,t+delay+.008);gain.gain.exponentialRampToValueAtTime(.0001,t+delay+.6);osc.connect(gain);gain.connect(master);osc.start(t+delay);osc.stop(t+delay+.65);osc.onended=()=>{osc.disconnect();gain.disconnect()}}}
  globalThis.RaceSound={unlock,setEnabled,update,stopMotion,ding,levels,get enabled(){return enabled}};
})();
