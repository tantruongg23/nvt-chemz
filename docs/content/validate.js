const fs=require('fs'),p=require('path');const d=process.argv[2]||'web/data';
// Nếu thư mục có chapters.json → kiểm tra gộp mọi chương (dir "" = thư mục gốc, "c2" = d/c2, null = chưa có).
// Nếu không → kiểm tra riêng một thư mục (ví dụ web/data/c2 khi đang soạn một chương).
const man=p.join(d,'chapters.json');
const dirs=fs.existsSync(man)?JSON.parse(fs.readFileSync(man,'utf8')).filter(c=>c.dir!=null).map(c=>p.join(d,c.dir)):[d];
const L=f=>dirs.flatMap(x=>{const fp=p.join(x,f);return fs.existsSync(fp)?JSON.parse(fs.readFileSync(fp,'utf8')):[]});
console.log('dirs',dirs.join(', '));
const mc=L('misconceptions.json'),le=L('lessons.json'),te=L('terms.json'),qs=L('questions.json');
const err=[];const uniq=(a,k,n)=>{const s=new Set();a.forEach(x=>{if(s.has(x[k]))err.push(n+' dup '+x[k]);s.add(x[k])});return s};
const M=uniq(mc,'code','mc'),Ls=uniq(le,'id','lesson'),T=uniq(te,'id','term');uniq(qs,'id','q');uniq(te,'en','term-en');
mc.forEach(m=>{['code','title','description','lessons','remedy','example_wrong','example_right'].forEach(k=>{if(!m[k])err.push(m.code+' missing '+k)});m.lessons.forEach(l=>Ls.has(l)||err.push(m.code+' bad lesson '+l))});
le.forEach(l=>{['id','title','title_en','summary','sections','key_formulas'].forEach(k=>{if(!l[k])err.push(l.id+' missing '+k)});l.sections.forEach(s=>s.terms.forEach(t=>T.has(t)||err.push(l.id+' bad term '+t)))});
te.forEach(t=>{['id','en','vi','ipa','pos','lesson','definition_vi','example_en','example_vi'].forEach(k=>{if(!t[k])err.push(t.id+' missing '+k)});Ls.has(t.lesson)||err.push(t.id+' bad lesson')});
const cnt={type:{},level:{},lesson:{},chapter:{}},cov={};let tagged=0,wrong=0;
const tag=(code,q)=>{if(code===null)return;if(!M.has(code))err.push(q.id+' bad M '+code);cov[code]=cov[code]||{};cov[code][q.lesson]=(cov[code][q.lesson]||0)+1};
qs.forEach(q=>{['id','lesson','type','level','stem','terms','explanation'].forEach(k=>{if(!q[k])err.push(q.id+' missing '+k)});
 if(q.reviewed!==false)err.push(q.id+' reviewed!=false');if(!q.id.startsWith('Q-'+q.lesson+'-'))err.push(q.id+' lesson mismatch');
 if(!['NB','TH','VD'].includes(q.level))err.push(q.id+' level');
 q.terms.forEach(t=>T.has(t)||err.push(q.id+' bad term '+t));
 ['type','level','lesson','chapter'].forEach(k=>cnt[k][q[k]]=(cnt[k][q[k]]||0)+1);
 if(q.type==='mcq'){const keys=q.options.map(o=>o.key);if(!keys.includes(q.answer))err.push(q.id+' answer missing');if(new Set(keys).size!==keys.length)err.push(q.id+' dup keys');
  q.options.forEach(o=>{if(!('misconception' in o))err.push(q.id+' opt no misc field');if(o.key===q.answer){if(o.misconception)err.push(q.id+' correct opt tagged')}else{wrong++;if(o.misconception)tagged++;}tag(o.misconception,q)})}
 else if(q.type==='true_false'){if(q.statements.length!==4)err.push(q.id+' not 4 stmts');q.statements.forEach(s=>{if(typeof s.answer!=='boolean')err.push(q.id+' tf answer');if(s.answer===true&&s.misconception)err.push(q.id+' true stmt tagged '+s.key);tag(s.misconception,q)})}
 else if(q.type==='short'){if(typeof q.answer!=='string'||isNaN(+q.answer))err.push(q.id+' short answer');if(typeof q.tolerance!=='number')err.push(q.id+' tol');if(!('unit' in q))err.push(q.id+' unit');(q.misconception_hints||[]).forEach(h=>tag(h.misconception,q))}
 else err.push(q.id+' bad type')});
console.log({misconceptions:mc.length,lessons:le.length,terms:te.length,questions:qs.length,...cnt,mcqDistractorsTagged:tagged+'/'+wrong});
console.log('coverage',JSON.stringify(cov));console.log(err.length?'ERRORS:\n'+err.join('\n'):'ALL CHECKS PASSED');
