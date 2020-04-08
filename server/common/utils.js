export default {

    /**
     * 把名称改为小驼峰格式
     */
    nameToCamelFormat: (name) => {
        return name.replace(/(\-)(\w)/g, (s0, s1, s2) => {
            //把规则进行替换成方法签名
            return s2.toUpperCase();
        });
    }
}