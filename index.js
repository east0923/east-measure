const measures={
  length:{
    show:{zh:'长度',},
    units:{
      m:{
        show:{zh:'米'},
      },
      cm:{
        show:{zh:'厘米'},
        a:0.01,
      },
      mm:{
        show:{zh:'毫米'},
        a:0.001,
      },
      km:{
        show:{zh:'千米'},
        a:1000,
      },
      dm:{
        show:{zh:'分米'},
        a:0.1,
      },
    }
  },
  mass:{
    show:{zh:'质量'},
    units: {
      kg: {
        show: {zh: '千克'},
      },
      g: {
        show: {zh: '克'},
        a: 0.001,
      },
      mg: {
        show: {zh: '毫克'},
        a: 0.000001,
      },
      t: {
        show: {zh: '吨'},
        a: 1000,
      },
      ug:{
        sign:'μg',
        show: {zh: '微克'},
        a: 0.000000001,
      }
    }
  },
  time:{
    show:{zh:'时间'},
    units:{
      s:{
        show:{zh:'秒'},
      },
      m:{
        show:{zh:'分钟'},
        a:60,
      },
      h:{
        show:{zh:'时'},
        a:3600,
      },
      d:{
        show:{zh:'天'},
        a:86400,
      },
      ms:{
        show:{zh:'毫秒'},
        a:0.001,
      }
    }
  },
  current:{
    show:{zh:'电流'},
    units:{
      A:{
        show:{zh:'安培'}
      },
      mA:{
        show:{zh:'毫安'},
        a:0.001
      }
    }
  },
  temperature:{
    show:{zh:'温度'},
    units:{
      C:{
        sign:'℃',
        show:{zh:'摄氏度'},
        a:1,
        b:273.15
      },
      F:{
        sign:'℉',
        show:{zh:'华氏度'},
        a:5/9,
        b:2298.35/9
      },
      K:{
        show:{zh:'开尔文'},
      },
    }
  },
  area:{
    show:{zh:'面积'},
    combx:{
      length:2
    },
    units:{
      m2:{
        sign:'m\u00b2',
        show:{zh:'平方米'}
      },
      cm2:{
        sign:'cm\u00b2',
        show:{zh:'平方厘米'},
        combx:{
          length_cm:2
        }
      },
      km2:{
        sign:'Km\u00b2',
        show:{zh:'平方千米'},
        combx:{
          length_km:2
        }
      },
      mu:{
        show:{zh:'亩'},
        a:2000/3,
      },
      hm2:{
        sign:'hm\u00b2',
        show:{zh:'公顷'},
        a:10000,
      }
    }
  },
  volume:{
    show:{
      zh:'体积',
    },
    combx:{
      length:3
    },
    units:{
      m3:{
        sign:'m\u00b3',
        show:{zh:'立方米'}
      },
      L:{
        show:{zh:'升'},
        combx:{
          length_dm:3
        }
      },
      mL:{
        show:{zh:'毫升'},
        combx:{
          length_cm:3
        }
      }
    }
  },
  force:{
    show:{zh:'力'},
    combx:{
      mass:1,
      length:1,
      time:-2
    },
    units:{
      N:{
        show:{zh:'牛'},
        combx:{
          mass_kg:1,
          length_m:1,
          time_s:-2
        },
      }
    }
  },
  energy:{
    show:{zh:'能量'},
    combx:{
      force:1,
      length:1
    },
    units:{
      J:{
        combx:{
          force_N:1,
          length_m:1
        },
        show:{zh:'焦耳'}
      },
      'KWh':{
        show:{zh:'千瓦时'},
        combx:{
          power_kW:1,
          time_h:1
        }
      }
    },
  },
  power:{
    show:{zh:'功率'},
    combx:{
      energy:1,
      time:-1
    },
    units:{
      W:{
        show:{zh:'瓦'}
      },
      kW:{
        show:{zh:'千瓦'},
        a:1000
      }
    }
  },
  pressure:{
    show:{
      zh:'压强'
    },
    combx:{
      force:1,
      area:-1
    },
    units:{
      Pa:{
        show:{
          zh:'帕'
        }
      },
      kPa:{
        show:{
          zh:'千帕'
        },
        a:1000
      },
      MPa:{
        show:{
          zh:'兆帕'
        },
        a:1000000
      },
      atm:{
        show:{
          zh:'大气压'
        },
        a:101325
      },
      mmHg:{
        show:{
          zh:'毫米汞柱'
        },
        a:133.3223684
      }
    }
  },
  density:{
    show:{zh:'密度/质量浓度'},
    combx:{
      mass:1,
      volume:-1
    },
    units:{
      'Kg/m3':{
        sign:'Kg/m\u00b3',
        show:{zh:'千克每立方米'}
      },
      'g/L':{
        show:{zh:'克每升'}
      },
      'mg/L':{
        show:{zh:'毫克每升'},
        combx:{
          mass_mg:1,
          volume_L:-1
        }
      },
      'ug/L':{
        sign:'μg/L',
        show:{zh:'微克每升'},
        combx:{
          mass_ug:1,
          volume_L:-1
        }
      },
      'ppm':{
        sign:'μg/L',
        show:{zh:'微克每升'},
        combx:{
          mass_ug:1,
          volume_L:-1
        }
      }
    }
  },
  flowVolume:{
    show:{zh:'体积流量'},
    combx:{
      volume:1,
      time:-1
    },
    units:{
      'm3/s':{
        sign:'m\u00b3/s',
        show:{zh:'立方米每秒'}
      },
      'm3/h':{
        sign:'m\u00b3/h',
        show:{zh:'立方米每小时'},
        combx:{
          time_h:-1
        },
      },
    }
  },
  voltage:{
    show:{zh:'电压'},
    combx:{
      power:1,
      current:-1
    },
    units:{
      V:{
        show:{zh:'伏'}
      },
      KV:{
        show:{zh:'千伏'},
        a:1000
      }
    }
  },
  PH:{
    show:{zh:'酸碱度'},
    units:{
      PH:{
        show:{zh:'PH'}
      }
    }
  },
  boolean:{
    show:{zh:'开关/启停状态'},
    units:{
      bool:{
        show:{zh:'布尔量'}
      },
      open0:{
        show:{zh:'0启动'},
        a:-1,
        b:1
      },
      open1:{
        show:{zh:'1启动'}
      }
    }
  }
};

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
fs.writeFile('dist/dict.json',jsonStr);

// 根据模板写func.js文件
const temp=fs.readFileSync('funcTemp.js').toString('utf8').replace(/\"jsonStr\"/,jsonStr);
fs.writeFile('dist/func.js',temp);