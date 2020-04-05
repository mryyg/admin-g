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

    M = M > 10 ? M : '0' + M
    D = D > 10 ? D : '0' + D
    h = h > 10 ? h : '0' + h
    m = m > 10 ? m : '0' + m
    s = s > 10 ? s : '0' + s

    return `${Y}-${M}-${D} ${h}:${m}:${s}`
}