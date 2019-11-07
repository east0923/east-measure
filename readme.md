使用说明
---
## 一、项目介绍

度量单位是数据的重要属性，本项目可满足业务系统对数据性质进行标记，以及进行单位换算计算的需求。

* 本项目仅实现换算关系固定的度量单位体系，不考虑如汇率、金价等浮动变换的数据体系。
* 项目维护较为完整的单位体系列表，随时会有增加，但保证不会移除或更改现有项的支持。

## 二、资源引入说明

### 1、引入本项目维护的公网资源

度量单位体系字典json文件：<https://static.esimu.cc/measure/dict.json>

度量单位体系js脚本插件：<https://static.esimu.cc/measure/func.js>

引入js脚本的Html页面：<https://static.esimu.cc/measure/app.html>

### 2、保存至自有项目

json与js脚本下载地址同上，js不依赖json文件，可单独使用。

### 3、使用git克隆后自行编译

克隆本项目后，请勿直接修改dist/目录中的文件。

增减度量、单位，可编辑文件measures.js文件。

修改、添加js方法，可编辑funcTemp.js文件。

编译：使用nodejs运行index.js文件，dict.json和func.js输出至dist/目录。

## 三、dict.json结构说明
### 1、根结点：度量字典

在json文件中，根节点下每一项的key为度量标签（符号记为：mkey），其值为该度量信息，各项说明如下：

* show：各语言中的名称，可用于呈现及语音发音，目前仅维护zh(简体中文)节点。
* comb：量纲组成，用于量纲分析。
* units：该度量下的单位字典，其结构说明在下一节。

### 2、[mkey].units结点：单位字典

单位必定隶属于某一唯一的度量。度量节点中的units项字典，包含其所有单位。key为单位标签（符号记为：ukey），值为该单位信息，各项说明如下：

* show：各语言中的名称，可用于呈现及语音发音，目前仅维护zh(简体中文)节点。
* sign：单位符号，一般出现在数值后、计算公式中，其字符组成可能较为复杂，需按UTF-8编码对待。
* a：对国际单位制的放大倍数，一定不为0，详见换算说明。
* b：对国际单位制的偏移量，详见换算说明。

## 四、unitkey定义
unitkey用于标识一个数据具体的度量单位，构成规则为：\[mkey]\_\[ukey]

例如：“length_cm”中，“length”为度量标签mkey，“cm”为单位标签ukey。

```
注意：
1、不同度量下的单位标签mkey可能重复，但含义不同，所以记录时，需度量和单位的组合；
2、度量、单位标签中可能出现的字符有：大小写字母、数字、‘/’。不会出现其他字符。

```

## 五、单位换算算法

### 1、国际单位制

标准由国际计量大会制定，在本json结构中，a为1，b为0的单位即为该度量的国际单位，或其等效单位。

等效的单位的系数a、b一致，如密度国际单位为“kg/m3”，构成的各单位都缩小到1/1000后为“g/L”，该单位与国际单位完全等效。

### 2、计算公式

国际单位数值 = 指定单位数值 × a + b

指定单位数值 = (国际单位数值 - b) / a

由单位1换算到单位2，中间需经过国际单位数值：单位1数值 -> 国际单位数值 -> 单位2数值。

```
注意：
1、不同度量下的单位间，进行单位换算无意义，请不要这样做；
2、计算过程中不必考虑单位1、2是否本身就是国际单位，因为国际单位的系数对数值计算结果无影响。

```