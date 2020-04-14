export default function (time) {
    let date;
    if(time) {
         date = new Date(time);
    } else {
         date = new Date();
    }
    
    let Y = date.getFullYear();
    let M = date.getMonth();
    let D = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    M = M > 9 ? M : '0' + M
    D = D > 9 ? D : '0' + D
    h = h > 9 ? h : '0' + h
    m = m > 9 ? m : '0' + m
    s = s > 9 ? s : '0' + s

    return `${Y}-${M}-${D} ${h}:${m}:${s}`
}