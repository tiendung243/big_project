
export function slugify (value:string) {
    const a =
        'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
    const b =
        'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(a.split('').join('|'), 'g');

    return value
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}


export function handleDateTimeCreated(datetime: string){
    const time = new Date(datetime);
    if (!time.valueOf()){
        return '1 minute ago';
    }
    const now = new Date();
    const ms  = now.getTime() - time.getTime();
    const timeHandle = {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0
    }
    let second : number= Math.floor(ms/1000);
    if (!second) {
        return '1 minute ago';
    }
    timeHandle.year = Math.floor(second/31536000);
    second = second - 31536000 * timeHandle.year;
    timeHandle.month = Math.floor(second/2592000);
    second = second - timeHandle.month * 2592000;
    timeHandle.day = Math.floor(second / 86400);
    second = second - timeHandle.day * 86400;
    timeHandle.hour = Math.floor(second / 3600);
    second = second - timeHandle.hour * 3600;
    timeHandle.minute = Math.ceil(second / 60); 
    let res = '';
    if (timeHandle.year) {
        res += ('' + timeHandle.year + ' ' + (timeHandle.year == 1 ? 'year': 'years'));
        if (timeHandle.month){
            res += (', ' + timeHandle.month  + ' ' + (timeHandle.month  == 1 ? 'month': 'months'));
        }
        res +=  ' ago';
    }else if (timeHandle.month) {
        res += ('' + timeHandle.month + ' ' + (timeHandle.month == 1 ? 'month': 'months'));
        if (timeHandle.month){
            res += (', ' + timeHandle.day  + ' ' + (timeHandle.day  == 1 ? 'day': 'days'));
        }
        res +=  ' ago';
    } else if (timeHandle.day){
        res += ('' + timeHandle.day + ' ' + (timeHandle.day == 1 ? 'day': 'days'));
        if (timeHandle.hour){
            res += (', ' + timeHandle.hour  + ' ' + (timeHandle.hour  == 1 ? 'hour': 'hours'));
        }
        res +=  ' ago';
    } else if (timeHandle.hour){
        res += ('' + timeHandle.hour + ' ' + (timeHandle.hour == 1 ? 'hour': 'hours'));
        if (timeHandle.minute){
            res += (', ' + timeHandle.minute  + ' ' + (timeHandle.minute  == 1 ? 'minute': 'minutes'));
        }
        res +=  ' ago';
    } else {
        res += (timeHandle.minute  + ' ' + (timeHandle.minute  == 1 ? 'minute': 'minutes'));
        res +=  ' ago';
    }
    return res;
}
