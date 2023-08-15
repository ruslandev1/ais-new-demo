import ValueLabel from "../utils/ValueLabel";
export class Address{
    country = new ValueLabel(0, '');
    city = new ValueLabel(0, '');
    region = new ValueLabel(0, '');
    village = new ValueLabel(0, '');
    streetName = '';
    apt = '';
    flat = '';
    addressTitle = '';
}

