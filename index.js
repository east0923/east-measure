const measures=require('./measures.js');

// 未能解决的计数，默认给很大的值
let unDoLast=9e9;

// 只要有没处理完毕的unit，就不断循环
while(unDoLast){
  // 本次未解决计数器
  let unDoCount=0;

  // 遍历量
  for(const m in measures){
    if(!measures.hasOwnProperty(m)) continue;
    const measure=measures[m];
    // 已有comb项，不用处理
    if(measure.comb){}
    // 没有合成规则，表明自身是基础单位
    else if(!measure.combx){
      measure.comb={};
      measure.comb[m]=1;
    }
    // 有合成规则，尝试合成
    else {
      const comb={};
      let isOk=true;
      for(const m in measure.combx){
        const mm=measures[m];
        const mmp=measure.combx[m];
        // 需合成的单位尚未形成组成规则
        if(!mm.comb){isOk=false;break}
        for(const mmm in mm.comb){
          comb[mmm]=comb[mmm]||0;
          comb[mmm]+=mm.comb[mmm]*mmp;
        }
      }
      // 完成时，记录
      if(isOk){
        measure.comb=comb;
        delete measure.combx;
      }
      // 未完成时，计数器加一
      else unDoCount++;
    }

    // 遍历单位
    for(const u in measure.units){
      if(!measure.units.hasOwnProperty(u)) continue;
      const unit=measure.units[u];
      // 如果没有sign项，默认用单位标识
      if(!unit.sign) unit.sign=u;

      // 校准后的a，b
      let a=unit.a||1;
      let b=unit.b||0;
      // 不需要合并计算
      if(!unit.combx){
        unit.a=a;
        unit.b=b;
        continue;
      }
      /* 尝试合并计算 */
      let isOk=true;
      for(const mu in unit.combx){
        if(!unit.combx.hasOwnProperty(mu)) continue;
        const [m,u]=mu.split('_');
        const uu=measures[m].units[u];
        // 单位项中没有a，或者还需要合成，则标记不成功跳出
        if(!uu) throw new Error('未知单位：'+mu);
        if(!('a' in uu)||uu.combx){isOk=false;break}
        // 系数合并计算
        a*=Math.pow(uu.a,unit.combx[mu]);
      }
      // 合成计算成功
      if(isOk){
        unit.a=a;
        unit.b=b;
        delete unit.combx;
      }
      // 计算失败，计数
      else unDoCount++;
    }
  }

  // 两次循环后无法处理的计数一致，则永远无法处理完毕，抛出错误
  if(unDoCount===unDoLast){
    debugger;
    throw new Error('有单位的合成依赖无法处理');
  }
  // 更新上次未完成改数量
  unDoLast=unDoCount;
}

// 生成json字符串
const jsonStr=JSON.stringify(measures);

// 写dict.json文件
const fs=require('fs');
fs.writeFile('dist/dict.json',jsonStr,()=>{});

// 根据模板写func.js文件
const temp=fs.readFileSync('funcTemp.js').toString('utf8').replace(/\"jsonStr\"/,jsonStr);
fs.writeFile('dist/func.js',temp,()=>{});