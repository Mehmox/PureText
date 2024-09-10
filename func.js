function GetTime() {
    const currentTime = new Date();
    const Day = currentTime.getDate().toString().padStart(2, '0');
    const Month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    const Year = currentTime.getFullYear();
    const Hour = currentTime.getHours().toString().padStart(2, '0');
    const Minute = currentTime.getMinutes().toString().padStart(2, '0');
    const Second = currentTime.getSeconds().toString().padStart(2, '0');
    return `${Day}/${Month}/${Year} ${Hour}:${Minute}:${Second}`;
}

module.exports = GetTime