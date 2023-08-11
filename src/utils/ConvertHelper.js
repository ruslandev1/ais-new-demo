export default class ConvertHelper{
    static convertDataZeroToEmpty(val) {
        // Select-lerin value-su o oldugu zaman hec bir data olmur amma label yuxari qalxmir, bunun ucun empty olmalidir,
        // onu da bu sekilde edirik
        return val > 0 ? val : '';
    }
}
