/**
 * @return {number}
 */
export function KpiAttributeOrderWeightComparator(a, b) {
    if (a.orderWeight < b.orderWeight)
        return -1;
    if (a.orderWeight > b.orderWeight)
        return 1;
    return 0;
}