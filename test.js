/* 本脚本内容不影响输出dist，可以随便搞，主要用在nodejs中测试 */
const measureFunc=require('./dist/func');

const Iso=measureFunc.Iso;

const b=Iso.mul({
    force:1,
    length:-2,
}).toMeasure();


debugger