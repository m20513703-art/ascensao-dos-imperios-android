'use strict';
const SAVE_KEY='ascensao.campaign.f1-f4.v1';
const WORKER_COSTS=[250,500,1000,2000,3500,5000];
const FORTRESSES={
  1:{name:'Fortaleza 1 • O Despertar',wins:1,capacity:30,wallCount:0,wallLevel:0,wallColor:'—',structures:[['Fortaleza Central',1,1],['Arsenal',1,1],['Acampamento',1,1],['Torre Bombardeira',1,1],['Mina de Ouro',1,1],['Coletor de Elixir Verde',1,1]],troops:{'Coelho Guerreiro':1},spells:[]},
  2:{name:'Fortaleza 2 • Terras Azuis',wins:2,capacity:100,wallCount:25,wallLevel:2,wallColor:'azul',structures:[['Fortaleza Central',2,1],['Arsenal',3,1],['Acampamento',2,2],['Torre Bombardeira',2,1],['Mina de Ouro',2,2],['Coletor de Elixir Verde',2,2],['Depósito de Ouro',2,1],['Depósito de Elixir Verde',2,1],['Torre Raposa',2,1]],troops:{'Coelho Guerreiro':1,'Raposa Arqueira':2,'Cabrito Nervoso':3},spells:[]},
  3:{name:'Fortaleza 3 • Bosque Dourado',wins:3,capacity:100,wallCount:50,wallLevel:3,wallColor:'amarela',structures:[['Fortaleza Central',3,1],['Arsenal',4,1],['Acampamento',3,3],['Torre Bombardeira',3,1],['Mina de Ouro',3,2],['Coletor de Elixir Verde',3,2],['Depósito de Ouro',3,1],['Depósito de Elixir Verde',3,1],['Torre Raposa',3,2],['Santuário das Feras',1,1],['Caldeirão Arcano',1,1],['Canhão de Pedras',1,1],['Armadilha de Corda',1,1]],troops:{'Coelho Guerreiro':2,'Raposa Arqueira':2,'Cabrito Nervoso':2,'Gato Quebra-Muros':2},spells:['Seiva Curativa','Raízes Prendedoras','Pedra Celeste']},
  4:{name:'Fortaleza 4 • Cume Celeste',wins:4,capacity:125,wallCount:50,wallLevel:4,wallColor:'amarela',structures:[['Fortaleza Central',4,1],['Arsenal',5,1],['Acampamento',4,4],['Torre Bombardeira',4,1],['Mina de Ouro',4,2],['Coletor de Elixir Verde',4,2],['Depósito de Ouro',4,1],['Depósito de Elixir Verde',4,1],['Torre Raposa',4,2],['Santuário das Feras',2,1],['Caldeirão Arcano',2,1],['Canhão de Pedras',2,1],['Armadilha de Corda',2,1],['Torre da Águia',1,1],['Armadilha de Pedra',1,1]],troops:{'Coelho Guerreiro':3,'Raposa Arqueira':3,'Cabrito Nervoso':3,'Gato Quebra-Muros':3,'Águia Guerreira':1},spells:['Seiva Curativa','Raízes Prendedoras','Pedra Celeste','Geada Celeste']}
};
const C={bg:'#101812',panel:'#1b2920',tile:'#2a3c2c',line:'#435641',gold:'#f0b84b',text:'#f2ead8',muted:'#a5b09f',green:'#8fc85a',red:'#e36a55',blue:'#4689e8'};
const troopCost={'Coelho Guerreiro':1,'Raposa Arqueira':1,'Cabrito Nervoso':2,'Gato Quebra-Muros':4,'Águia Guerreira':5};
const troopIcon={'Coelho Guerreiro':'🐇','Raposa Arqueira':'🦊','Cabrito Nervoso':'🐐','Gato Quebra-Muros':'🐈','Águia Guerreira':'🦅'};
const spellIcon={'Seiva Curativa':'💚','Raízes Prendedoras':'🌿','Pedra Celeste':'☄️','Geada Celeste':'❄️'};
const fresh=()=>({fortress:1,gold:1000,elixir:1000,diamonds:0,workers:1,wins:{1:0,2:0,3:0,4:0},attacks:0,structures:[{name:'Fortaleza Central',level:1},{name:'Arsenal',level:1},{name:'Acampamento',level:1},{name:'Torre Bombardeira',level:1},{name:'Mina de Ouro',level:1},{name:'Coletor de Elixir Verde',level:1}],walls:0,wallLevel:0,troops:{'Coelho Guerreiro':30},troopLevels:{'Coelho Guerreiro':1,'Raposa Arqueira':2,'Cabrito Nervoso':3},spells:{},unlockedSpells:{},crafted:{},missions:{},tutorial:true});
const clone=x=>JSON.parse(JSON.stringify(x));
function capacityOf(v){const camps=v.structures.filter(b=>b.name==='Acampamento');if(camps.length===2&&camps.every(b=>b.level>=2))return 100;if(camps.length>=3&&camps.every(b=>b.level>=3)&&v.fortress===3)return 100;if(camps.length>=4&&camps.every(b=>b.level>=4)&&v.fortress>=4)return 125;return camps.reduce((n,b)=>n+(b.level===1?30:b.level===2?50:b.level===3?33:31),0)}((&___)
function structureCount(v,name){return v.structures.filter(b=>b.name===name).length}
function levelCount(v,name,level){return v.structures.filter(b=>b.name===name&&b.level>=level).length}
function troopLevelOf(v,name){if(name==='Raposa Arqueira'&&levelCount(v,'Arsenal',2)>=1)return Math.max(2,v.troopLevels[name]||1);if(name==='Cabrito Nervoso'&&levelCount(v,'Arsenal',3)>=1)return Math.max(3,v.troopLevels[name]||1);return v.troopLevels[name]||0}
function goalsFor(v,f=v.fortress){const spec=FORTRESSES[f];if(!spec)return[];const goals=[];
  for(const [name,lvl,count] of spec.structures) goals.push({id:`b:${name}:${lvl}:${count}`,label:`${name} • nível ${lvl} (${levelCount(v,name,lvl)}/${count})`,ok:levelCount(v,name,lvl)>=count});
  if(spec.wallCount)goals.push({id:'walls',label:`Muralhas ${spec.wallColor} • nível ${spec.wallLevel} (${v.walls}/${spec.wallCount})`,ok:v.walls>=spec.wallCount&&v.wallLevel>=spec.wallLevel});
  for(const [name,lvl] of Object.entries(spec.troops))goals.push({id:`t:${name}:${lvl}`,label:`${name} • nível ${lvl}`,ok:troopLevelOf(v,name)>=lvl});
  if(spec.spells.length)goals.push({id:'spells',label:`Criar os feitiços da Fortaleza ${f} (${spec.spells.filter(x=>v.crafted[x]).length}/${spec.spells.length})`,ok:spec.spells.every(x=>v.crafted[x])});
  goals.push({id:'wins',label:`Vencer ${spec.wins} ${spec.wins===1?'ataque':'ataques'} (${v.wins[f]||0}/${spec.wins})`,ok:(v.wins[f]||0)>=spec.wins});return goals;
}
function canAdvance(v){return v.fortress<4&&goalsFor(v).every(g=>g.ok)}
function validateSave(v){return !!v&&v.fortress>=1&&v.fortress<=4&&Array.isArray(v.structures)&&v.structures.length>0&&typeof v.gold==='number'&&typeof v.troops==='object'}
function swapStructuresAtDrop(structures,layouts,source,dx,dy){
 const origin=layouts[source];if(!origin||source<0||source>=structures.length)return structures;
 const px=origin.x+dx+origin.width/2,py=origin.y+dy+origin.height/2;
 const target=structures.findIndex((_,i)=>{const r=layouts[i];return r&&px>=r.x&&px<=r.x+r.width&&py>=r.y&&py<=r.y+r.height});
 if(target<0||target===source)return structures;
 const next=structures.slice();[next[source],next[target]]=[next[target],next[source]];return next;
}

module.exports={SAVE_KEY,WORKER_COSTS,FORTRESSES,capacityOf,structureCount,levelCount,troopLevelOf,goalsFor,canAdvance,validateSave,swapStructuresAtDrop};
