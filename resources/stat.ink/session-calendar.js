/*! Copyright (C) 2016 AIZAWA Hina | MIT License */
((window, $) => {
    const color = window.colorScheme._accent.green;
    const months = 12;
    const i18n = (() => {
        return {
            "ja-JP": {
                "months": [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
                "itemName": [ "回", "回" ],
            },
            "en-US": {
                "months": [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                "itemName": [ "time", "times" ],
            },
            "en-GB": {
                "months": [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                "itemName": [ "time", "times" ],
            },
            "es-ES": {
                "months": [ "Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic." ],
                "itemName": [ "vece", "veces" ],
            },
            "es-MX": {
                "months": [ "Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic." ],
                "itemName": [ "vece", "veces" ],
            },
            "fr-FR": {
                "months": [ "Janv.", "Fév.", "Mars", "Avril", "Mai", "Juin", "Juill.", "Août", "Sept.", "Oct.", "Nov.", "Déc." ],
                "itemName": [ "fois", "fois" ],
            },
            "fr-CA": {
                "months": [ "Janv.", "Fév.", "Mars", "Avril", "Mai", "Juin", "Juill.", "Août", "Sept.", "Oct.", "Nov.", "Déc." ],
                "itemName": [ "fois", "fois" ],
            },
            "de-DE": {
                "months": [ "Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez." ],
                "itemName": [ "mal", "mal" ],
            },
            "nl-NL": {
                "months": [ "jan.", "feb.", "mrt.", "apr.", "mei", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec." ],
                "itemName": [ "keer", "keer" ],
            },
            "ru-RU": {
                "months": [ "янв.", "февр.", "марта", "апр.", "мая", "июня", "июля", "авг.", "сент.", "окт.", "нояб.", "дек." ],
                "itemName": [ "раз", "раза" ],
            },
        }[$('html').attr('lang')];
    })();

    // 今日
    const today = (() => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    })();

    // カレンダーの表示開始日
    const start = new Date(today.getFullYear(),today.getMonth() - (months - 1), 1);

    $('.calendar').each((i, elem) => {
        const $elem = $(elem);
        const cal = new CalHeatMap();
        cal.init({
            itemSelector: $elem[0],
            domain: 'month',
            subDomain: 'day',
            range: months,
            start: start,
            weekStartOnMonday: false,
            cellSize: 8,
            cellPadding: 1,
            callRadius: 0,
            domainDynamicDimension: true,
            displayLegend: false,
            legendColors: [color, color],
            domainLabelFormat: date => i18n.months[date.getMonth()],
            itemName: i18n.itemName,
            subDomainDateFormat: "%Y-%m-%d",
            subDomainTitleFormat: {
                "empty": "{date}",
                "filled": "{date} : {count} {name}",
            },
            data: $elem.attr('data-url'),
            dataType: 'json',
            afterLoadData: json => {
                const ret = {};
                $.each(json, (key, val) => {
                    const timeStamp = Math.floor((new Date(key)).getTime() / 1000);
                    ret[String(timeStamp)] = ~~val;
                });
                return ret;
            },
            previousSelector: $elem.attr('data-prev'), 
            nextSelector: $elem.attr('data-next'),
        });
    });
})(window, jQuery);
