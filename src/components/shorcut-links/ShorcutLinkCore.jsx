import CoreComponent from "../CoreComponent";
import {v4 as uuidv4} from 'uuid';

export default class ShortcutLinksCore extends CoreComponent {
    loadSortcutLinks(processingCallback, errorCallback, successCallback) {

        const rsp = [
            {
                id: uuidv4(),
                name: 'Saatlıq icazə',
                location: 'Elektron Sənəd Dövriyyəsi',
                desc: 'Günlük icazə saatları almaq üçün istifadə olunur. Ay ərzində 2 dəfədən və toplam 6 iş saatından çox olmamalıdır.',
                url: 'https://esd.avrora.az/#/process-definition',
                usageDesc: 'İstifadə etmək üçün "Elektron Sənəd Dövriyyəsi" portalına daxil olmalısınız. Portala giriş məlumatları eyni AİS portala giriş məlumatları ilə eynidir.',
            },
            {
                id: uuidv4(),
                name: 'Məzuniyyət',
                location: 'Elektron Sənəd Dövriyyəsi',
                desc: 'Buradan yalnız "İllik" və "Ödənişsiz" növdə məzuniyyət ərizəsi doldurmaq üçün istifadə olunur. Ərizə rəhbər şəxslər tərəfindən təsdiqləndikdən sonra "Kadrlar şöbəsi" tərəfindən yoxlanılaraq sistemə daxil edilir və bu mərhələdə qanunverciliyin tələbi olaraq ərizəni kağız formada imzalayaraq "Kadrlar şöbəsi" -nə təqdim etmək lazımdır.',
                url: 'https://esd.avrora.az/#/process-definition',
                usageDesc: 'İstifadə etmək üçün "Elektron Sənəd Dövriyyəsi" portalına daxil olmalısınız. Portala giriş məlumatları eyni AİS portala giriş məlumatları ilə eynidir.',
            },
            {
                id: uuidv4(),
                name: 'Əsas vəsaitlərin anbara təhvili',
                location: 'Elektron Sənəd Dövriyyəsi',
                desc: 'Əsas vəsaitlərin anbara təhvil verilməsi üçün proses. İşçi, ona təhkim olunmuş əsas vəsaitləri anbara təhvil verdikdə istifadə edilir.',
                url: 'https://esd.avrora.az/#/process-definition',
                usageDesc: 'İstifadə etmək üçün "Elektron Sənəd Dövriyyəsi" portalına daxil olmalısınız. Portala giriş məlumatları eyni AİS portala giriş məlumatları ilə eynidir.',
            },
            {
                id: uuidv4(),
                name: 'Əsas vəsaitlərin digər şəxsə təhvil verilməsi',
                location: 'Elektron Sənəd Dövriyyəsi',
                desc: 'Əsas vəsaitlərin digər şəxsə təhvil verilməsi üçün proses. İşçi, ona təhkim olunmuş əsas vəsaitləri digər şəxslərə təhvil verdikdə istifadə edilir.',
                url: 'https://esd.avrora.az/#/process-definition',
                usageDesc: 'İstifadə etmək üçün "Elektron Sənəd Dövriyyəsi" portalına daxil olmalısınız. Portala giriş məlumatları eyni AİS portala giriş məlumatları ilə eynidir.',
            },
            {
                id: uuidv4(),
                name: 'Xidməti icazə',
                location: 'AİS Portal',
                desc: 'Xidməti icazə almaq üçün istifadə olunur. Bu icazəni ancaq şöbə rəhbərləri, departament rəhbərləri və direktorlar istifadə edə bilər.',
                url: '/hour_permission',
                usageDesc: 'İstifadə etmək üçün AİS portala daxil olmaq kifayətdir.',
            },
            // {  // elave etmezden evvel aciqlama hisselerini deqiq yaz sonra
            //     id: uuidv4(),
            //     name: 'QDMS İdarəetmə Sistemi',
            //     location: 'QDMS Local Wep',
            //     desc: 'Xidməti icazə almaq üçün istifadə olunur. Bu icazəni ancaq şöbə rəhbərləri, departament rəhbərləri və direktorlar istifadə edə bilər.',
            //     url: 'http://192.168.10.88/QDMS/QDMSNET/BSAT/Logon.aspx',
            //     usageDesc: 'İstifadə etmək üçün AİS portala daxil olmaq kifayətdir.',
            // },
            // {
            //     id: uuidv4(),
            //     name: 'Enseble',
            //     location: 'Enseble Local Wep',
            //     desc: 'Xidməti icazə almaq üçün istifadə olunur. Bu icazəni ancaq şöbə rəhbərləri, departament rəhbərləri və direktorlar istifadə edə bilər.',
            //     url: 'http://192.168.10.88/ENSEMBLE',
            //     usageDesc: 'İstifadə etmək üçün AİS portala daxil olmaq kifayətdir.',
            // },
        ];
        successCallback(rsp);
    }
}
