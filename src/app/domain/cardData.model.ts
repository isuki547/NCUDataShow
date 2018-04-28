export interface CardData{
    XGH:string;//学工号
    WXJYRQ:Date;//交易日期
    JYSJ:string;//交易时间
    JYYE:string;//交易金额
    KYE:Float32Array;// 卡余额
    ZDBH:number;// 终端编号
    JYZDMC:string;//交易终端名称
    YWBMBH:string; //业务部门编号
    YWBMMC:string;//业务部门名称
    JYKMDM:string;// 交易科目代码
    JYKMMC:string;//交易科目名称
    
}