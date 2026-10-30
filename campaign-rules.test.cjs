'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {FORTRESSES,WORKER_COSTS,capacityOf,structureCount,levelCount,troopLevelOf,goalsFor,canAdvance,validateSave,swapStructuresAtDrop}=require('./campaign-rules.cjs');
function game(f){
 const spec=FORTRESSES[f];
 return {fortress:f,gold:0,elixir:0,diamonds:0,workers:1,wins:{1:0,2:0,3:0,4:0},attacks:0,structures:spec.structures.flatMap(([name,level,count])=>Array.from({length:count},()=>({name,level}))),walls:spec.wallCount,wallLevel:spec.wallLevel,troops:Object.fromEntries(Object.keys(spec.troops).map(n=>[n,1])),troopLevels:{...spec.troops},spells:{},crafted:Object.fromEntries(spec.spells.map(n=>[n,true]))};
}
test('F1-F4 campaign milestones preserve their required structures, troops, spells and wins',()=>{
 assert.deepEqual([1,2,3,4].map(f=>FORTRESSES[f].wins),[1,2,3,4]);
 for(let f=1;f<=4;f++){
  const spec=FORTRESSES[f],v=game(f);
  for(const [name,lvl,count] of spec.structures){assert.equal(structureCount(v,name),count,`F${f} count ${name}`);assert.equal(levelCount(v,name,lvl),count,`F${f} level ${name}`)}
  assert.equal(goalsFor(v).filter(g=>!g.ok).length,1,`Only win-gate incomplete at F${f}`);
  v.wins[f]=spec.wins;assert.equal(goalsFor(v).filter(g=>!g.ok).length,0,`All gates complete at F${f}`);
  if(f<4)assert.equal(canAdvance(v),true);else assert.equal(canAdvance(v),false,'F4 is campaign cap');
 }
});
test('F2/F3/F4 camp capacity milestones are 100/100/125 spaces',()=>{
 for(const [f,expected,level,count] of [[2,100,2,2],[3,100,3,3],[4,125,4,4]]){
  const v=game(f);assert.equal(structureCount(v,'Acampamento'),count);assert.ok(v.structures.filter(b=>b.name==='Acampamento').every(b=>b.level===level));assert.equal(capacityOf(v),expected);
 }
});
test('F3 adds three spells; F4 adds Geada Celeste and new structures/troop',()=>{
 assert.deepEqual(FORTRESSES[3].spells,['Seiva Curativa','Raízes Prendedoras','Pedra Celeste']);
 assert.deepEqual(FORTRESSES[4].spells,['Seiva Curativa','Raízes Prendedoras','Pedra Celeste','Geada Celeste']);
 for(const name of ['Torre da Águia','Armadilha de Pedra'])assert.equal(structureCount(game(4),name),1);
 assert.equal(FORTRESSES[4].troops['Águia Guerreira'],1);
});
test('Arsenal prerequisites derive F2 troop unlock levels',()=>{
 const v=game(2);v.troopLevels['Raposa Arqueira']=1;v.troopLevels['Cabrito Nervoso']=1;
 assert.equal(troopLevelOf(v,'Raposa Arqueira'),2);assert.equal(troopLevelOf(v,'Cabrito Nervoso'),3);
});
test('campaign gates block early promotion and open only after all objectives plus wins',()=>{
 const v=game(2);v.wins[2]=FORTRESSES[2].wins;
 const pending=goalsFor(v).find(g=>!g.ok);assert.ok(pending);assert.equal(canAdvance(v),false);
 const [kind,name]=pending.id.split(':');
 if(kind==='b'){const target=FORTRESSES[2].structures.find(([n,l,c])=>`${n}:${l}:${c}`===pending.id.slice(2));const b=v.structures.find(x=>x.name===target[0]);if(b)b.level=target[1];else v.structures.push({name:target[0],level:target[1]})}
 else if(kind==='t')v.troopLevels[name]=Number(pending.id.split(':')[2]);
 else if(kind==='walls'){v.walls=FORTRESSES[2].wallCount;v.wallLevel=FORTRESSES[2].wallLevel}
 else if(kind==='wins')v.wins[2]=FORTRESSES[2].wins;
 assert.equal(canAdvance(v),true);
});
test('save validator rejects malformed data',()=>{assert.equal(validateSave(game(1)),true);assert.equal(validateSave(null),false);assert.equal(validateSave({...game(1),fortress:5}),false)});
test('drag drop swaps only when release point overlaps a different building',()=>{
 const structures=[{name:'Keep'},{name:'Arsenal'}],layout={0:{x:0,y:0,width:50,height:50},1:{x:100,y:0,width:50,height:50}};
 const swapped=swapStructuresAtDrop(structures,layout,0,100,0);assert.deepEqual(swapped,[structures[1],structures[0]]);assert.notEqual(swapped,structures);
 assert.equal(swapStructuresAtDrop(structures,layout,0,0,0),structures);assert.equal(swapStructuresAtDrop(structures,layout,0,500,0),structures);
});
test('worker diamond price ladder is stable',()=>assert.deepEqual(WORKER_COSTS,[250,500,1000,2000,3500,5000]));
