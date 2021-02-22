function getDayName(input) {
    // input เป็นเลข 0-6
    // TODO: แปลงเลข 0-6 เป็น วันอาทิตย์ - วันเสาร์

    // hint
    // const daysInWeek = ['วันอาทิตย์', 'วันจันทร์', /*...*/]
    let day = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    return day[input];

    // switch (input) {
    //     case 0:
    //         return 'วันอาทิตย์';
    //         break;
    //     case 1:
    //         return 'วันจันทร์';
    //         break;
    //     case 2:
    //         return 'วันอังคาร';
    //         break;
    //     case 3:
    //         return 'วันพุธ';
    //         break;
    //     case 4:
    //         return 'วันพฤหัสบดี';
    //         break;

    //     case 5:
    //         return 'วันศุกร์';
    //         break;
    //     case 6:
    //         return 'วันเสาร์';
    //         break;
    //     default:

    // }
}

function formatDate(input) {
    // input เป็น Object ในรูปแบบ
    // {
    //     day: 6, // 0=วันอาทิตย์, 1=วันจันทร์, 2=วันอังคาร, ...
    //     date: 15, // วันที่ 1-31
    //     month: 0, // 0=มกราคม, 1=กุมภาพันธ์, ...
    //     year: 2021 // ปี
    // }
    // TODO: แปลง input เป็น String ในรูปแบบ "วันศุกร์ที่ 15 มกราคม พ.ศ. 2564"
    let day = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    let month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    return `${day[input.day]}ที่ ${input.date} ${month[input.month]} พ.ศ. ${input.year+543}`;
}

function findTotal(input) {
    // input เป็น array ของตัวเลข
    // TODO: ให้หาผลบวกของเลขทั้งหมดใน input
    return input.reduce((a, b) => a + b);
}

function findMinMax(input) {
    // input เป็น array ของตัวเลข
    // TODO: ให้หาตัวเลขที่มากที่สุดและน้อยที่สุดใน input
    let ans = new Object();
    ans['min'] = Math.min.apply(0, input);
    ans['max'] = Math.max.apply(0, input);
    return ans;
}

function findBMI(input) {
    // กำหนดให้ input เป็น Array ของ Object ในรูปแบบ
    // [
    //     {
    //         name: "ABC DEF", // ชื่อ นามสกุล
    //         height: 167, // ความสูง มีหน่วยเป็น cm
    //         weight: 72 // น้ำหนัก มีหน่วยเป็น kg
    //     },
    //     {
    //         name: "XYZ DEF", // ชื่อ นามสกุล
    //         height: 194, // ความสูง มีหน่วยเป็น cm
    //         weight: 60 // น้ำหนัก มีหน่วยเป็น kg
    //     },
    //     ...
    // ]
    // TODO: ให้คำนวณดัชนีมวลการ (Body Mass Index, bmi) ของแต่ละคน
    for (let i = 0; i < input.length; i++) {
        let bmi = input[i].weight / ((input[i].height / 100) ** 2)
        input[i]['bmi'] = bmi.toFixed(2)
    }
    return input
}