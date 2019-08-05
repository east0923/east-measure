/* 方法字典 */
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
            b    :unit.b
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
    // 没有输入时，返回空字符串
    if(!key) return '';

    // 未配置模版时，使用默认模版
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
  },

  /**
   * 判定两组unitkey是否量纲匹配，缺项时反馈匹配
   * @param dict1
   * @param dict2
   * @returns {boolean}
   */
  isMatch(u1,u2){
    // 加速：缺项时，反馈不匹配
    if(!u1||!u2) return false;
    // 加速：均为字符串时，仅字面比较
    if((typeof u1==='string')&&(typeof u2==='string')) return u1.split('_')[0]===u2.split('_')[0];
    // 进行详细量纲比较，两量纲相除得到的comb应该不含任何项目
    return Object.keys(Iso.div(u1,u2).comb).length===0;
  },

  /* 数值、单位一起呈现 */
  numUnitFmt:function(value,unitkeyFrom,unitKeyTo,n){
    // 默认的n
    if(typeof n==="undefined") n=2;

    // 单位换算
    value=measureFunc.convert(value,unitkeyFrom,unitKeyTo);

    // 保留n位小数并抹去末尾的0
    if(!Number.isFinite(value)) return value.toString();
    var str=value.toFixed(n);
    if(n>0) while(str.substr(str.length-1,1)==='0') str=str.substr(0,str.length-1);
    // 若最后是小数点，去除
    if(str.substr(str.length-1,1)==='.') str=str.substr(0,str.length-1);

    // 根据有无呈现单位，进行不同的输出
    var unitShow=unitKeyTo || unitkeyFrom;
    if(unitShow) return str+' '+measureFunc.showWord(unitShow,'usign');
    else return str;
  },
};

/* 度量单位原型 */
function Iso(obj){
  // 定义实例方法：整理
  this._clean=function(){
    for(var k in this.comb){
      // 四舍五入，删除为0的
      this.comb[k]=Math.round(this.comb[k]);
      if(!this.comb[k]) delete this.comb[k];
    }
  };

  // 定义实例方法转换方法
  this.toMeasure=function(){
    for(var m in measureFunc._dict) {
      var comb = measureFunc._dict[m].comb;
      var ks1 = Object.keys(this.comb);
      var ks2 = Object.keys(comb);
      if (ks1.length !== ks2.length) continue;
      var isok = true;
      for (var k of ks1) {
        if (this.comb[k] !== comb[k]) {
          isok = false;
          break;
        }
      }
      if (isok) return m;
    }
    return "";
  };

  /* ==== 以下为构建过程 ==== */
  // 最终量纲对象
  this.comb={};
  // 传入为空，构建完毕，可结束
  if(!obj) return;

  // 如果是字符串，构造为字典形式
  if(typeof obj==='string'){var m={};m[obj]=1;obj=m}
  // 遍历
  for(var k in obj) {
    // 取出该度量的代码，并取comb记为c
    var m=k.split('_')[0];
    var c=measureFunc._dict[m].comb;
    // 遍历c，将其合并到最终的iso
    for(var i in c) this.comb[i]=(this.comb[i]||0) + c[i]*obj[k];
  }

  this._clean();
}
Iso.mul=function(){
  // 构建输出结果
  var res=new Iso();
  // 取参数数组，兼容ES5
  var objs=Array.from(arguments);
  // 遍历参数
  objs.forEach(function (i) {
    // 若参数不是Iso对象，进行构建
    if((typeof i==='string')|| !i.comb) i=new Iso(i);
    // 进行量纲乘法运算
    for(var k in i.comb){
      res.comb[k]=(res.comb[k]||0) + i.comb[k];
    }
  });
  // 清理后反馈
  res._clean();
  return res
};
Iso.pow=function(obj,num){
  // 构建输出结果
  var res=new Iso();
  // 若参数不是Iso对象，进行构建
  if((typeof obj==='string')|| !obj.comb) obj=new Iso(obj);
  // 遍历所有comb，均乘以num
  for(var k in obj.comb){
    res.comb[k]=obj.comb[k]*num;
  }

  // 清理后反馈
  res._clean();
  return res
};
Iso.div=function(obj1,obj2){
  return Iso.mul(obj1,Iso.pow(obj2,-1))
};

// 如果是node环境，进行模块输出
if((typeof process!=='undefined') && process.version){
  measureFunc.Iso=Iso;
  module.exports=measureFunc;
}