(() => {
'use strict';
const O={
  broadcasts:'https://www.churchofjesuschrist.org/media/broadcasts/?lang=eng',
  youtube:'https://www.youtube.com/@churchofjesuschristgeneralconference',
  byutv:'https://www.byutv.org/',
  ways:'https://www.churchofjesuschrist.org/learn/ways-to-watch-general-conference?lang=eng',
  south:'https://www.churchofjesuschrist.org/my-home/areas/africa-south/general-conference-africa-south?lang=eng',
  library:'https://www.churchofjesuschrist.org/learn/mobile-applications/gospel-library?lang=eng',
  study:'https://www.churchofjesuschrist.org/study/general-conference/2026/10?lang=eng'
};
const S=[
 ['sat-am','Saturday Morning','2026-10-03T16:00:00Z','2026-10-03T18:00:00Z'],
 ['sat-pm','Saturday Afternoon','2026-10-03T20:00:00Z','2026-10-03T22:00:00Z'],
 ['sun-am','Sunday Morning','2026-10-04T16:00:00Z','2026-10-04T18:00:00Z'],
 ['sun-pm','Sunday Afternoon','2026-10-04T20:00:00Z','2026-10-04T22:00:00Z']
].map(x=>({id:x[0],name:x[1],start:new Date(x[2]),end:new Date(x[3])}));
const SOUTH=new Set('AO BW SZ LS MG MW MU MZ NA RE ST ZA ZM ZW'.split(' '));
const CODES='AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ');
const TZ={'Africa/Accra':'GH','Africa/Lagos':'NG','Africa/Johannesburg':'ZA','Africa/Harare':'ZW','Africa/Lusaka':'ZM','Africa/Gaborone':'BW','Africa/Maputo':'MZ','Africa/Windhoek':'NA','Africa/Blantyre':'MW','Africa/Maseru':'LS','Africa/Mbabane':'SZ','Africa/Luanda':'AO','Indian/Mauritius':'MU','Indian/Antananarivo':'MG','Europe/London':'GB','America/Toronto':'CA','America/Vancouver':'CA','America/New_York':'US','America/Chicago':'US','America/Denver':'US','America/Los_Angeles':'US','Asia/Manila':'PH','Asia/Tokyo':'JP','Asia/Seoul':'KR','Asia/Kolkata':'IN','Australia/Sydney':'AU','Pacific/Auckland':'NZ'};
const $=id=>document.getElementById(id);
const E={days:$('days'),hours:$('hours'),minutes:$('minutes'),seconds:$('seconds'),status:$('statusText'),dot:$('statusDot'),countdown:$('countdown'),tz:$('timezoneLabel'),grid:$('sessionGrid'),nextCal:$('addNextCalendar'),country:$('countrySelect'),summary:$('countrySummary'),options:$('watchOptions'),watch:$('primaryWatch')};
const zone=Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC';
E.tz.textContent=zone.replaceAll('_',' ');
const state=(s,n=new Date())=>n>=s.start&&n<s.end?'live':n>=s.end?'complete':'upcoming';
function current(n=new Date()){
 const live=S.find(s=>state(s,n)==='live'); if(live)return{session:live,state:'live'};
 const next=S.find(s=>s.start>n); return next?{session:next,state:'upcoming'}:{session:S[3],state:'complete'};
}
const time=d=>new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit',timeZoneName:'short'}).format(d);
const date=d=>new Intl.DateTimeFormat(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(d);
const pad=n=>String(Math.max(0,n)).padStart(2,'0');
function renderSessions(){
 const rel=current();
 E.grid.innerHTML=S.map(s=>{
   const st=state(s), badge=st==='live'?'Live now':st==='complete'?'Finished':rel.state==='upcoming'&&rel.session.id===s.id?'Next session':'Upcoming';
   return '<article class="session-card '+st+' '+(badge==='Next session'?'next':'')+'"><div><span class="session-badge">'+badge+'</span><h3>'+s.name+'</h3><div class="session-time">'+time(s.start)+'</div><div class="session-date">'+date(s.start)+'</div></div><div class="session-meta"><span>2 hours</span><button class="session-calendar" type="button" data-calendar="'+s.id+'">Add to calendar</button></div></article>';
 }).join('');
}
function tick(){
 const n=new Date(), r=current(n), s=r.session; E.dot.classList.toggle('live',r.state==='live');
 if(r.state==='complete'){
   ['days','hours','minutes','seconds'].forEach(k=>E[k].textContent='00');
   E.status.textContent='October 2026 conference has concluded. Replays and messages are available.';
   E.countdown.setAttribute('aria-label','Conference has concluded'); E.nextCal.disabled=true; E.nextCal.textContent='Conference concluded'; E.watch.textContent='Watch conference messages'; E.watch.href=O.study; return;
 }
 const target=r.state==='live'?s.end:s.start, diff=Math.max(0,target-n), sec=Math.floor(diff/1000);
 E.days.textContent=pad(Math.floor(sec/86400)); E.hours.textContent=pad(Math.floor(sec%86400/3600)); E.minutes.textContent=pad(Math.floor(sec%3600/60)); E.seconds.textContent=pad(sec%60);
 E.status.textContent=r.state==='live'?s.name+' is live now · ends around '+time(s.end):s.name+' begins '+date(s.start)+' at '+time(s.start);
 E.countdown.setAttribute('aria-label',r.state==='live'?'Time remaining in live session':'Countdown to next conference session');
 E.nextCal.disabled=r.state==='live'; E.nextCal.textContent=r.state==='live'?'Session is live':'Add next session to calendar';
}
const esc=s=>s.replace(/([,;\\])/g,'\\$1').replace(/\n/g,'\\n');
const ics=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
function calendar(s){
 const body=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Conference Countdown//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:'+s.id+'-2026-general-conference@conference-countdown','DTSTAMP:'+ics(new Date()),'DTSTART:'+ics(s.start),'DTEND:'+ics(s.end),'SUMMARY:'+esc('October 2026 General Conference — '+s.name),'DESCRIPTION:'+esc('Official broadcast: '+O.broadcasts),'URL:'+O.broadcasts,'END:VEVENT','END:VCALENDAR'].join('\r\n');
 const u=URL.createObjectURL(new Blob([body],{type:'text/calendar;charset=utf-8'})), a=document.createElement('a'); a.href=u;a.download='general-conference-'+s.id+'.ics';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);
}
function name(c){try{return new Intl.DisplayNames([navigator.language||'en'],{type:'region'}).of(c)||c}catch{return c}}
function saved(){try{return localStorage.getItem('conference-country')}catch{return null}}
function save(c){try{localStorage.setItem('conference-country',c)}catch{}}
function localeCountry(){try{const l=new Intl.Locale(navigator.language||'en').maximize();return l.region||null}catch{return null}}
function defaultCountry(){const s=saved();if(s&&CODES.includes(s))return s;if(TZ[zone])return TZ[zone];const l=localeCountry();return l&&CODES.includes(l)?l:'US'}
function buildCountries(){
 const coll=new Intl.Collator(navigator.language||'en');
 CODES.map(c=>({c,n:name(c)})).sort((a,b)=>coll.compare(a.n,b.n)).forEach(x=>{const o=document.createElement('option');o.value=x.c;o.textContent=x.n;E.country.appendChild(o)});
 E.country.value=defaultCountry();
}
function card(label,desc,href,icon,regional=false){return '<a class="watch-card '+(regional?'regional':'')+'" href="'+href+'" target="_blank" rel="noreferrer"><span class="icon-box" aria-hidden="true">'+icon+'</span><span><strong>'+label+'</strong><small>'+desc+'</small></span><span class="arrow" aria-hidden="true">↗</span></a>'}
function country(c){
 save(c);const n=name(c);
 let heading='Official worldwide streams are available in '+n+'.', text='No country-specific October 2026 TV or radio option is shown unless it is verified from an official Church source.';
 let opts=[
  card('Church broadcasts','Official video or lower-bandwidth audio, with broad language support.',O.broadcasts,'▶'),
  card('General Conference on YouTube','Official conference channel with live streams in multiple languages.',O.youtube,'YT'),
  card('Gospel Library','Watch live in many languages and return later for messages and study.',O.library,'GL'),
  card('BYUtv','All general sessions streamed live in English.',O.byutv,'TV')
 ];
 if(SOUTH.has(c)){heading='Verified regional details are available for '+n+'.';text='The Africa South Area has published local viewing information for this conference.';opts.unshift(card(n+' local broadcast details','Official Africa South page with local viewing times and country-specific broadcast information.',O.south,'◉',true))}
 else if(c==='US'||c==='CA'){heading='Extra TV and radio options are listed for '+n+'.';text='The official Church viewing guide includes additional television and radio methods.';opts.push(card('TV and radio options','See the current official viewing guide for local television and radio methods.',O.ways,'◫',true))}
 else if(c==='GH'){heading='For Ghana, the verified options are currently the global official streams.';text='I could not verify a Ghana-specific October 2026 TV or radio listing from an official Church source, so this page does not invent one. Accra and Kumasi session times are converted automatically above.'}
 else opts.push(card('Check all official viewing methods','See the Church’s current guide for apps, television, radio, smart speakers and replay options.',O.ways,'+',true));
 E.summary.innerHTML='<strong>'+heading+'</strong><p>'+text+'</p>';E.options.innerHTML=opts.join('');
}
E.grid.addEventListener('click',e=>{const b=e.target.closest('[data-calendar]');if(!b)return;const s=S.find(x=>x.id===b.dataset.calendar);if(s)calendar(s)});
E.nextCal.addEventListener('click',()=>{const r=current();if(r.state==='upcoming')calendar(r.session)});
E.country.addEventListener('change',()=>country(E.country.value));
buildCountries();country(E.country.value);renderSessions();tick();setInterval(()=>{tick();if(new Date().getSeconds()<2)renderSessions()},1000);
})();