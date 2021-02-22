function mapToSquare(input) {
    // TODO ใช้ .map สร้าง array ที่เป็นเลขยกกำลังสองของ input
    return input.map(x => x ** 2);
}

function convertTemperature(input) {
    // TODO: ให้แปลงอุณหภูมิจาก °F เป็น °C โดยใช้ฟังก์ชัน .map()
    for (let i = 0; i < input.length; i++) {
        let cel = ((input[i].temperature - 32) * 5) / 9;
        input[i]['temperature'] = parseFloat(cel.toFixed(1));
    }
    return input;
}

function filterEvenNumber(input) {
    // TODO: filter input เอาเลขคู่เท่านั้น
    return input.filter(x => x % 2 === 0);
}

function filterAgeRange(input) {
    // TODO: กรอง input.people ตามช่วงอายุ
    return input.people.filter(x => x.age > input.min && x.age < input.max)

}

function removeByFilter(input) {
    // TODO: ลบ Object ใน Array ด้วยการ filter
    return input.people.filter(x => x.id !== input.removeId)

}