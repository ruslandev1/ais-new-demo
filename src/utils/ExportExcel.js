let _createClass = function () {
    function defineProperties(target, props) {
        for (let i = 0; i < props.length; i++) {
            let descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
                descriptor.writable = true;

            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * __  ___     _____                       _
 * \ \/ / |___| ____|_  ___ __   ___  _ __| |_
 *  \  /| / __|  _| \ \/ / '_ \ / _ \| '__| __|
 *  /  \| \__ \ |___ >  <| |_) | (_) | |  | |_
 * /_/\_\_|___/_____/_/\_\ .__/ \___/|_|   \__|
 *                       |_|
 * 6/12/2017
 * Daniel Blanco Parla
 * https://github.com/deblanco/xlsExport
 */

let XlsExport = function () {
    // data: array of objects with the data for each row of the table
    // name: title for the worksheet
    function XlsExport(data) {
        let title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Worksheet';

        _classCallCheck(this, XlsExport);

        // input validation: new xlsExport([], String)
        if (!Array.isArray(data) || typeof title !== 'string' || Object.prototype.toString.call(title) !== '[object String]') {
            throw new Error('Invalid input types: new xlsExport(Array [], String)');
        }

        this._data = data;
        this._title = title;
    }

    _createClass(XlsExport, [{
        key: 'exportToXLS',
        value: function exportToXLS() {
            let fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'export.xls';

            if (typeof fileName !== 'string' || Object.prototype.toString.call(fileName) !== '[object String]') {
                throw new Error('Invalid input type: exportToCSV(String)');
            }

            let TEMPLATE_XLS = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' +
                '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>' +
                '<head><!--[if gte mso 9]><xml>' +
                '<x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{title}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>' +
                '<![endif]--></head>' +
                '<body>{table}</body>' +
                '</html>';
            let MIME_XLS = 'application/vnd.ms-excel;base64,';

            let parameters = {
                title: this._title,
                table: this.objectToTable()
            };
            let computeOutput = TEMPLATE_XLS.replace(/{(\w+)}/g, function (x, y) {
                return parameters[y];
            });

            let computedXLS = new Blob([computeOutput], {
                type: MIME_XLS
            });
            let xlsLink = window.URL.createObjectURL(computedXLS);
            this.downloadFile(xlsLink, fileName);
        }
    }, {
        key: 'exportToCSV',
        value: function exportToCSV() {
            let fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'export.csv';

            if (typeof fileName !== 'string' || Object.prototype.toString.call(fileName) !== '[object String]') {
                throw new Error('Invalid input type: exportToCSV(String)');
            }
            let computedCSV = new Blob([this.objectToSemicolons()], {
                type: 'text/csv;charset=utf-8'
            });
            let csvLink = window.URL.createObjectURL(computedCSV);
            this.downloadFile(csvLink, fileName);
        }
    }, {
        key: 'downloadFile',
        value: function downloadFile(output, fileName) {
            let link = document.createElement('a');
            document.body.appendChild(link);
            link.download = fileName;
            link.href = output;
            link.click();
        }
    }, {
        key: 'toBase64',
        value: function toBase64(string) {
            return window.btoa(unescape(encodeURIComponent(string)));
        }
    }, {
        key: 'objectToTable',
        value: function objectToTable() {
            // extract keys from the first object, will be the title for each column
            let colsHead = '<tr>' + Object.keys(this._data[0]).map(function (key) {
                return '<td>' + key + '</td>';
            }).join('') + '</tr>';

            let colsData = this._data.map(function (obj) {
                return ['<tr>\n                ' + Object.keys(obj).map(function (col) {
                    return '<td>' + (obj[col] ? obj[col] : '') + '</td>';
                }).join('') + '\n            </tr>'];
            }) // 'null' values not showed
                .join('');

            return ('<table>' + colsHead + colsData + '</table>').trim(); // remove spaces...
        }
    }, {
        key: 'objectToSemicolons',
        value: function objectToSemicolons() {
            let colsHead = Object.keys(this._data[0]).map(function (key) {
                return [key];
            }).join(';');
            let colsData = this._data.map(function (obj) {
                    return [// obj === row
                        Object.keys(obj).map(function (col) {
                                return [obj[col]];
                            } // row[column]
                        ).join(';')];
                } // join the row with ';'
            ).join('\n'); // end of row

            return colsHead + '\n' + colsData;
        }
    }, {
        key: 'setData',
        set: function set(data) {
            if (!Array.isArray(data)) throw new Error('Invalid input type: setData(Array [])');

            this._data = data;
        }
    }, {
        key: 'getData',
        get: function get() {
            return this._data;
        }
    }]);

    return XlsExport;
}();

export default XlsExport; // comment this line to babelize
