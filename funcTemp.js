var measureFunc={
  // 度量单位字典，会被替换为dict.json内容
  _dict:"jsonStr",
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