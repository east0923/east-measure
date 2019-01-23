var measureFunc={
  // 度量单位字典，会被替换为dict.json内容
  _dict:{"length":{"show":{"zh":"长度"},"units":{"m":{"show":{"zh":"米"},"sign":"m","a":1,"b":0},"cm":{"show":{"zh":"厘米"},"a":0.01,"sign":"cm","b":0},"mm":{"show":{"zh":"毫米"},"a":0.001,"sign":"mm","b":0},"km":{"show":{"zh":"千米"},"a":1000,"sign":"km","b":0},"dm":{"show":{"zh":"分米"},"a":0.1,"sign":"dm","b":0}},"comb":{"length":1}},"mass":{"show":{"zh":"质量"},"units":{"kg":{"show":{"zh":"千克"},"sign":"kg","a":1,"b":0},"g":{"show":{"zh":"克"},"a":0.001,"sign":"g","b":0},"mg":{"show":{"zh":"毫克"},"a":0.000001,"sign":"mg","b":0},"t":{"show":{"zh":"吨"},"a":1000,"sign":"t","b":0},"ug":{"sign":"μg","show":{"zh":"微克"},"a":1e-9,"b":0}},"comb":{"mass":1}},"time":{"show":{"zh":"时间"},"units":{"s":{"show":{"zh":"秒"},"sign":"s","a":1,"b":0},"m":{"show":{"zh":"分钟"},"a":60,"sign":"m","b":0},"h":{"show":{"zh":"时"},"a":3600,"sign":"h","b":0},"d":{"show":{"zh":"天"},"a":86400,"sign":"d","b":0},"ms":{"show":{"zh":"毫秒"},"a":0.001,"sign":"ms","b":0}},"comb":{"time":1}},"current":{"show":{"zh":"电流"},"units":{"A":{"show":{"zh":"安培"},"sign":"A","a":1,"b":0},"mA":{"show":{"zh":"毫安"},"a":0.001,"sign":"mA","b":0}},"comb":{"current":1}},"temperature":{"show":{"zh":"温度"},"units":{"C":{"sign":"℃","show":{"zh":"摄氏度"},"a":1,"b":273.15},"F":{"sign":"℉","show":{"zh":"华氏度"},"a":0.5555555555555556,"b":255.3722222222222},"K":{"show":{"zh":"开尔文"},"sign":"K","a":1,"b":0}},"comb":{"temperature":1}},"area":{"show":{"zh":"面积"},"units":{"m2":{"sign":"m²","show":{"zh":"平方米"},"a":1,"b":0},"cm2":{"sign":"cm²","show":{"zh":"平方厘米"},"a":0.0001,"b":0},"km2":{"sign":"Km²","show":{"zh":"平方千米"},"a":1000000,"b":0},"mu":{"show":{"zh":"亩"},"a":666.6666666666666,"sign":"mu","b":0},"hm2":{"sign":"hm²","show":{"zh":"公顷"},"a":10000,"b":0}},"comb":{"length":2}},"volume":{"show":{"zh":"体积"},"units":{"m3":{"sign":"m³","show":{"zh":"立方米"},"a":1,"b":0},"L":{"show":{"zh":"升"},"sign":"L","a":0.0010000000000000002,"b":0},"mL":{"show":{"zh":"毫升"},"sign":"mL","a":0.0000010000000000000002,"b":0}},"comb":{"length":3}},"force":{"show":{"zh":"力"},"units":{"N":{"show":{"zh":"牛"},"sign":"N","a":1,"b":0}},"comb":{"mass":1,"length":1,"time":-2}},"energy":{"show":{"zh":"能量"},"units":{"J":{"show":{"zh":"焦耳"},"sign":"J","a":1,"b":0},"KWh":{"show":{"zh":"千瓦时"},"sign":"KWh","a":3600000,"b":0}},"comb":{"mass":1,"length":2,"time":-2}},"power":{"show":{"zh":"功率"},"units":{"W":{"show":{"zh":"瓦"},"sign":"W","a":1,"b":0},"kW":{"show":{"zh":"千瓦"},"a":1000,"sign":"kW","b":0}},"comb":{"mass":1,"length":2,"time":-3}},"pressure":{"show":{"zh":"压强"},"units":{"Pa":{"show":{"zh":"帕"},"sign":"Pa","a":1,"b":0},"kPa":{"show":{"zh":"千帕"},"a":1000,"sign":"kPa","b":0},"MPa":{"show":{"zh":"兆帕"},"a":1000000,"sign":"MPa","b":0},"atm":{"show":{"zh":"大气压"},"a":101325,"sign":"atm","b":0},"mmHg":{"show":{"zh":"毫米汞柱"},"a":133.3223684,"sign":"mmHg","b":0}},"comb":{"mass":1,"length":-1,"time":-2}},"density":{"show":{"zh":"密度/质量浓度"},"units":{"Kg/m3":{"sign":"Kg/m³","show":{"zh":"千克每立方米"},"a":1,"b":0},"g/L":{"show":{"zh":"克每升"},"sign":"g/L","a":1,"b":0},"mg/L":{"show":{"zh":"毫克每升"},"sign":"mg/L","a":0.0009999999999999998,"b":0},"ug/L":{"sign":"μg/L","show":{"zh":"微克每升"},"a":9.999999999999997e-7,"b":0},"ppm":{"sign":"μg/L","show":{"zh":"微克每升"},"a":9.999999999999997e-7,"b":0}},"comb":{"mass":1,"length":-3}},"flowVolume":{"show":{"zh":"体积流量"},"units":{"m3/s":{"sign":"m³/s","show":{"zh":"立方米每秒"},"a":1,"b":0},"m3/h":{"sign":"m³/h","show":{"zh":"立方米每小时"},"a":0.0002777777777777778,"b":0}},"comb":{"length":3,"time":-1}},"voltage":{"show":{"zh":"电压"},"units":{"V":{"show":{"zh":"伏"},"sign":"V","a":1,"b":0},"KV":{"show":{"zh":"千伏"},"a":1000,"sign":"KV","b":0}},"comb":{"mass":1,"length":2,"time":-3,"current":-1}},"PH":{"show":{"zh":"酸碱度"},"units":{"PH":{"show":{"zh":"PH"},"sign":"PH","a":1,"b":0}},"comb":{"PH":1}},"boolean":{"show":{"zh":"开关/启停状态"},"units":{"bool":{"show":{"zh":"布尔量"},"sign":"bool","a":1,"b":0},"open0":{"show":{"zh":"0启动"},"a":-1,"b":1,"sign":"open0"},"open1":{"show":{"zh":"1启动"},"sign":"open1","a":1,"b":0}},"comb":{"boolean":1}}},
  /**
   * 将unitkey分解为度量和单位，可兼容空输入，不检测字典中是否存在
   *
   * @param unitkey
   * @returns {*[]} [度量,单位]
   */
  unitkeySplit:function(unitkey){
    unitkey=unitkey||'';
    var arry=unitkey.split('_');
    return [arry[0],arry[1]];
  },

  /**
   * 模糊搜索，输出结构与dict一致，添加showWord项
   * @param word 输入字符，可为空匹配全部
   * @param limit 度量限制，可为空表示无限制。有限制时，应传入度量字符串，或传入unitkey在方法中分离出度量
   */
  search:function(word,limit,language){
    var dict=measureFunc._dict;
    var result={};
    // 将word整理为小写字符串
    word=(word||'').toLowerCase();
    // 将limit 整理为所限制的measureKey
    limit=measureFunc.unitkeySplit(limit)[0];

    // 遍历度量
    for(var mkey in dict){
      if(!dict.hasOwnProperty(mkey)) continue;
      // 有度量限制且不匹配，跳过
      if(limit&&limit!==mkey) continue;
      // 取度量对象，并预备检索出的units
      var measure=dict[mkey];
      var units=null;
      // 遍历单位
      for(var ukey in measure.units){
        if(!measure.units.hasOwnProperty(ukey)) continue;
        var unit=measure.units[ukey];
        // 取出showWord
        var showWord=unit.show[language]||unit.show.zh;
        // 判定是否模糊匹配，成功则记录到units字典
        if(ukey.toLowerCase().includes(word)||showWord.toLowerCase().includes(word)){
          units=units||{};
          units[ukey]={
            showWord,
            sign :unit.sign,
            a    :unit.a,
            b    :unit.b,
            combx:unit.combx
          }
        }
      }
      // 单位字典存在，则添加该度量
      if(units){
        result[mkey]={
          showWord:measure.show[language]||measure.show.zh,
          comb:measure.comb,
          units
        }
      }
    }
    // 反馈模糊搜索结果
    return result;
  },

  /**
   * 单位转换计算
   * @param value 原始值，必须是number类型
   * @param unitKeyFrom 原始值unitkey
   * @param unitKeyTo 想要转换的unitkey
   * @param level 容错等级，后续详细说明
   * @returns {*} 返回计算值
   *
   * 对unitKeyFrom和unitKeyTo输入异常，根据不同容错等级进行处理：
   * 容错等级 0：(默认)
   *    有输入非空，但格式错误    ：抛出异常
   *    有输入为空                ：直接返回原始值
   *    有输入非空，但字典中查不到：直接返回原始值
   *    度量不匹配                ：直接返回原始值
   * 容错等级 1：
   *    有输入非空，但格式错误    ：抛出异常
   *    有输入为空                ：直接返回原始值
   *    有输入非空，但字典中查不到：抛出异常
   *    度量不匹配                ：抛出异常
   * 容错等级 2：
   *    有输入非空，但格式错误    ：抛出异常
   *    有输入为空                ：抛出异常
   *    有输入非空，但字典中查不到：抛出异常
   *    度量不匹配                ：抛出异常
   *
   */
  convert(value,unitKeyFrom,unitKeyTo,level){
    // 快捷处理：From与To单位相同，直接反馈value
    if(unitKeyFrom===unitKeyTo) return value;

    var dict=measureFunc._dict;
    level=level||0;
    var f=measureFunc.unitkeySplit(unitKeyFrom);
    var fm=f[0],fu=f[1];
    var t=measureFunc.unitkeySplit(unitKeyTo);
    var tm=t[0],tu=t[1];

    // 有输入非空，但格式错误
    if(fm&&!fu || tm&&!tu) throw new Error('unitkey format Error');

    // 有输入为空
    if(!fm||!tm) {
      if(level===2) throw new Error('unitkey Empty');
      else  return value;
    }

    // 度量不匹配
    if(fm!==tm){
      if(level>0) throw new Error('measure not match');
      else return value;
    }

    // 取出单位配置
    var funit=dict[fm] && dict[fm].units[fu];
    var tunit=dict[tm] && dict[tm].units[tu];

    // 有输入非空，但字典中查不到
    if(!funit||!tunit) {
      if(level>0) throw new Error('unitkey not in Dict');
      else return value
    }

    // 一切顺利，计算并反馈
    return ((value*funit.a+funit.b)-tunit.b)/tunit.a;
  },

  /**
   * 根据特征字符串查询显示字符串
   * @param key 特征key，支持仅度量或unitkey
   * @param typecode 呈现方式：0(默认) 度量和单位，1 仅度量，2 仅单位
   * @param language 语言，默认汉语zh
   * @returns {*} 显示字符串
   */
  showWord:function(key,fmt,language){
    fmt=fmt||'usign ushow(mshow)';
    var a=measureFunc.unitkeySplit(key);
    var m=a[0],u=a[1];
    var mshow='',ushow='',usign='';

    var measure=measureFunc._dict[m];
    // 未匹配到度量时，返回空字符串
    if(measure){
      mshow=measure.show[language]||measure.show.zh;
      // 取单位，未取到反馈空
      var unit   =measure.units[u];
      if(unit) {
        usign=unit.sign;
        ushow=unit.show[language]||unit.show.zh;
      }
    }

    // 格式化、反馈
    fmt=fmt.replace(/mshow/,mshow).replace(/ushow/,ushow).replace(/usign/,usign);
    return fmt;
  }
};